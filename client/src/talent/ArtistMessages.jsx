import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getConversations, getMessages, sendMessage } from '../services/messageService';
import { getMyProfile, getProfileById } from '../services/profileService';
import socket from '../services/socket';
import { useNotifications } from '../context/NotificationContext';

const ArtistMessages = () => {
    const { userId } = useParams();
    const [conversations, setConversations] = useState([]);
    const [filteredConvs, setFilteredConvs] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const profileRes = await getMyProfile();
                const userProfile = profileRes.data;
                setProfile(userProfile);

                socket.connect();
                socket.emit('join', userProfile._id);

                const convRes = await getConversations();
                setConversations(convRes.data);
                setFilteredConvs(convRes.data);
                
                // If userId is provided in URL, find and select that conversation
                if (userId) {
                    const targetConversation = convRes.data.find(conv => conv.otherUser._id === userId);
                    if (targetConversation) {
                        handleSelectUser(targetConversation.otherUser);
                    } else {
                        // If conversation doesn't exist, create a temporary user object
                        try {
                            const userProfileRes = await getProfileById(userId);
                            const tempUser = {
                                _id: userId,
                                email: userProfileRes.data?.user?.email || 'Unknown',
                                profile: userProfileRes.data
                            };
                            setSelectedUser(tempUser);
                            // Try to get messages, though there might not be any
                            const msgRes = await getMessages(userId);
                            setMessages(msgRes.data);
                        } catch (err) {
                            console.error('Error fetching user for messaging:', err);
                            // Fallback to first conversation
                            if (convRes.data.length > 0) {
                                handleSelectUser(convRes.data[0].otherUser);
                            }
                        }
                    }
                } else if (convRes.data.length > 0) {
                    handleSelectUser(convRes.data[0].otherUser);
                }
            } catch (err) {
                console.error('Error fetching conversations:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();

        // Listen for real-time verification updates
        window.addEventListener('userStateChange', fetchInitialData);

        socket.on('receiveMessage', (message) => {
            setMessages(prev => [...prev, message]);
        });

        socket.on('userTyping', ({ senderId }) => {
            if (senderId !== profile?._id) {
                setIsTyping(true);
                clearTimeout(typingTimeout);
                const t = setTimeout(() => setIsTyping(false), 2000);
                setTypingTimeout(t);
            }
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('userTyping');
            socket.disconnect();
        };
    }, []);

    useEffect(scrollToBottom, [messages]);

    // Filter conversations by search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredConvs(conversations);
        } else {
            setFilteredConvs(conversations.filter(c =>
                c.otherUser.email.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, conversations]);

    const handleSelectUser = async (user) => {
        setSelectedUser(user);
        setIsTyping(false);
        try {
            const msgRes = await getMessages(user._id);
            setMessages(msgRes.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        if (selectedUser) {
            socket.emit('typing', { receiverId: selectedUser._id, senderId: profile?._id });
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser || sending) return;
        setSending(true);
        const optimistic = { _id: Date.now(), sender: profile?._id, content: newMessage, createdAt: new Date().toISOString() };
        setMessages(prev => [...prev, optimistic]);
        setNewMessage('');
        try {
            const res = await sendMessage({ receiver: selectedUser._id, content: optimistic.content });
            socket.emit('sendMessage', res.data);
        } catch (err) {
            console.error('Error sending message:', err);
            setMessages(prev => prev.filter(m => m._id !== optimistic._id));
        } finally {
            setSending(false);
        }
    };

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') : profile?.profilePicture,
    };

    const verificationStatus = profile?.user?.verificationStatus || authUser?.verificationStatus || 'none';

    if (loading) return null;

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData} verificationStatus={verificationStatus}
            headerTitle="Artist Messages" headerSubtitle="Connect with industry professionals."
            searchPlaceholder="Search conversations...">
            <div className="flex h-[calc(100vh-180px)] bg-white dark:bg-[#0f1115] rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl">
                {/* Conversation List */}
                <aside className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-white/5 flex flex-col">
                    <div className="p-6 border-b border-slate-100 dark:border-white/5">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-primary transition-colors">search</span>
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl pl-12 pr-6 py-3.5 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/10 placeholder:text-slate-500 text-slate-700 dark:text-white outline-none transition-all shadow-inner"
                                placeholder="Search people..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 space-y-2">
                            {filteredConvs.length === 0 ? (
                                <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500 mt-12 italic">
                                    {searchQuery ? 'No results found.' : 'No conversations yet.'}
                                </p>
                            ) : filteredConvs.map((conv) => (
                                <div key={conv.otherUser._id}
                                    onClick={() => handleSelectUser(conv.otherUser)}
                                    className={`flex items-center gap-4 p-5 rounded-3xl cursor-pointer transition-all duration-300 border ${
                                        selectedUser?._id === conv.otherUser._id
                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                                            : 'hover:bg-slate-50 dark:hover:bg-white/5 border-transparent'
                                    }`}>
                                    <div className="relative shrink-0">
                                        <div className="size-14 rounded-full bg-cover bg-center border-2 border-white/10 shadow-lg"
                                            style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=${conv.otherUser.email}')` }}/>
                                        <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-[#0f1115] rounded-full"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className={`text-sm font-black truncate uppercase tracking-tight italic ${selectedUser?._id === conv.otherUser._id ? 'text-white' : 'dark:text-white'}`}>
                                                {conv.otherUser.email.split('@')[0]}
                                            </h3>
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${selectedUser?._id === conv.otherUser._id ? 'text-white/80' : 'text-slate-500'}`}>
                                                {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className={`text-[10px] truncate font-bold italic tracking-tight ${selectedUser?._id === conv.otherUser._id ? 'text-white/70' : 'text-slate-500'}`}>
                                            {conv.lastMessage.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-slate-50/30 dark:bg-black/20">
                    {selectedUser ? (
                        <>
                            <header className="h-24 flex items-center justify-between px-10 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0f1115]/80 backdrop-blur-xl">
                                <div className="flex items-center gap-5">
                                    <div className="size-14 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-2xl"
                                        style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=${selectedUser.email}')` }}/>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter italic">{selectedUser.email.split('@')[0]}</h2>
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black rounded-lg uppercase tracking-[0.2em] border border-primary/20">Industry Pro</span>
                                        </div>
                                        <p className={`text-[10px] flex items-center gap-2 font-black uppercase tracking-widest mt-1.5 transition-all ${isTyping ? 'text-blue-400' : 'text-green-500'}`}>
                                            <span className={`size-2 rounded-full ${isTyping ? 'bg-blue-400 animate-bounce' : 'bg-green-500 animate-pulse'}`}/>
                                            {isTyping ? 'Typing...' : 'Online Now'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {[{ icon: 'phone', label: 'Call' }, { icon: 'video_call', label: 'Video' }].map(({ icon, label }) => (
                                        <button key={icon}
                                            className="size-11 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                                            title={label}>
                                            <span className="material-symbols-outlined text-xl">{icon}</span>
                                        </button>
                                    ))}
                                </div>
                            </header>

                            <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar">
                                {messages.map((msg, idx) => (
                                    <div key={msg._id || idx}
                                        className={`flex items-end gap-4 max-w-[80%] ${msg.sender === profile?._id ? 'ml-auto flex-row-reverse' : ''}`}>
                                        <div className="space-y-2">
                                            <div className={`${
                                                msg.sender === profile?._id
                                                    ? 'bg-primary text-white p-6 rounded-[2rem] rounded-br-none shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-transform'
                                                    : 'bg-white dark:bg-[#1a1c23] text-slate-800 dark:text-slate-200 p-6 rounded-[2rem] rounded-bl-none shadow-sm border border-slate-100 dark:border-white/5 hover:-translate-y-1 transition-transform'
                                            }`}>
                                                <p className="text-sm font-bold leading-relaxed tracking-tight">{msg.content}</p>
                                            </div>
                                            <span className={`text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] ${msg.sender === profile?._id ? 'text-right block mr-4' : 'ml-4'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef}/>
                            </div>

                            <form onSubmit={handleSendMessage} className="p-8 bg-white dark:bg-[#0f1115] border-t border-slate-200 dark:border-white/5">
                                <div className="max-w-4xl mx-auto flex items-center gap-5">
                                    <button type="button" className="size-14 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 flex items-center justify-center hover:text-primary transition-all">
                                        <span className="material-symbols-outlined text-2xl">add</span>
                                    </button>
                                    <div className="flex-1 relative">
                                        <input
                                            value={newMessage}
                                            onChange={handleTyping}
                                            className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-[1.5rem] px-8 py-5 text-sm font-bold focus:ring-4 focus:ring-primary/10 placeholder:text-slate-500 outline-none transition-all shadow-inner dark:text-white italic"
                                            placeholder="Compose message..."
                                            type="text"
                                            disabled={sending}
                                        />
                                    </div>
                                    <button type="submit" disabled={sending || !newMessage.trim()}
                                        className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group disabled:opacity-60 disabled:cursor-not-allowed">
                                        {sending ? (
                                            <span className="material-symbols-outlined text-2xl animate-spin">sync</span>
                                        ) : (
                                            <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-12 group-hover:translate-x-1">send</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                            <div className="size-24 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 animate-bounce">
                                <span className="material-symbols-outlined text-primary text-5xl">forum</span>
                            </div>
                            <p className="text-slate-500 uppercase tracking-[0.3em] font-black text-xs italic">Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ArtistMessages;
