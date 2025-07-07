'use client';

import { Note, moodEmojis } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { format, parseISO } from 'date-fns';
import { NoteEditorDialog } from './note-editor-dialog';
import { Button } from './ui/button';
import { Edit } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  className?: string;
}

export function NoteCard({ note, className }: NoteCardProps) {
  const noteDate = parseISO(note.date + 'T12:00:00Z');

  return (
    <Card className={`relative shadow-lg border-primary/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-headline">
          <span>{format(noteDate, 'MMMM do, yyyy')}</span>
          <span className="text-2xl">{moodEmojis[note.mood]}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg whitespace-pre-wrap leading-relaxed">"{note.content}"</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <NoteEditorDialog note={note}>
          <Button variant="ghost" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </NoteEditorDialog>
      </CardFooter>
    </Card>
  );
}
