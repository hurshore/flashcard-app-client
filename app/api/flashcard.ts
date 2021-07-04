import client from './client';

const getRandomFlashcards = () => client.get('/flashcard/set/random/all');

export default { getRandomFlashcards };
