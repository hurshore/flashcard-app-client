import React from 'react';

const FlipCardContext = React.createContext({
  flipped: false,
  flipCard: () => {},
});

export default FlipCardContext;
