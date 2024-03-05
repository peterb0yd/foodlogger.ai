import { createClient } from '@deepgram/sdk';

export const deepgram = createClient(process.env.DEEPGRAM_API_KEY as string);