// src/ai/flows/generate-note-ideas.ts
'use server';

/**
 * @fileOverview Provides AI-generated suggestions for romantic phrases or one-liners to inspire love notes.
 *
 * - generateNoteIdeas - A function that returns AI-generated suggestions for romantic phrases.
 * - GenerateNoteIdeasInput - The input type for the generateNoteIdeas function.
 * - GenerateNoteIdeasOutput - The return type for the generateNoteIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNoteIdeasInputSchema = z.object({
  mood: z
    .string()
    .describe("The overall mood or feeling the user wants to convey in the note (e.g., 'Excited', 'Calm', 'Passionate')."),
  topic: z
    .string()
    .optional()
    .describe("Optional topic or theme for the love note (e.g., 'Anniversary', 'First Date', 'Missing You')."),
});
export type GenerateNoteIdeasInput = z.infer<typeof GenerateNoteIdeasInputSchema>;

const GenerateNoteIdeasOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of AI-generated romantic phrases or one-liners.'),
});
export type GenerateNoteIdeasOutput = z.infer<typeof GenerateNoteIdeasOutputSchema>;

export async function generateNoteIdeas(input: GenerateNoteIdeasInput): Promise<GenerateNoteIdeasOutput> {
  return generateNoteIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNoteIdeasPrompt',
  input: {schema: GenerateNoteIdeasInputSchema},
  output: {schema: GenerateNoteIdeasOutputSchema},
  prompt: `You are a love note writing assistant.  Provide 3 suggestions for romantic phrases or one-liners based on the mood and topic specified.

Mood: {{{mood}}}
Topic: {{topic}}`,
});

const generateNoteIdeasFlow = ai.defineFlow(
  {
    name: 'generateNoteIdeasFlow',
    inputSchema: GenerateNoteIdeasInputSchema,
    outputSchema: GenerateNoteIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
