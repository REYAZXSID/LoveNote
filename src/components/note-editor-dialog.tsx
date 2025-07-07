'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Calendar as CalendarIcon, Image as ImageIcon, Loader2, Wand2 } from 'lucide-react';
import { useNotes } from '@/hooks/use-notes';
import { Note, Mood, moodEmojis } from '@/lib/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateNoteIdeas } from '@/app/actions';
import { Input } from './ui/input';

const noteSchema = z.object({
  date: z.date({ required_error: 'A date is required.' }),
  mood: z.enum(['Happy', 'Romantic', 'Peaceful', 'Excited', 'Playful', 'Longing'], {
    required_error: 'Please select a mood.',
  }),
  content: z.string().min(10, 'The note must be at least 10 characters long.'),
  image: z.string().url().optional().or(z.literal('')),
});

type NoteFormData = z.infer<typeof noteSchema>;

export function NoteEditorDialog({ children, note }: { children: React.ReactNode; note?: Note }) {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { addNote, updateNote } = useNotes();
  const { toast } = useToast();

  const form = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      date: note ? new Date(note.date + 'T12:00:00Z') : new Date(),
      mood: note ? note.mood : 'Romantic',
      content: note ? note.content : '',
      image: note ? note.image : '',
    },
  });

  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    setSuggestions([]);
    const mood = form.getValues('mood');
    const result = await generateNoteIdeas({ mood });
    if (result.suggestions) {
      setSuggestions(result.suggestions);
    } else if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate ideas. Please try again.',
      });
    }
    setIsGenerating(false);
  };
  
  const handleSelectSuggestion = (suggestion: string) => {
    const currentContent = form.getValues('content');
    form.setValue('content', currentContent ? `${currentContent}\n\n${suggestion}` : suggestion);
  }

  const onSubmit = (data: NoteFormData) => {
    const noteData = { ...data, date: format(data.date, 'yyyy-MM-dd') };
    if (note) {
      updateNote({ ...note, ...noteData });
      toast({ title: 'Note Updated!', description: 'Your cherished memory has been updated.' });
    } else {
      addNote(noteData);
      toast({ title: 'Note Saved!', description: 'A new memory has been captured forever.' });
    }
    setOpen(false);
    form.reset({
      date: new Date(),
      mood: 'Romantic',
      content: '',
      image: '',
    });
    setSuggestions([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl">{note ? 'Edit Memory' : 'New Memory'}</DialogTitle>
          <DialogDescription>
            {note ? 'Make changes to your memory.' : 'Capture a beautiful moment with your loved one.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="https://example.com/image.png" {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's the mood?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 sm:grid-cols-6 gap-2"
                    >
                      {Object.entries(moodEmojis).map(([mood, emoji]) => (
                        <FormItem key={mood} className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value={mood} id={mood} className="sr-only" />
                          </FormControl>
                          <FormLabel
                            htmlFor={mood}
                            className={cn(
                              'flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer w-full aspect-square transition-all duration-200 hover:scale-105',
                              field.value === mood && 'border-primary ring-2 ring-primary scale-105 shadow-lg'
                            )}
                          >
                            <span className="text-4xl">{emoji}</span>
                            <span className="text-xs font-medium mt-1">{mood}</span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your sweet words</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Pour your heart out..." className="resize-y min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2 pt-2">
                 <Button type="button" variant="ghost" onClick={handleGenerateIdeas} disabled={isGenerating} className="text-primary hover:text-primary">
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 />}
                    {isGenerating ? "Thinking of sweet words..." : "AI Inspiration"}
                 </Button>
                 {suggestions.length > 0 && (
                     <div className="space-y-2 rounded-md border bg-muted/50 p-4 animate-fade-in">
                         <p className="text-sm font-medium text-muted-foreground">Here are a few ideas:</p>
                         <ul className="list-disc list-inside space-y-1">
                            {suggestions.map((s, i) => (
                                <li key={i} className="text-sm cursor-pointer hover:text-primary" onClick={() => handleSelectSuggestion(s)}>
                                    {s}
                                </li>
                            ))}
                         </ul>
                     </div>
                 )}
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" size="lg">Save Note</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
