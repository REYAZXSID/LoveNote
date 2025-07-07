// src/hooks/use-fcm.ts
'use client';

import { FcmContext } from '@/components/providers/fcm-provider';
import { useContext } from 'react';

export const useFcm = () => {
  const context = useContext(FcmContext);
  if (!context) {
    throw new Error('useFcm must be used within a FcmProvider');
  }
  return context;
};
