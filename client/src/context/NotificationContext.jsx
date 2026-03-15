import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../services/socket';
import { getMyNotifications, markAsRead, markAllRead } from '../services/notificationService';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState(null);

    const fetchNotifications = async () => {
        // Don't attempt fetch if user is not logged in — avoids 401 on public pages
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await getMyNotifications();
            setNotifications(res.data);
            setUnreadCount(res.data.filter(n => !n.read).length);
        } catch (err) {
            // Silently ignore 401 — user may have just logged out
            if (err?.response?.status !== 401) {
                console.error('Error fetching notifications:', err);
            }
        }
    };

    const loadUser = () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            setUser(JSON.parse(userStr));
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchNotifications();
        loadUser();

        const initializeSocket = () => {
            const token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');
            if (token && userStr && !socket.connected) {
                const parsed = JSON.parse(userStr);
                socket.auth = { token };
                socket.connect();
                socket.emit('register', { userId: parsed.id || parsed._id, role: parsed.role });
                setConnected(true);
                console.log('Socket initialized and connected');
            }
        };

        initializeSocket();
        
        // Listener for storage changes (e.g. login in another tab or from Login component)
        window.addEventListener('storage', initializeSocket);
        
        // Custom event for same-tab login
        window.addEventListener('userLoggedIn', initializeSocket);

        const handleNewNotification = (notification) => {
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
            
            if (window.Notification && Notification.permission === 'granted') {
                new Notification(notification.title, { body: notification.message });
            }
        };

        const handleVerificationUpdate = (data) => {
            // Update local storage user object
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const updatedUser = { ...JSON.parse(userStr), verificationStatus: data.status, isVerified: data.isVerified };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                
                // If the user is on a page that needs immediate refresh, we could trigger it
                // For now, let's just show a global notification (built-in handleNewNotification will be called by 'newNotification' event from server)
                console.log('Verification state updated in real-time:', data);
                
                // Dispatch a custom event so other components can react if they don't use this context
                window.dispatchEvent(new Event('userStateChange'));
            }
        };

        const handleAdminEvent = (event) => {
            // Admins also get adminEvent stream; treat as notification lite
            const synthesized = {
                _id: `${event.type}-${event.projectId || event.userId}-${event.createdAt}`,
                type: 'admin_event',
                title: 'Platform Activity',
                message: `${event.type.replace('_', ' ')} triggered`,
                link: event.projectId ? `/admin/projects/${event.projectId}` : '/admin/dashboard',
                read: false,
                createdAt: event.createdAt || new Date().toISOString(),
            };
            handleNewNotification(synthesized);
        };

        socket.on('newNotification', handleNewNotification);
        socket.on('verificationUpdate', handleVerificationUpdate);
        socket.on('adminEvent', handleAdminEvent);

        return () => {
            socket.off('newNotification', handleNewNotification);
            socket.off('verificationUpdate', handleVerificationUpdate);
            socket.off('adminEvent', handleAdminEvent);
        };
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await markAsRead(id);
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Error marking read:', err);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllRead();
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (err) {
            console.error('Error marking all read:', err);
        }
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            connected,
            user,
            setUser,
            loadUser,
            handleMarkAsRead,
            handleMarkAllRead,
            refreshNotifications: fetchNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
