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
import { Plus, Trash, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VowsPage() {
  const { vows, addVow, updateVow, deleteVow } = useVows();
  const [selectedVow, setSelectedVow] = useState<Vow | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (vows.length > 0 && !selectedVow) {
      setSelectedVow(vows[0]);
    }
  }, [vows, selectedVow]);

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
    } else {
      const newVow = addVow({ title, content });
      setSelectedVow(newVow);
      toast({ title: 'Vow Saved', description: 'Your new vow is safely stored.' });
    }
  };

  const handleDelete = (vowId: string) => {
    deleteVow(vowId);
    if (selectedVow?.id === vowId) {
      setSelectedVow(null);
    }
    toast({ title: 'Vow Deleted', description: 'The vow has been removed.' });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:min-h-[75vh]">
      <Card className="md:col-span-1 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Vows</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleNewVow}>
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow p-0">
          <ScrollArea className="h-full">
            <div className="p-2 md:p-6 pt-0 space-y-2">
            {vows.length > 0 ? (
              vows.map((vow) => (
                <div
                  key={vow.id}
                  className={cn(
                    'p-3 rounded-lg cursor-pointer border-2 transition-colors',
                    selectedVow?.id === vow.id
                      ? 'border-primary bg-primary/10'
                      : 'border-transparent hover:bg-muted/50'
                  )}
                  onClick={() => handleSelectVow(vow)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 overflow-hidden">
                      <h3 className="font-semibold truncate">{vow.title}</h3>
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
                <div className="text-center text-muted-foreground p-8">
                    <p>No vows yet. Click the '+' to start writing.</p>
                </div>
            )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 flex flex-col">
        <CardHeader>
          <CardTitle>Editor</CardTitle>
          <CardDescription>
            {selectedVow ? 'Edit your vow below.' : 'Create a new vow to cherish forever.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4">
          <Input
            placeholder="Vow Title (e.g., My Vows to My Love)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold"
          />
          <Textarea
            placeholder="Write your heart out..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow resize-none font-body text-base leading-relaxed min-h-[250px] md:min-h-0"
          />
           <div className="flex justify-end">
            <Button onClick={handleSave} disabled={!selectedVow}>
              <Save className="mr-2 h-4 w-4" />
              Save Vow
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
