import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const NotificationContext = createContext();

export function useNotifications() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    
    // Function to calculate unread count from notifications array
    const calculateUnreadCount = useCallback((notifs) => {
        return notifs.filter(n => !n.read).length;
    }, []);

    const fetchNotifications = useCallback(async () => {
        try {
            const response = await axios.get('/admin/notifications');
            const notifs = response.data.notifications;
            setNotifications(notifs);
            setUnreadCount(calculateUnreadCount(notifs));
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }, [calculateUnreadCount]);

    const markAsRead = useCallback(async (id = null) => {
        try {
            if (id) {
                setNotifications(prev =>
                    prev.map(notification =>
                        notification.id === id
                            ? { ...notification, read: true }
                            : notification
                    )
                );
                setUnreadCount(prev => Math.max(0, prev - 1));
            } else {
                setNotifications(prev => prev.map(notification =>
                    ({ ...notification, read: true })
                ));
                setUnreadCount(0);
            }
    
            // Actual API call
            await axios.post('/admin/notifications/mark-read', { id });
    
        } catch (error) {
            console.error('Error marking notifications as read:', error);
            fetchNotifications(); // fallback to server state
        }
    }, [fetchNotifications]);
    

    const addNotification = useCallback((notification) => {
        setNotifications(prev => {
            // Check if notification already exists
            const exists = prev.some(n => n.id === notification.id);
            if (exists) return prev;
            
            const newNotifications = [notification, ...prev];
            setUnreadCount(prev => prev + 1);
            return newNotifications;
        });
    }, []);

    // Initial fetch of notifications
    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    // Set up real-time updates
    useEffect(() => {
        // Check if Echo is available
        if (window.Echo) {
            const channel = window.Echo.channel('admin-notifications');
            
            // Listen for new notifications
            channel.listen('user-registered', (data) => {
                console.log('New notification received:', data);
                addNotification(data.notification);
            });
            
            // Listen for notification read events (in case marked as read from another device/tab)
            channel.listen('notification-read', (data) => {
                console.log('Notification read event:', data);
                if (data.all) {
                    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                    setUnreadCount(0);
                } else if (data.id) {
                    setNotifications(prev => prev.map(n => 
                        n.id === data.id ? { ...n, read: true } : n
                    ));
                    setUnreadCount(prev => Math.max(0, prev - 1));
                }
            });
            
            return () => {
                channel.stopListening('user-registered');
                channel.stopListening('notification-read');
            };
        } else {
            console.warn('Echo is not available. Real-time notifications will not work.');
        }
    }, [addNotification]);

    const value = {
        notifications,
        unreadCount,
        markAsRead,
        fetchNotifications,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}