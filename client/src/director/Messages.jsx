import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getConversations, getMessages, sendMessage } from '../services/messageService';
import { getMyProfile } from '../services/profileService';
import socket from '../services/socket';
import { DIRECTOR_MENU } from '../constants/navigation';

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const profileRes = await getMyProfile();
                const userProfile = profileRes.data;
                setProfile(userProfile);

                // Socket connection
                socket.connect();
                socket.emit('join', userProfile._id);

                const convRes = await getConversations();
                setConversations(convRes.data);
                if (convRes.data.length > 0) {
                    handleSelectUser(convRes.data[0].otherUser);
                }
            } catch (err) {
                console.error('Error fetching director data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();

        socket.on('receiveMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('receiveMessage');
            socket.disconnect();
        };
    }, []);

    useEffect(scrollToBottom, [messages]);

    const handleSelectUser = async (user) => {
        setSelectedUser(user);
        try {
            const msgRes = await getMessages(user._id);
            setMessages(msgRes.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            const res = await sendMessage({
                receiver: selectedUser._id,
                content: newMessage
            });
            // Socket will handle the local update via receiveMessage listener
            socket.emit('sendMessage', res.data);
            setNewMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const userData = {
        name: profile?.fullName || 'Rohan Mehra',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'Mumbai, IN'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' 
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
            : (profile?.profilePicture || "https://lh3.googleusercontent.com/aida-public/AB6AXuC-8S-aeuR2cORz2aKmlcoRCZG0vX3wrCerglNjBZAeRTyWFtdCwCVgW2iau6r9ehLrZVdI8FCvYXugQN5g0iwxAp0y0a9DKiit2XmW7WKPzqsjSZb23GH1WfBIs3CwD2BV5JgiHEA7RJccg4NGPWqIKlO7EjA6wyORiH7n3g1MwegFrrf7ovbugGps3ElIcbYbaEJb-Rgshm_LVUyOQQOsWt3Lf1te1KVr8F6VcVTewalCyMztq1GlKktZMvh7wHTp2HgBgHIXuiFI")
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="Messages"
            headerSubtitle="Connect and communicate with talent and casting teams."
            searchPlaceholder="Search talent, conversations..."
        >
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Messages...</p>
                    </div>
                ) : (
                    <div className="p-8 flex-1 flex flex-col min-h-[calc(100vh-250px)]">
                        <div className="flex flex-1 bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl min-h-0">
                            {/* Conversations List */}
                            <aside className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-white/5 flex flex-col bg-white dark:bg-card-dark">
                                <div className="p-6 border-b border-slate-100 dark:border-white/5">
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-primary transition-colors">search</span>
                                        <input
                                            className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 placeholder:text-slate-500 text-slate-700 dark:text-white outline-none transition-all"
                                            placeholder="Search conversations..."
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="p-2 space-y-1">
                                        {conversations.length === 0 ? (
                                            <p className="text-center text-xs text-slate-500 mt-4">No conversations yet.</p>
                                        ) : (
                                            conversations.map((conv) => (
                                                <div
                                                    key={conv.otherUser._id}
                                                    onClick={() => handleSelectUser(conv.otherUser)}
                                                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${selectedUser?._id === conv.otherUser._id ? 'bg-primary/5 dark:bg-primary/10 border-primary/10' : 'hover:bg-slate-50 dark:hover:bg-white/5 border-transparent'}`}
                                                >
                                                    <div className="relative shrink-0">
                                                        <div className="size-12 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-lg" style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=${conv.otherUser.email}')` }}></div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-baseline mb-1">
                                                            <h3 className="text-sm font-black truncate dark:text-white uppercase tracking-tight">{conv.otherUser.email.split('@')[0]}</h3>
                                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-bold italic">{conv.lastMessage.content}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </aside>

                            {/* Main Chat Area */}
                            <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-background-dark/30">
                                {selectedUser ? (
                                    <>
                                        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-card-dark/80 backdrop-blur-md">
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-sm" style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=${selectedUser.email}')` }}></div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h2 className="text-lg font-black dark:text-white uppercase tracking-tight">{selectedUser.email.split('@')[0]}</h2>
                                                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/20">Active Chat</span>
                                                    </div>
                                                    <p className="text-[10px] text-green-500 flex items-center gap-1.5 font-black uppercase tracking-widest mt-0.5">
                                                        <span className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span> Online
                                                    </p>
                                                </div>
                                            </div>
                                        </header>

                                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                            {messages.map((msg, idx) => (
                                                <div key={idx} className={`flex items-end gap-3 max-w-[75%] ${msg.sender === profile?._id ? 'ml-auto flex-row-reverse' : ''}`}>
                                                    <div className="space-y-1">
                                                        <div className={`${msg.sender === profile?._id ? 'bg-primary text-white p-5 rounded-3xl rounded-br-none shadow-xl shadow-primary/20' : 'bg-white dark:bg-card-dark text-slate-800 dark:text-slate-200 p-5 rounded-3xl rounded-bl-none shadow-sm border border-slate-100 dark:border-white/5'}`}>
                                                            <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                                                        </div>
                                                        <span className={`text-[10px] text-slate-400 font-bold uppercase tracking-widest ${msg.sender === profile?._id ? 'text-right block mr-2' : 'ml-2'}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div ref={messagesEndRef} />
                                        </div>

                                        <form onSubmit={handleSendMessage} className="p-8 bg-white dark:bg-card-dark border-t border-slate-200 dark:border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                                            <div className="max-w-4xl mx-auto flex items-center gap-4">
                                                <div className="flex-1 relative">
                                                    <input
                                                        value={newMessage}
                                                        onChange={(e) => setNewMessage(e.target.value)}
                                                        className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/30 placeholder:text-slate-500 outline-none transition-all shadow-inner"
                                                        placeholder="Type a message..."
                                                        type="text"
                                                    />
                                                </div>
                                                <button type="submit" className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group">
                                                    <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-12">send</span>
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center">
                                        <p className="text-slate-500 uppercase tracking-widest font-black text-xs">Select a conversation to start chatting</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <footer className="py-8 px-8 border-t border-slate-200 dark:border-border-dark text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 TalentConnect • Where Global Talent Meets Opportunity</p>
            </footer>
        </DashboardLayout>
    );
};

export default Messages;
