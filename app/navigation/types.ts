export type AuthStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  AddFlashcard: undefined;
  EditFlashcard: {
    id: string;
    subject: string;
    question: string;
    answer: string;
  };
  MyFlashcards: undefined;
  Account: undefined;
  ViewFlashcard: {
    id: string;
    subject: string;
    random: boolean;
    flashcardCount: number;
  };
};
