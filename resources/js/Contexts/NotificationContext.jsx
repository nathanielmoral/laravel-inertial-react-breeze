import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function useNotifications() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/admin/notifications');
            setNotifications(response.data.notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (id = null) => {
        try {
            const response = await axios.post('/admin/notifications/mark-read', { id });
            if (response.data.success) {
                if (id) {
                    setNotifications(notifications.map(notification => 
                        notification.id === id 
                            ? { ...notification, read: true } 
                            : notification
                    ));
                } else {
                    setNotifications(notifications.map(notification => 
                        ({ ...notification, read: true })
                    ));
                }
            }
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
    };

    useEffect(() => {
        fetchNotifications();
        const channel = window.Echo.channel('admin-notifications');
        
        channel.listen('user-registered', (data) => {
            console.log('Received real-time notification:', data); 
            addNotification(data.notification);
        });
    
        return () => {
            channel.stopListening('.user-registered');
        };
    }, []);

    const value = {
        notifications,
        markAsRead,
        fetchNotifications,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}