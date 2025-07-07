'use client';

import { initialNotes } from '@/data/notes';
import { type Note } from '@/lib/types';
import { format } from 'date-fns';
import React, { createContext, useState, useCallback, useEffect } from 'react';

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id'>) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  getNoteByDate: (date: Date) => Note | undefined;
}

export const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem('lovenote-notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      setNotes(initialNotes);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('lovenote-notes', JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = useCallback((noteData: Omit<Note, 'id'>) => {
    const newNote: Note = {
      id: new Date().toISOString(),
      ...noteData,
    };
    setNotes(prevNotes => {
      const existingNoteIndex = prevNotes.findIndex(n => n.date === newNote.date);
      if (existingNoteIndex !== -1) {
        const updatedNotes = [...prevNotes];
        updatedNotes[existingNoteIndex] = { ...updatedNotes[existingNoteIndex], ...newNote, id: updatedNotes[existingNoteIndex].id };
        return updatedNotes;
      }
      return [...prevNotes, newNote];
    });
  }, []);

  const updateNote = useCallback((updatedNote: Note) => {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === updatedNote.id ? updatedNote : note))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }, []);

  const getNoteByDate = useCallback((date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return notes.find(note => note.date === formattedDate);
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNoteByDate }}>
      {children}
    </NotesContext.Provider>
  );
}
