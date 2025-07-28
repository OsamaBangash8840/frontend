// components/ChatFCMHandler.jsx
"use client";

import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/app/lib/firebase-messaging";
import updateFcmToken from "@/app/utils/updateFcmToken";

const ChatFCMHandler = ({ currentUser }) => {
    // Update FCM token on component mount
    useEffect(() => {
        if (currentUser) {
            updateFcmToken();
        }
    }, [currentUser]);

    // Handle incoming FCM messages
    useEffect(() => {
        if (!messaging || !currentUser) return;

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("FCM Message received:", payload);
            
            const { notification, data } = payload;
            
            // Handle different types of notifications based on your backend
            if (data?.type === 'chat_message') {
                // This matches the data structure from your backend sendPushNotification call
                const notificationTitle = notification?.title || 'New Message';
                const notificationBody = notification?.body || `${data.senderName}: ${data.messageText}`;
                
                // Show browser notification if page is not in focus
                if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
                    new Notification(notificationTitle, {
                        body: notificationBody,
                        icon: '/firebase-logo.png', // Add your app icon
                        tag: `chat-${data.senderId}`, // Prevents duplicate notifications
                        data: {
                            senderId: data.senderId,
                            senderName: data.senderName,
                            messageText: data.messageText,
                            url: window.location.origin + '/chat' // Your chat page URL
                        }
                    });
                }
                
                // Optional: Show in-app toast notification
                if (typeof showSuccessToast !== 'undefined') {
                    showSuccessToast(notificationBody);
                }
            } else {
                // Handle other notification types
                const title = notification?.title || 'Notification';
                const body = notification?.body || 'You have a new notification';
                
                if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
                    new Notification(title, {
                        body: body,
                        icon: '/firebase-logo.png'
                    });
                }
            }
        });

        return () => unsubscribe();
    }, [messaging, currentUser]);

    // Request notification permission on mount
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then((permission) => {
                console.log('Notification permission:', permission);
            });
        }
    }, []);

    return null; // This component doesn't render anything
};

export default ChatFCMHandler;