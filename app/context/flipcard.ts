import React from 'react';

interface ContextType {
  flipped: boolean;
  flipCard: () => void;
}

const FlipCardContext = React.createContext<ContextType>({
  flipped: false,
  flipCard: () => {},
});

export default FlipCardContext;
