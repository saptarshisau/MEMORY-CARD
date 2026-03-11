import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";
import { WinMessage } from "./components/WinMessage";
import useGameLogic from "./hooks/useGameLogic";

const cardValues = [
  "🍎","🍌","🍇","🍊",
  "🍓","🥝","🍑","🍒",
  "🍎","🍌","🍇","🍊",
  "🍓","🥝","🍑","🍒"
];

function App() {

  const {
    cards,
    score,
    moves,
    handleCardClick,
    initializeGame,
    isGameComplete
  } = useGameLogic(cardValues);

  return (

    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 p-6 text-white">

      <GameHeader
        score={score}
        moves={moves}
        onReset={initializeGame}
      />

      {isGameComplete && <WinMessage moves={moves} />}

      <div className="grid grid-cols-4 gap-4 w-full max-w-xl">

        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
          />
        ))}

      </div>

    </div>
  );
}

export default App;