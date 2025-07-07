'use client';

import { Note, moodEmojis } from '@/lib/types';
import { Card } from './ui/card';
import { format, parseISO } from 'date-fns';
import { NoteEditorDialog } from './note-editor-dialog';
import { Button } from './ui/button';
import { Edit, Trash } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useNotes } from '@/hooks/use-notes';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface NoteCardProps {
  note: Note;
  className?: string;
}

export function NoteCard({ note, className }: NoteCardProps) {
  const noteDate = parseISO(note.date + 'T12:00:00Z');
  const { deleteNote } = useNotes();
  const { toast } = useToast();

  const handleDelete = () => {
    deleteNote(note.id);
    toast({
      variant: 'destructive',
      title: 'Note Deleted',
      description: 'Your memory has been removed.',
    });
  };

  return (
    <Card className={cn("w-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-1 group", className)}>
      {note.image && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={note.image}
            alt="Memory"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="romantic couple"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary">{format(noteDate, 'MMMM do, yyyy')}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
               <span>{moodEmojis[note.mood]}</span> {note.mood}
            </p>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <NoteEditorDialog note={note}>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-primary">
                <Edit className="h-4 w-4" />
              </Button>
            </NoteEditorDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your note and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        <p className="flex-grow text-base/relaxed font-body text-foreground/90">
          {note.content}
        </p>
      </div>
    </Card>
  );
}
