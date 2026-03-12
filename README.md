# 🧠 Memory Card Game

🚀 **Live Demo:** https://memory-card-yh2d.vercel.app

A simple and interactive **Memory Card Matching Game** built using **React, JavaScript, and Tailwind CSS**.
The goal of the game is to flip cards and match pairs with the same emoji. The player wins when all pairs are matched.

This project demonstrates **React component architecture, custom hooks, state management, and UI interactions**.

---

# 🎮 Demo

Play the game locally after cloning the repository.

Example gameplay:

1. Click on a card to reveal its emoji.
2. Click another card to try matching the pair.
3. If the emojis match, the cards stay revealed.
4. If they do not match, they flip back.
5. Match all pairs to win the game.

---

# ✨ Features

### 🃏 Card Matching Logic

* 16 cards (8 matching pairs)
* Randomized card positions every game
* Flip animation logic

### 🔄 Shuffle Algorithm

Uses the **Fisher–Yates shuffle** algorithm to randomize cards.

### 🧠 Game State Management

Handled using a **custom React hook (`useGameLogic`)**.

Tracks:

* Flipped cards
* Matched cards
* Score
* Moves
* Game completion state

### 🏆 Win Detection

Displays a **congratulations message** when all cards are matched.

### 🔁 Reset Game

Start a new game anytime using the **New Game button**.

### 🎨 Modern UI

Built with **Tailwind CSS** featuring:

* Dark theme
* Smooth hover effects
* Responsive layout
* Animated win message

---

# 🛠 Tech Stack

* **React**
* **JavaScript**
* **Tailwind CSS**
* **Vite**

---

# 📂 Project Structure

```
memory-card-game/
│
├── src
│   ├── components
│   │   ├── Card.jsx
│   │   ├── GameHeader.jsx
│   │   └── WinMessage.jsx
│   │
│   ├── hooks
│   │   └── useGameLogic.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
```

---

# ⚙️ How the Game Works

### 1️⃣ Card Initialization

Cards are generated and shuffled at the start of the game.

```javascript
const generateInitialCards = (values) => {
  const shuffled = shuffleArray(values);
  return shuffled.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};
```

---

### 2️⃣ Card Click Logic

When a card is clicked:

* It flips immediately.
* The game checks if another card is flipped.
* If both match → they remain visible.
* If not → they flip back after a delay.

---

### 3️⃣ Move Tracking

Each pair attempt increases the move count.

```javascript
setMoves((m) => m + 1);
```

---

### 4️⃣ Win Detection

The game ends when all pairs are matched.

```javascript
const isGameComplete =
  matchedCards.length === cardValues.length && cardValues.length > 0;
```

---

# 🧩 Key Components

## Card Component

Responsible for rendering each card and handling click interactions.

Props:

* `card`
* `onClick`

---

## GameHeader Component

Displays:

* Game title
* Score
* Move count
* Reset button

---

## WinMessage Component

Displays a congratulatory message when the player wins.

---

## useGameLogic Hook

Encapsulates the core game logic including:

* Card flipping
* Matching logic
* Score tracking
* Game reset

---

# 💻 Installation

### Clone the repository

```
git clone https://github.com/YOUR_USERNAME/memory-card-game.git
```

### Navigate into the project

```
cd memory-card-game
```

### Install dependencies

```
npm install
```

### Run the development server

```
npm run dev
```

Open your browser and go to:

```
http://localhost:5173
```

---

# 🚀 Future Improvements

Possible enhancements for the game:

* Add **flip animations**
* Add **difficulty levels**
* Add **timer**
* Add **best score tracking**
* Add **sound effects**
* Add **mobile gesture support**
* Add **local storage for high scores**

---

# 👨‍💻 Author

**Saptarshi Sau**


---

⭐ If you like this project, consider giving it a **star on GitHub**!
