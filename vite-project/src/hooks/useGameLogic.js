import { useState, useCallback } from "react";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateInitialCards = (values) => {
  const shuffled = shuffleArray(values);
  return shuffled.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};

const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState(() => generateInitialCards(cardValues));
  const [flippedCards, setFlippedCards] = useState([]); // Warning should disappear now
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = useCallback(() => {
    setCards(generateInitialCards(cardValues));
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
    setIsLocked(false);
  }, [cardValues]);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || isLocked) return;

    // 1. Update the UI to show the card flipped immediately
    setCards((prevCards) =>
      prevCards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );

    // 2. Logic for matching
    if (flippedCards.length === 0) {
      // First card of the pair
      setFlippedCards([card.id]);
    } else {
      // Second card of the pair
      const firstCardId = flippedCards[0];
      const firstCard = cards.find((c) => c.id === firstCardId);
      
      setMoves((m) => m + 1);
      setIsLocked(true);

      if (firstCard.value === card.value) {
        // MATCH
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCardId, card.id]);
          setScore((s) => s + 1);
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCardId || c.id === card.id
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // NO MATCH
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCardId || c.id === card.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 800);
      }
    }
  };

  const isGameComplete =
    matchedCards.length === cardValues.length && cardValues.length > 0;

  return {
    cards,
    score,
    moves,
    handleCardClick,
    initializeGame,
    isGameComplete,
  };
};
export default useGameLogic;