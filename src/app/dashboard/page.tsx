// src/app/dashboard/page.tsx
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { useNotes } from '@/hooks/use-notes';
import { moodEmojis } from '@/lib/types';
import { useMemo, useState, useEffect } from 'react';
import { Heart, Calendar, Palette } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';
import { FcmTokenManager } from '@/components/fcm-token-manager';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  notes: {
    label: 'Notes',
  },
  Happy: {
    label: 'Happy',
    color: 'hsl(var(--chart-1))',
  },
  Romantic: {
    label: 'Romantic',
    color: 'hsl(var(--chart-2))',
  },
  Peaceful: {
    label: 'Peaceful',
    color: 'hsl(var(--chart-3))',
  },
  Excited: {
    label: 'Excited',
    color: 'hsl(var(--chart-4))',
  },
  Playful: {
    label: 'Playful',
    color: 'hsl(var(--chart-5))',
  },
  Longing: {
    label: 'Longing',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const { notes, isNotesLoaded } = useNotes();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { totalNotes, daysSinceFirstNote, mostFrequentMood, chartData } = useMemo(() => {
    if (!isNotesLoaded) return { totalNotes: 0, daysSinceFirstNote: 0, mostFrequentMood: 'None', chartData: [] };

    const totalNotes = notes.length;

    let daysSinceFirstNote = 0;
    if (notes.length > 0) {
      const firstNoteDate = notes.reduce((earliest, note) => {
        const noteDate = parseISO(note.date);
        return noteDate < earliest ? noteDate : earliest;
      }, new Date());
      daysSinceFirstNote = differenceInDays(new Date(), firstNoteDate) + 1;
    }

    const moodCounts = notes.reduce((acc, note) => {
      acc[note.mood] = (acc[note.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostFrequentMood = Object.keys(moodCounts).reduce(
      (a, b) => (moodCounts[a] > moodCounts[b] ? a : b),
      'None'
    );

    const chartData = Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      notes: count,
      fill: `var(--color-${mood})`,
    }));

    return { totalNotes, daysSinceFirstNote, mostFrequentMood, chartData };
  }, [notes, isNotesLoaded]);

  if (!isClient) {
    return (
        <div className="flex flex-col gap-8 animate-pulse">
            <div className="text-center">
                <Skeleton className="h-12 w-1/3 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
            </div>
            <Skeleton className="h-80 rounded-lg" />
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">A beautiful summary of our shared story.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalNotes}</div>
            <p className="text-xs text-muted-foreground">cherished memories captured</p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days of Love</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{daysSinceFirstNote}</div>
            <p className="text-xs text-muted-foreground">since our first recorded note</p>
          </CardContent>
        </Card>
        <Card className="transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Our Vibe</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              {mostFrequentMood}{' '}
              {mostFrequentMood !== 'None' && <span className="ml-2 text-3xl">{moodEmojis[mostFrequentMood as keyof typeof moodEmojis]}</span>}
            </div>
            <p className="text-xs text-muted-foreground">is our most frequent mood</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
        <CardHeader>
          <CardTitle>Mood Distribution</CardTitle>
          <CardDescription>A look at the emotions behind our notes.</CardDescription>
        </CardHeader>
        <CardContent>
          {notes.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="mood"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => chartConfig[value]?.label || value}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="notes" radius={8} />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex h-[250px] w-full items-center justify-center text-muted-foreground">
              No notes yet to analyze.
            </div>
          )}
        </CardContent>
      </Card>
      
      <FcmTokenManager />

    </div>
  );
}
