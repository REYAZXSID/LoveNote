// src/components/providers/fcm-provider.tsx
'use client';

import { useToast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React, { createContext, useState, useEffect, useCallback } from 'react';

const FCM_MUTED_KEY = 'eternal-echoes-fcm-muted';

interface FcmContextType {
    fcmToken: string | null;
    notificationPermission: NotificationPermission;
    isMuted: boolean;
    toggleMute: () => void;
    requestNotificationPermission: () => Promise<void>;
}

export const FcmContext = createContext<FcmContextType | null>(null);

export function FcmProvider({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
    const [isMuted, setIsMuted] = useState<boolean>(true);

    useEffect(() => {
        // Set initial muted state from localStorage, default to true if not set
        setIsMuted(localStorage.getItem(FCM_MUTED_KEY) !== 'false');
        // Set initial permission state
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setNotificationPermission(Notification.permission);
        }
    }, []);
    
    const requestNotificationPermission = useCallback(async () => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
            try {
                const permission = await Notification.requestPermission();
                setNotificationPermission(permission);

                const newMutedState = permission !== 'granted';
                setIsMuted(newMutedState);
                localStorage.setItem(FCM_MUTED_KEY, String(newMutedState));

            } catch (error) {
                console.error("Error requesting notification permission:", error);
            }
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (notificationPermission === 'granted') {
             setIsMuted(prevMuted => {
                const newMutedState = !prevMuted;
                localStorage.setItem(FCM_MUTED_KEY, String(newMutedState));
                return newMutedState;
            });
        } else {
            requestNotificationPermission();
        }
    }, [notificationPermission, requestNotificationPermission]);


    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
            return;
        }

        const messaging = getMessaging(app);

        // Get token logic
        if (notificationPermission === 'granted' && !isMuted) {
            getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY })
                .then(currentToken => {
                    if (currentToken) {
                        setFcmToken(currentToken);
                        console.log('FCM Token:', currentToken);
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                        setFcmToken(null);
                    }
                })
                .catch(err => {
                    console.error('An error occurred while retrieving token. ', err);
                    setFcmToken(null);
                });
        } else {
            setFcmToken(null);
        }

        // Foreground message handler
        if (notificationPermission === 'granted' && !isMuted) {
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground message received.', payload);
                toast({
                    title: payload.notification?.title,
                    description: payload.notification?.body,
                    image: payload.notification?.image,
                });
            });
            
            return () => unsubscribe();
        }
    }, [notificationPermission, isMuted, toast]);
    
    return (
        <FcmContext.Provider value={{ fcmToken, notificationPermission, isMuted, toggleMute, requestNotificationPermission }}>
            {children}
        </FcmContext.Provider>
    );
}
