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
    <Card className={cn("relative shadow-xl w-full overflow-hidden transition-all duration-300 hover:shadow-2xl", className)}>
      <div className={cn("flex flex-col", { "md:flex-row": note.image })}>
        {note.image && (
          <div className="md:w-1/3 relative min-h-[200px] md:min-h-0">
            <Image
              src={note.image}
              alt="Memory"
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              data-ai-hint="romantic couple"
            />
          </div>
        )}
        <div className={cn("flex flex-col", { "md:w-2/3": note.image })}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-headline text-2xl">
              <span>{format(noteDate, 'MMMM do, yyyy')}</span>
              <span className="text-3xl ml-4">{moodEmojis[note.mood]}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-lg whitespace-pre-wrap leading-relaxed font-body text-foreground/80">"{note.content}"</p>
          </CardContent>
          <CardFooter className="flex justify-end mt-auto">
            <NoteEditorDialog note={note}>
              <Button variant="secondary" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </NoteEditorDialog>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
