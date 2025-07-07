export type Mood = 'Happy' | 'Romantic' | 'Peaceful' | 'Excited' | 'Playful' | 'Longing';

export const moodEmojis: Record<Mood, string> = {
  Happy: '😊',
  Romantic: '🥰',
  Peaceful: '😌',
  Excited: '🤩',
  Playful: '😜',
  Longing: '🥺',
};

export interface Note {
  id: string;
  date: string; // YYYY-MM-DD
  content: string;
  mood: Mood;
  image?: string;
}
