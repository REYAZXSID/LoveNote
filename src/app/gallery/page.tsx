'use client';

import { NoteCard } from '@/components/note-card';
import { useNotes } from '@/hooks/use-notes';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState, useMemo } from 'react';

export default function GalleryPage() {
    const { notes, isNotesLoaded } = useNotes();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const sortedNotes = useMemo(() => 
        [...notes].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [notes]);

    if (!isClient) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <Skeleton className="h-12 w-2/3 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                </div>
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Story in Notes</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">A mosaic of our shared moments, each one a treasure.</p>
            </div>

            {notes.length > 0 ? (
                 <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {sortedNotes.map(note => (
                        <div key={note.id} className="break-inside-avoid animate-scale-in">
                           <NoteCard note={note} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 flex flex-col items-center">
                    <h2 className="text-2xl font-headline font-semibold">Your gallery is empty</h2>
                    <p className="text-muted-foreground mt-2">Start writing notes to see your beautiful story unfold here.</p>
                </div>
            )}
        </div>
    );
}
