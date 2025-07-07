'use server';

import {
  generateNoteIdeas as genkitGenerateNoteIdeas,
  type GenerateNoteIdeasInput,
} from '@/ai/flows/generate-note-ideas';

export async function generateNoteIdeas(input: GenerateNoteIdeasInput) {
  try {
    const result = await genkitGenerateNoteIdeas(input);
    return { suggestions: result.suggestions };
  } catch (error) {
    console.error('Error generating note ideas:', error);
    return { error: 'Failed to generate ideas. Please try again.' };
  }
}
