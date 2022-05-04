const nextTwo = 2;
const FOUR = 4;

export const handleNextCards = (cardIndex, setCardIndex) => {
  if (cardIndex < FOUR) {
    setCardIndex(cardIndex + nextTwo);
  } else {
    setCardIndex(0);
  }
};

export const handlePreviousCards = (cardIndex, setCardIndex) => {
  if (cardIndex >= 2) {
    setCardIndex(cardIndex - nextTwo);
  } else {
    setCardIndex(FOUR);
  }
};
