'use client';

import { NoteCard } from '@/components/note-card';
import { useNotes } from '@/hooks/use-notes';

export default function GalleryPage() {
    const { notes } = useNotes();
    const sortedNotes = notes.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline text-primary">Our Story</h1>
                <p className="text-lg text-muted-foreground mt-2">A collection of our beautiful moments.</p>
            </div>

            {notes.length > 0 ? (
                 <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {sortedNotes.map(note => (
                        <div key={note.id} className="break-inside-avoid animate-scale-in">
                           <NoteCard note={note} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">You haven't written any notes yet.</p>
                </div>
            )}
        </div>
    );
}
