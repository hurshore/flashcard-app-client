import React, { useReducer, createContext, useContext } from 'react';
import * as actionTypes from './actiontypes';

interface ContextType {
  flashcardSets: {
    _id: string;
    subject: string;
    flashcardCount: number;
  }[];
  openFlashcardSet: {
    _id: string;
    question: string;
    answer: string;
    user: string;
  }[];
}

type ACTIONTYPE =
  | { type: 'SET_USER_FLASHCARD_SETS'; payload: [] }
  | { type: 'SET_OPEN_FLASHCARD_SET'; payload: [] }
  | { type: 'DELETE_FLASHCARD'; payload: { id: string } };

const initialState: ContextType = {
  flashcardSets: [],
  openFlashcardSet: [],
};

const FlashcardStateContext = createContext<ContextType>(initialState);
const FlashcardDispatchContext = createContext((arg: any) => {});

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case actionTypes.SET_USER_FLASHCARD_SETS:
      return { ...state, flashcardSets: action.payload };
    case actionTypes.SET_OPEN_FLASHCARD_SET:
      return { ...state, openFlashcardSet: action.payload };
    case actionTypes.DELETE_FLASHCARD:
      const newFlashcardSets = state.flashcardSets.map((flashcard) =>
        flashcard._id !== action.payload.id
          ? flashcard
          : { ...flashcard, flashcardCount: flashcard.flashcardCount - 1 }
      );
      return {
        ...state,
        flashcardSets: newFlashcardSets,
      };
    default:
      return state;
  }
};

export const FlashcardProvider = ({
  children,
}: {
  children: React.ReactChild;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FlashcardDispatchContext.Provider value={dispatch}>
      <FlashcardStateContext.Provider value={state}>
        {children}
      </FlashcardStateContext.Provider>
    </FlashcardDispatchContext.Provider>
  );
};

export const useFlashcard = () => useContext(FlashcardStateContext);
export const useDispatchFlashcard = () => useContext(FlashcardDispatchContext);
