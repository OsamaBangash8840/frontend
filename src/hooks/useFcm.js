// hooks/useFCM.js
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/app/lib/firebase-messaging";

const useFCM = (onMessageReceived) => {
    useEffect(() => {
        if (!messaging) return;

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("FCM Message received:", payload);

            const { notification, data } = payload;

            // Call custom handler if provided
            if (onMessageReceived) {
                onMessageReceived(payload);
            }

            // Handle chat messages specifically
            if (data?.type === 'chat_message') {
                // Show browser notification if page is not visible
                if (document.hidden) {
                    showBrowserNotification(
                        notification?.title || 'New Message',
                        `${data.senderName || 'Someone'}: ${data.messageText}`,
                        {
                            icon: '/firebase-logo.png',
                            tag: `chat-${data.senderId}`,
                            data: data
                        }
                    );
                }
            } else {
                // Handle other notifications
                if (document.hidden) {
                    showBrowserNotification(
                        notification?.title || 'Notification',
                        notification?.body || 'You have a new notification'
                    );
                }
            }
        });

        return () => unsubscribe();
    }, [messaging, onMessageReceived]);
};

// Helper function to show browser notifications
const showBrowserNotification = (title, body, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body,
            icon: '/firebase-logo.png',
            ...options
        });

        // Handle notification click
        notification.onclick = function (event) {
            event.preventDefault();
            window.focus();

            // If it's a chat message, you could navigate to the chat
            if (options.data?.senderId) {
                // Navigate to chat with that user
                window.location.href = `/chat?user=${options.data.senderId}`;
            }

            notification.close();
        };
    }
};

export default useFCM;