// src/hooks/use-vows.ts
'use client';

import { VowsContext } from '@/components/providers/vows-provider';
import { useContext } from 'react';

export const useVows = () => {
  const context = useContext(VowsContext);
  if (!context) {
    throw new Error('useVows must be used within a VowsProvider');
  }
  return context;
};
