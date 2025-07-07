// src/components/providers/notification-provider.tsx
'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';

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

  const showNotification = useCallback((payload: NotificationPayload) => {
    setNotification(payload);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
