// src/hooks/use-notification.ts
'use client';

import { NotificationContext } from '@/components/providers/notification-provider';
import { useContext } from 'react';

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
