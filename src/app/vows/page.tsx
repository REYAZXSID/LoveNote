// src/app/vows/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useVows } from '@/hooks/use-vows';
import { Vow } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Plus, Trash, Save, BookHeart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VowsPage() {
  const { vows, addVow, updateVow, deleteVow } = useVows();
  const [selectedVow, setSelectedVow] = useState<Vow | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // This effect ensures the selected vow is always valid and in sync with the vows list.
    
    // Case 1: No vows exist. Ensure nothing is selected.
    if (vows.length === 0) {
      if (selectedVow !== null) setSelectedVow(null);
      return;
    }

    // Case 2: A vow is selected, but it's no longer in the list (e.g., it was deleted).
    // We select the first vow in the updated list to ensure the UI is not in an invalid state.
    if (selectedVow && !vows.some(v => v.id === selectedVow.id)) {
      setSelectedVow(vows[0]);
      return;
    }
    
    // Case 3: No vow is selected, but there are vows in the list.
    // We select the first one (e.g., on initial load, or after adding the very first vow).
    if (!selectedVow && vows.length > 0) {
      setSelectedVow(vows[0]);
      return;
    }
  }, [vows]);

  useEffect(() => {
    if (selectedVow) {
      setTitle(selectedVow.title);
      setContent(selectedVow.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedVow]);

  const handleSelectVow = (vow: Vow) => {
    setSelectedVow(vow);
  };

  const handleNewVow = () => {
    const newVow = addVow({ title: 'New Vow', content: '' });
    setSelectedVow(newVow);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Vow',
        description: 'Please provide a title and content for your vow.',
      });
      return;
    }

    if (selectedVow) {
      updateVow({
        ...selectedVow,
        title,
        content,
        lastUpdated: new Date().toISOString(),
      });
      toast({ title: 'Vow Updated', description: 'Your vow has been saved successfully.' });
    }
  };

  const handleDelete = (vowId: string) => {
    deleteVow(vowId);
    toast({ title: 'Vow Deleted', description: 'The vow has been removed.', variant: 'destructive' });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 min-h-[calc(100vh-12rem)] animate-fade-in">
      <Card className="md:col-span-1 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-2xl">Your Vows</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleNewVow}>
            <Plus className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow p-0">
          <ScrollArea className="h-full">
            <div className="p-2 md:p-4 pt-0 space-y-2">
            {vows.length > 0 ? (
              vows.map((vow) => (
                <div
                  key={vow.id}
                  className={cn(
                    'p-3 rounded-lg cursor-pointer border-2 transition-all duration-200',
                    selectedVow?.id === vow.id
                      ? 'border-primary bg-primary/10 shadow-inner'
                      : 'border-transparent hover:bg-muted'
                  )}
                  onClick={() => handleSelectVow(vow)}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 overflow-hidden">
                      <h3 className="font-semibold truncate font-body">{vow.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        Updated {formatDistanceToNow(new Date(vow.lastUpdated), { addSuffix: true })}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive flex-shrink-0" onClick={(e) => { e.stopPropagation(); handleDelete(vow.id); }}>
                        <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
                <div className="text-center text-muted-foreground p-8 flex flex-col items-center justify-center h-full">
                    <BookHeart className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <p className="font-semibold">No vows yet.</p>
                    <p className="text-sm">Click the '+' to start writing.</p>
                </div>
            )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Vow Editor</CardTitle>
          <CardDescription>
            {selectedVow ? 'Edit your commitment below.' : 'Create a new vow to cherish forever.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4">
          <Input
            placeholder="Vow Title (e.g., My Promise to You)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold font-body"
            disabled={!selectedVow}
          />
          <Textarea
            placeholder="Write your heart out..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow resize-none font-body text-base leading-relaxed min-h-[250px] md:min-h-0"
            disabled={!selectedVow}
          />
           <div className="flex justify-end">
            <Button onClick={handleSave} disabled={!selectedVow}>
              <Save />
              Save Vow
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
