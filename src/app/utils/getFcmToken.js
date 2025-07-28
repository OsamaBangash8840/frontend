// utils/getFcmToken.js
import { messaging } from "@/app/lib/firebase-messaging";
import { getToken } from "firebase/messaging";

const getFcmToken = async () => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: process.env.VAPID_ID,
        });

        if (currentToken) {
            console.log("FCM Token:", currentToken);
            return currentToken;
        } else {
            console.warn("No registration token available.");
            return null;
        }
    } catch (err) {
        console.error("An error occurred while retrieving token.", err);
        return null;
    }
};

export default getFcmToken;
