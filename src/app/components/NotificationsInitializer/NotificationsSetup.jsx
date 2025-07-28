"use client";
import { useEffect } from "react";
import useFCM from "@/hooks/useFcm"; // your custom hook
import updateFcmToken from "@/app/utils/updateFcmToken";

export default function NotificationSetup() {
  useFCM();

  useEffect(() => {
    updateFcmToken();
  }, []);

  return null;
}
