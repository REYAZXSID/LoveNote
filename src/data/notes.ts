import { Note } from "@/lib/types";
import { format, subDays } from 'date-fns';

const today = new Date();

export const initialNotes: Note[] = [
  {
    id: '1',
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    content: "Thinking of you today and how much you light up my life. Every moment with you is a treasure.",
    mood: 'Romantic',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: '2',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    content: "Just a little reminder of how much I appreciate you. Thanks for being you.",
    mood: 'Happy',
    image: 'https://placehold.co/400x600.png',
  },
  {
    id: '3',
    date: format(subDays(today, 10), 'yyyy-MM-dd'),
    content: "Can't wait for our next adventure together! I'm so excited for all the memories we'll make.",
    mood: 'Excited',
  },
];
