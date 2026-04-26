import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '../services/socket';
import { getMyNotifications, markAllRead, markAsRead } from '../services/notificationService';
import { useAuth } from './AuthContext';
import { getStoredToken } from '../utils/authStorage';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const { user, isAuthenticated, mergeUser } = useAuth();

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;

    try {
      const res = await getMyNotifications();
      const items = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
      setNotifications(items);
      setUnreadCount(items.filter((item) => !item.read).length);
    } catch (err) {
      if (err?.response?.status !== 401) {
        console.error('Error fetching notifications:', err);
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setNotifications([]);
      setUnreadCount(0);
      if (socket.connected) {
        socket.disconnect();
      }
      setConnected(false);
      return undefined;
    }

    fetchNotifications();

    const token = getStoredToken();
    if (token && !socket.connected) {
      socket.auth = { token };
      socket.connect();
    }
    setConnected(socket.connected);

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      if (window.Notification && Notification.permission === 'granted') {
        new Notification(notification.title, { body: notification.message });
      }
    };

    const handleVerificationUpdate = (data) => {
      mergeUser({ verificationStatus: data.status, isVerified: data.isVerified });
      window.dispatchEvent(new Event('userStateChange'));
    };

    const handleAdminEvent = (event) => {
      handleNewNotification({
        _id: `${event.type}-${event.projectId || event.userId}-${event.createdAt}`,
        type: 'admin_event',
        title: 'Platform Activity',
        message: `${event.type.replace('_', ' ')} triggered`,
        link: event.projectId ? `/admin/projects/${event.projectId}` : '/dashboard/admin',
        read: false,
        createdAt: event.createdAt || new Date().toISOString(),
      });
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('newNotification', handleNewNotification);
    socket.on('verificationUpdate', handleVerificationUpdate);
    socket.on('adminEvent', handleAdminEvent);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('newNotification', handleNewNotification);
      socket.off('verificationUpdate', handleVerificationUpdate);
      socket.off('adminEvent', handleAdminEvent);
    };
  }, [isAuthenticated, user, mergeUser]);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) => prev.map((note) => (note._id === id ? { ...note, read: true } : note)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking read:', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();
      setNotifications((prev) => prev.map((note) => ({ ...note, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all read:', err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        connected,
        user,
        handleMarkAsRead,
        handleMarkAllRead,
        refreshNotifications: fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
