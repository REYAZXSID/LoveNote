// src/components/providers/vows-provider.tsx
'use client';

import { type Vow } from '@/lib/types';
import React, { createContext, useState, useCallback, useEffect } from 'react';

interface VowsContextType {
  vows: Vow[];
  addVow: (vow: Omit<Vow, 'id' | 'lastUpdated'>) => Vow;
  updateVow: (vow: Vow) => void;
  deleteVow: (id: string) => void;
}

export const VowsContext = createContext<VowsContextType | null>(null);

const VOWS_STORAGE_KEY = 'lovenote-vows';

export function VowsProvider({ children }: { children: React.ReactNode }) {
  const [vows, setVows] = useState<Vow[]>([]);

  useEffect(() => {
    const storedVows = localStorage.getItem(VOWS_STORAGE_KEY);
    if (storedVows) {
      setVows(JSON.parse(storedVows));
    } else {
        // You can add initial vows here if needed
        setVows([]);
    }
  }, []);

  useEffect(() => {
    // We prevent writing to localStorage on the initial empty state
    if (vows.length > 0 || localStorage.getItem(VOWS_STORAGE_KEY)) {
        localStorage.setItem(VOWS_STORAGE_KEY, JSON.stringify(vows));
    }
  }, [vows]);

  const addVow = useCallback((vowData: Omit<Vow, 'id' | 'lastUpdated'>) => {
    const newVow: Vow = {
      id: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      ...vowData,
    };
    setVows(prevVows => [...prevVows, newVow]);
    return newVow;
  }, []);

  const updateVow = useCallback((updatedVow: Vow) => {
    setVows(prevVows =>
      prevVows.map(vow => (vow.id === updatedVow.id ? updatedVow : vow))
    );
  }, []);

  const deleteVow = useCallback((id: string) => {
    setVows(prevVows => prevVows.filter(vow => vow.id !== id));
  }, []);

  return (
    <VowsContext.Provider value={{ vows, addVow, updateVow, deleteVow }}>
      {children}
    </VowsContext.Provider>
  );
}
