// src/components/providers/notification-provider.tsx
'use client';

import React, { createContext, useState, useCallback, ReactNode, useRef } from 'react';

interface NotificationPayload {
  title?: string;
  body?: string;
  image?: string;
}

interface NotificationContextType {
  notification: NotificationPayload | null;
  showNotification: (payload: NotificationPayload) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationPayload | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Notification sound playback failed:", e));
    }
  };

  const showNotification = useCallback((payload: NotificationPayload) => {
    setNotification(payload);
    playSound();
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {/* 
        IMPORTANT: You need to add your notification sound file to the `public` directory.
        For example, create a file at `public/notification-sound.mp3`.
        The audio player below will not work without it.
      */}
      <audio ref={audioRef} src="/notification-sound.mp3" preload="auto" />
      {children}
    </NotificationContext.Provider>
  );
}
