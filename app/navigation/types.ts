export type AuthStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  AddFlashcard: undefined;
  MyFlashcards: undefined;
  Account: undefined;
};

export type HomeScreenParamList = {
  Home: undefined;
  ViewFlashcard: { id: string; subject: string; random: boolean };
};
