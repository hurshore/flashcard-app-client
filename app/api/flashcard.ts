import client from './client';

const getRandomFlashcards = () => client.get('/flashcard/set/random/all');
const getRandomFlashcard = (categoryId: string, amount: number) =>
  client.get('/flashcard/set/random', { categoryId, amount });
const createFlashcard = (flashcard: {
  subject: string;
  question: string;
  answer: string;
}) => {
  const { subject, question, answer } = flashcard;
  const data = new FormData();
  data.append('subject', subject);
  data.append('question', question);
  data.append('answer', answer);

  console.log(data);

  return client.post('/flashcard', flashcard);
};

export default { getRandomFlashcards, getRandomFlashcard, createFlashcard };
