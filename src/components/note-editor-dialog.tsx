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
import { Calendar as CalendarIcon, Loader2, Wand2 } from 'lucide-react';
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

const noteSchema = z.object({
  date: z.date({ required_error: 'A date is required.' }),
  mood: z.enum(['Happy', 'Romantic', 'Peaceful', 'Excited', 'Playful', 'Longing'], {
    required_error: 'Please select a mood.',
  }),
  content: z.string().min(10, 'The note must be at least 10 characters long.'),
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
    form.reset();
    setSuggestions([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{note ? 'Edit Note' : 'Create New Note'}</DialogTitle>
          <DialogDescription>
            {note ? 'Make changes to your memory.' : 'Capture a beautiful moment with your loved one.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mood</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-2"
                      >
                        {Object.entries(moodEmojis).map(([mood, emoji]) => (
                          <FormItem key={mood} className="flex items-center">
                            <FormControl>
                              <RadioGroupItem value={mood} id={mood} className="sr-only" />
                            </FormControl>
                            <FormLabel
                              htmlFor={mood}
                              className={cn(
                                'flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer w-full',
                                field.value === mood && 'border-primary'
                              )}
                            >
                              <span className="text-2xl">{emoji}</span>
                              <span className="text-xs font-normal">{mood}</span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Pour your heart out..." className="resize-y min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
                 <Button type="button" variant="ghost" onClick={handleGenerateIdeas} disabled={isGenerating} className="text-primary hover:text-primary">
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    {isGenerating ? "Generating Ideas..." : "AI Inspiration"}
                 </Button>
                 {suggestions.length > 0 && (
                     <div className="space-y-2 rounded-md border bg-muted/50 p-3">
                         <p className="text-sm font-medium text-muted-foreground">Suggestions:</p>
                         {suggestions.map((s, i) => (
                             <p key={i} className="text-sm cursor-pointer hover:text-primary" onClick={() => handleSelectSuggestion(s)}>
                                 "{s}"
                             </p>
                         ))}
                     </div>
                 )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Note</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
