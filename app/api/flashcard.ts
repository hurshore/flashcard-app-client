import client from './client';

const getRandomFlashcards = () => client.get('/flashcard/set/random/all');
const getRandomFlashcard = (categoryId: string, amount: number) =>
  client.get('/flashcard/set/random', { categoryId, amount });

export default { getRandomFlashcards, getRandomFlashcard };
