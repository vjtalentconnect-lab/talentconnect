import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getConversations, getMessages, sendMessage } from '../services/messageService';
import { getMyProfile } from '../services/profileService';
import socket from '../services/socket';

const ArtistMessages = () => {
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
                console.error('Error fetching conversations:', err);
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
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') : profile?.profilePicture
    };

    if (loading) return null;

    return (
        <DashboardLayout
            menuItems={TALENT_MENU}
            userRole="India • Artist"
            userData={userData}
            headerTitle="Artist Messages"
            headerSubtitle="Connect with industry professionals."
            searchPlaceholder="Search conversations..."
        >
            <div className="flex h-[calc(100vh-180px)] bg-white dark:bg-[#0f1115] rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl">
                {/* Conversations List */}
                <aside className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-white/5 flex flex-col bg-white dark:bg-[#0f1115]">
                    <div className="p-8 border-b border-slate-100 dark:border-white/5">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-primary transition-colors">search</span>
                            <input
                                className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl pl-12 pr-6 py-3.5 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/10 placeholder:text-slate-500 text-slate-700 dark:text-white outline-none transition-all shadow-inner"
                                placeholder="Search..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="p-4 space-y-2">
                            {conversations.length === 0 ? (
                                <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500 mt-12 italic">No conversations yet.</p>
                            ) : (
                                conversations.map((conv) => (
                                    <div 
                                        key={conv.otherUser._id} 
                                        onClick={() => handleSelectUser(conv.otherUser)}
                                        className={`flex items-center gap-4 p-5 rounded-3xl cursor-pointer transition-all duration-300 border ${selectedUser?._id === conv.otherUser._id ? 'bg-primary text-white shadow-xl shadow-primary/20 transform scale-[1.02]' : 'hover:bg-slate-50 dark:hover:bg-white/5 border-transparent'}`}
                                    >
                                        <div className="relative shrink-0">
                                            <div className="size-14 rounded-full bg-cover bg-center border-2 border-white/10 shadow-lg" style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=${conv.otherUser.email}')` }}></div>
                                            <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-[#0f1115] rounded-full"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className={`text-sm font-black truncate uppercase tracking-tight italic ${selectedUser?._id === conv.otherUser._id ? 'text-white' : 'dark:text-white'}`}>{conv.otherUser.email.split('@')[0]}</h3>
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${selectedUser?._id === conv.otherUser._id ? 'text-white/80' : 'text-slate-500'}`}>{new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <p className={`text-[10px] truncate font-bold italic tracking-tight ${selectedUser?._id === conv.otherUser._id ? 'text-white/70' : 'text-slate-500'}`}>{conv.lastMessage.content}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-slate-50/30 dark:bg-black/20">
                    {selectedUser ? (
                        <>
                            <header className="h-24 flex items-center justify-between px-10 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0f1115]/80 backdrop-blur-xl">
                                <div className="flex items-center gap-5">
                                    <div className="size-14 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-2xl" style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=${selectedUser.email}')` }}></div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter italic">{selectedUser.email.split('@')[0]}</h2>
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black rounded-lg uppercase tracking-[0.2em] border border-primary/20">Official Account</span>
                                        </div>
                                        <p className="text-[10px] text-green-500 flex items-center gap-2 font-black uppercase tracking-widest mt-1.5">
                                            <span className="size-2 bg-green-500 rounded-full animate-pulse"></span> Online Now
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="size-11 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white flex items-center justify-center hover:border-primary transition-all">
                                        <span className="material-symbols-outlined text-xl">phone</span>
                                    </button>
                                    <button className="size-11 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white flex items-center justify-center hover:border-primary transition-all">
                                        <span className="material-symbols-outlined text-xl">video_call</span>
                                    </button>
                                </div>
                            </header>

                            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex items-end gap-4 max-w-[80%] ${msg.sender === profile?._id ? 'ml-auto flex-row-reverse' : ''}`}>
                                        <div className="space-y-2">
                                            <div className={`${msg.sender === profile?._id ? 'bg-primary text-white p-6 rounded-[2rem] rounded-br-none shadow-2xl shadow-primary/20 transform hover:-translate-y-1 transition-transform' : 'bg-white dark:bg-[#1a1c23] text-slate-800 dark:text-slate-200 p-6 rounded-[2rem] rounded-bl-none shadow-sm border border-slate-100 dark:border-white/5 transform hover:-translate-y-1 transition-transform'}`}>
                                                <p className="text-sm font-bold leading-relaxed tracking-tight">{msg.content}</p>
                                            </div>
                                            <span className={`text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] ${msg.sender === profile?._id ? 'text-right block mr-4' : 'ml-4'}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className="p-10 bg-white dark:bg-[#0f1115] border-t border-slate-200 dark:border-white/5">
                                <div className="max-w-4xl mx-auto flex items-center gap-5">
                                    <button type="button" className="size-14 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 flex items-center justify-center hover:text-primary transition-all">
                                        <span className="material-symbols-outlined text-2xl">add</span>
                                    </button>
                                    <div className="flex-1 relative">
                                        <input
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-[1.5rem] px-8 py-5 text-sm font-bold focus:ring-4 focus:ring-primary/10 placeholder:text-slate-500 outline-none transition-all shadow-inner dark:text-white italic"
                                            placeholder="Compose message..."
                                            type="text"
                                        />
                                    </div>
                                    <button type="submit" className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group">
                                        <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-12 group-hover:translate-x-1">send</span>
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

                {/* Right Info Sidebar */}
                <aside className="w-80 hidden 3xl:flex flex-col border-l border-slate-200 dark:border-white/5 bg-white dark:bg-black/40">
                    <div className="p-10 text-center border-b border-slate-100 dark:border-white/5 bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="relative size-28 mx-auto mb-8">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-125 animate-pulse"></div>
                            <div className="relative size-28 rounded-full bg-cover bg-center border-4 border-white dark:border-[#0f1115] shadow-2xl" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Director')" }}></div>
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter dark:text-white leading-none mb-2 italic">Casting Team</h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Production House • Mumbai</p>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center p-5 bg-slate-100 dark:bg-white/5 rounded-3xl hover:bg-primary/10 transition-all group hover:shadow-2xl border border-transparent hover:border-primary/20">
                                <span className="material-symbols-outlined text-primary mb-3 transition-transform group-hover:scale-125">person</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Profile</span>
                            </button>
                            <button className="flex flex-col items-center p-5 bg-slate-100 dark:bg-white/5 rounded-3xl hover:bg-primary/10 transition-all group hover:shadow-2xl border border-transparent hover:border-primary/20">
                                <span className="material-symbols-outlined text-primary mb-3 transition-transform group-hover:scale-125">share</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Media</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 space-y-10 overflow-y-auto custom-scrollbar">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 mb-6 px-4">Shared History</h4>
                            <div className="grid grid-cols-2 gap-4 px-2">
                                {[1, 2].map((i) => (
                                    <div key={i} className="aspect-square bg-slate-100 dark:bg-white/5 rounded-2xl bg-cover bg-center cursor-pointer hover:opacity-80 transition-all border border-white/5 shadow-lg group">
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-white">visibility</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="px-2">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 mb-6 font-bold">Project File</h4>
                            <div className="p-6 bg-[#1a1c23] border border-white/5 rounded-3xl hover:border-primary/30 transition-all cursor-pointer group shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 -skew-x-12 translate-x-8 -translate-y-8"></div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="size-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(236,91,19,0.5)]"></div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">In Progress</p>
                                </div>
                                <p className="text-md font-black dark:text-white uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors italic">Legacy of Mumbai</p>
                                <p className="text-[10px] text-slate-500 font-bold italic tracking-tight">
                                    Lead Role • Studio 4B
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </DashboardLayout>
    );
};

export default ArtistMessages;
