'use client';

import { Note, moodEmojis } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { format, parseISO } from 'date-fns';
import { NoteEditorDialog } from './note-editor-dialog';
import { Button } from './ui/button';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface NoteCardProps {
  note: Note;
  className?: string;
}

export function NoteCard({ note, className }: NoteCardProps) {
  const noteDate = parseISO(note.date + 'T12:00:00Z');

  return (
    <Card className={cn("w-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-1", className)}>
      {note.image && (
        <div className="relative w-full aspect-video">
          <Image
            src={note.image}
            alt="Memory"
            fill
            className="object-cover"
            data-ai-hint="romantic couple"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-2xl">
                {format(noteDate, 'MMMM do, yyyy')}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{note.mood}</p>
            </div>
            <div className="text-4xl p-2 bg-background rounded-full -mt-2 -mr-2">
              {moodEmojis[note.mood]}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-lg whitespace-pre-wrap leading-relaxed font-body text-foreground/80 italic">
            "{note.content}"
          </p>
        </CardContent>
        <CardFooter className="flex justify-end mt-auto">
          <NoteEditorDialog note={note}>
            <Button variant="secondary" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Note
            </Button>
          </NoteEditorDialog>
        </CardFooter>
      </div>
    </Card>
  );
}
