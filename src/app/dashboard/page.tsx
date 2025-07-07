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
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bell, Heart, Calendar, Palette } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';

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
  const { notes } = useNotes();
  const { toast } = useToast();

  const { totalNotes, daysSinceFirstNote, mostFrequentMood, chartData } = useMemo(() => {
    const totalNotes = notes.length;

    let daysSinceFirstNote = 0;
    if (notes.length > 0) {
      const firstNoteDate = notes.reduce((earliest, note) => {
        const noteDate = parseISO(note.date);
        return noteDate < earliest ? noteDate : earliest;
      }, new Date());
      daysSinceFirstNote = differenceInDays(new Date(), firstNoteDate);
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
  }, [notes]);

  const triggerTestNotification = () => {
    toast({
      title: 'A new memory awaits!',
      description: 'Your partner just shared a beautiful moment from your last vacation.',
      image: 'https://placehold.co/200x200.png',
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Our Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">A beautiful summary of our shared story.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNotes}</div>
            <p className="text-xs text-muted-foreground">cherished memories captured</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days of Love</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysSinceFirstNote}</div>
            <p className="text-xs text-muted-foreground">since our first recorded note</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Our Vibe</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {mostFrequentMood}{' '}
              {mostFrequentMood !== 'None' && <span className="ml-2 text-3xl">{moodEmojis[mostFrequentMood as keyof typeof moodEmojis]}</span>}
            </div>
            <p className="text-xs text-muted-foreground">is our most frequent mood</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
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
      
      <Card>
        <CardHeader>
            <CardTitle>Notification Preview</CardTitle>
            <CardDescription>
              This is how a new note notification will appear inside the app. This is a preview and not connected to a real notification system yet.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={triggerTestNotification}>
                <Bell className="mr-2 h-4 w-4" />
                Trigger Test Notification
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
