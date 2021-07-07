import client from './client';

const getRandomFlashcards = () => client.get('/flashcard/set/random/all');

const getRandomFlashcard = (categoryId: string, amount: number) =>
  client.get('/flashcard/set/random', { categoryId, amount });

const createFlashcard = (
  flashcard: {
    subject: string;
    question: string;
    answer: string;
  },
  onUploadProgress: (progress: number) => void
) => {
  return client.post('/flashcard', flashcard, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getUserFlashcards = () => client.get('/flashcard/set/user');

const getUserFlashcard = (id: string) => client.get('/flashcard/set', { id });

const deleteFlashcard = (id: string) => client.delete('/flashcard', { id });

export default {
  getRandomFlashcards,
  getRandomFlashcard,
  createFlashcard,
  getUserFlashcards,
  getUserFlashcard,
  deleteFlashcard,
};
