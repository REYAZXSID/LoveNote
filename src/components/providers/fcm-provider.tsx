// src/components/providers/fcm-provider.tsx
'use client';

import { useToast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React, { createContext, useState, useEffect } from 'react';

interface FcmContextType {
    fcmToken: string | null;
    notificationPermission: NotificationPermission;
}

export const FcmContext = createContext<FcmContextType | null>(null);

export function FcmProvider({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
            const messaging = getMessaging(app);
            
            const requestAndRegister = async () => {
                try {
                    // Check initial permission state
                    setNotificationPermission(Notification.permission);

                    // Request permission
                    const permission = await Notification.requestPermission();
                    setNotificationPermission(permission);

                    if (permission === 'granted') {
                        const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
                        if (currentToken) {
                            setFcmToken(currentToken);
                            console.log('FCM Token:', currentToken);
                        } else {
                            console.log('No registration token available. Request permission to generate one.');
                        }
                    } else {
                        console.log('Unable to get permission to notify.');
                    }
                } catch (error) {
                    console.error('An error occurred while retrieving token. ', error);
                }
            };

            requestAndRegister();

            // Handle foreground messages
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground message received.', payload);
                toast({
                    title: payload.notification?.title,
                    description: payload.notification?.body,
                    image: payload.notification?.image,
                });
            });
            
            return () => {
                unsubscribe();
            };
        }
    }, [toast]);
    
    return (
        <FcmContext.Provider value={{ fcmToken, notificationPermission }}>
            {children}
        </FcmContext.Provider>
    )
}
