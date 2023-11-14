const readline = require("readline-sync");
const HEART = "♥️";
const CLUB = "♣️";
const SPADE = "♠️";
const DIAMOND = "♦️";
const VALUES = {
  A: [1, 11],
  2: [2],
  3: [3],
  4: [4],
  5: [5],
  6: [6],
  7: [7],
  8: [8],
  9: [9],
  10: [10],
  J: [10],
  Q: [10],
  K: [10],
};
const TARGET = 21;
const DEALER_MIN = 17;
const MAX_PLAYERS = 6;
const MAX_DECKS = 8;

// Need a generator for creating player IDs. We could force unique names on the
// players, but this is more interesting.
function* idGeneratorFunction() {
  let id = 0;
  while (true) {
    id += 1;
    yield id;
  }
}

const idGenerator = idGeneratorFunction();

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.face = "down";
  }

  flip(face) {
    if (face) {
      this.face = face;
    } else if (this.face === "up") {
      this.face = "down";
    } else {
      this.face = "up";
    }
  }

  getNumericalValues() {
    return VALUES[this.value];
  }
  getDisplayString() {
    return (this.face === "down")
      ? "[    ]"
      : `[${this.value.toString().padStart(2, " ")}${this.suit} ]`;
  }
}

class Hand {
  cards = [];
  constructor(name, isDealer = false) {
    this.name = name;
    this.isDealer = isDealer;
    this.id = idGenerator.next().value;
    this.totalValue = 0;
  }
  add(card) {
    this.cards.push(card);
    this.totalValue = this.calculateValue();
  }
  remove(position) {
    let cardToReturn;
    if (position === "top") {
      cardToReturn = this.cards.pop();
    } else {
      cardToReturn = this.cards.shift();
    }
    this.totalValue = this.calculateValue();
    return cardToReturn;
  }
  getCardCount() {
    return this.cards.length;
  }
  getDisplayString() {
    return this.cards.map((card) => card.getDisplayString()).join(" ");
  }
  calculateValue() {
    const sumValues = (sum, cardArr) => {
      if (cardArr.length === 0) {
        return (sum <= TARGET) ? sum : 0;
      } else {
        return Math.max(
          ...(cardArr[0].getNumericalValues().map((value) =>
            sumValues(value + sum, cardArr.slice(1))
          )),
        );
      }
    };
    return (sumValues(0, this.cards) === 0)
      ? TARGET + 1
      : sumValues(0, this.cards);
  }

  turnCardsFaceUp() {
    this.cards.forEach((card) => card.flip("up"));
  }
}

class Deck {
  cards = [];
  constructor() {
    Object
      .keys(VALUES)
      .forEach((value) => {
        this.add(new Card(value, HEART));
        this.add(new Card(value, CLUB));
        this.add(new Card(value, DIAMOND));
        this.add(new Card(value, SPADE));
      });
  }
  addDeck(deck) {
    while (deck.getCardCount() > 0) {
      this.add(deck.take());
    }
  }
  getCardCount() {
    return this.cards.length;
  }
  shuffle() {
    for (let index = this.cards.length - 1; index > 0; index -= 1) {
      let otherIndex = Math.floor(Math.random() * (index + 1));
      [this.cards[index], this.cards[otherIndex]] = [
        this.cards[otherIndex],
        this.cards[index],
      ];
    }
  }

  add(card, position = "top", face = "down") {
    card.flip(face);
    if (position === "top") {
      this.cards.push(card);
    } else {
      this.cards.unshift(card);
    }
  }

  take(face = "down") {
    let cardToReturn = this.cards.pop();
    cardToReturn.flip(face);
    return cardToReturn;
  }
}

/**
 * Deals blackjack hands to each player and the dealer..
 * @param {Deck} deck
 * @param {Hand[]} players
 */
function deal(deck, players) {
  players.forEach((hand) => hand.add(deck.take("up")));
  players.forEach((hand) => {
    if (hand.isDealer) {
      hand.add(deck.take("down"));
    } else {
      hand.add(deck.take("up"));
    }
  });
}

/**
 * Takes all the cards out of players' hands and puts them back in the deck.
 * @param {Deck} deck
 * @param {Hand[]} players
 */
function putAllCardsBackInDeck(deck, players) {
  players.forEach((hand) => {
    while (hand.getCardCount() > 0) {
      deck.add(hand.remove());
    }
  });
}

/**
 * Takes a card from the top of the deck and adds it to the hand, face up.
 * @param {Deck} deck
 * @param {Hand} hand
 */
function hit(deck, hand) {
  hand.add(deck.take("up"));
}

/**
 * Composes a string for the name line of displaying game state.
 * @param {Hand} dealer
 * @param {Hand} player
 * @param {boolean} showDealerHand
 * @param {String} leftPadString
 */
function getNameDisplayString(dealer, player, showDealerHand, leftPadString) {
  let nameLine = "";
  if (showDealerHand) {
    nameLine += dealer.name;
    nameLine += " ".repeat(leftPadString.length - nameLine.length);
  } else {
    nameLine += leftPadString;
  }
  nameLine += player.name;
  nameLine += ` (${player.totalValue > TARGET ? "bust" : player.totalValue})`;
  return nameLine;
}

/**
 * Composes a string for the card line of displaying game state.
 * @param {Hand} dealer
 * @param {Hand} player
 * @param {boolean} showDealerHand
 * @param {String} leftPadString
 */
function getCardDisplayString(dealer, player, showDealerHand, leftPadString) {
  let cardLine = "";
  if (showDealerHand) {
    cardLine += dealer.getDisplayString() + "   ";
  } else {
    cardLine += leftPadString;
  }
  cardLine += player.getDisplayString();
  return cardLine;
}

/**
 * Composes a string with the winner of the game..
 * @param {Hand} dealer
 * @param {Hand} player
 * @param {String} leftPadString
 */
function getGameResultString(dealer, player, leftPadString) {
  let winnerId = determineWinner(dealer, player);
  if (winnerId === null) {
    return `${leftPadString}It's a tie between the dealer and ${player.name}.`;
  } else if (winnerId === dealer.id) {
    return `${leftPadString}The dealer beats ${player.name}.`;
  } else {
    return `${leftPadString}${player.name} is the winner!`;
  }
}

/**
 * Displays all the hands.
 * @param {Hand[]} players
 * @param {boolean} isGameOver
 */
function displayGameState(players, isGameOver = false) {
  let [dealer] = players.filter((hand) => hand.isDealer);
  players = players.filter((hand) => !hand.isDealer);
  let padString = " ".repeat((dealer.getCardCount() * 7) + 2);
  for (let i = 0; i < players.length; i += 1) {
    let showDealerHand = i === Math.ceil(players.length / 2) - 1;
    console.log(
      getNameDisplayString(dealer, players[i], showDealerHand, padString),
    );
    console.log(
      getCardDisplayString(dealer, players[i], showDealerHand, padString),
    );
    if (isGameOver) {
      console.log(getGameResultString(dealer, players[i], padString));
    }
    console.log();
  }
}

/**
 * Determine winner between two players' hands.
 * @param {Hand} player1
 * @param {Hand} player2
 * @returns {number} id of the winning hand, or null if it's a tie.
 */
function determineWinner(player1, player2) {
  if (
    (player1.totalValue > TARGET && player2.totalValue > TARGET) ||
    (player1.totalValue === player2.totalValue)
  ) {
    return null;
  } else if (player1.totalValue > TARGET) {
    return player2.id;
  } else if (player2.totalValue > TARGET) {
    return player1.id;
  } else if (player1.totalValue > player2.totalValue) {
    return player1.id;
  } else {
    return player2.id;
  }
}

/**
 * Everything a player does in their turn.
 * @param {Hand} player The player whose turn it is.
 * @param {Hand[]} players All players.
 * @param {Deck} deck
 */
function doPlayerTurn(player, players, deck) {
  while (player.totalValue < TARGET) {
    console.clear();
    displayGameState(players);
    let playerAction = readline.keyIn(
      `${player.name}, would you like to hit (h) or stand (s)? `,
      { limit: ["h", "s"], limitMessage: 'Please enter "h" or "s".' },
    );
    if (playerAction.toLowerCase() === "h") {
      hit(deck, player);
    } else {
      break;
    }
  }
}
function displayWelcomeScreen() {
  console.log(
    "Let's play . . . \n\n" +
      " _     _            _    _            _    \n" +
      "| |   | |          | |  (_)          | |   \n" +
      "| |__ | | __ _  ___| | ___  __ _  ___| | __\n" +
      "| '_ \\| |/ _` |/ __| |/ / |/ _` |/ __| |/ /\n" +
      "| |_) | | (_| | (__|   <| | (_| | (__|   < \n" +
      "|_.__/|_|\\__,_|\\___|_|\\_\\ |\\__,_|\\___|_|\\_\\\n" +
      "                       _/ |                \n" +
      "                      |__/\n\n" +
      "This is the most basic version of the casino-style game. Closest to " +
      `${TARGET} without going over wins. Each player plays against the ` +
      `dealer. If the dealer gets a natural blackjack (${TARGET} on the ` +
      "deal) then the game is over immediately and no players have a chance " +
      "to take any cards. If you need more help than that then Google is " +
      "your friend or you could just play a round or two. I hope you have fun.\n",
  );
}

console.clear();
displayWelcomeScreen();
readline.question("Press enter key to continue.", {
  hideEchoBack: true,
  mask: "",
});
console.clear();
// Add all the players and dealer to the game.
let players = [];
let dealer = new Hand("Dealer", true);

while (players.length < MAX_PLAYERS) {
  let newPlayerName = readline.question(
    `New player name${(players.length > 0) ? " (or enter to continue)" : ""}: `,
  );
  if (newPlayerName === "") {
    if (players.length === 0) {
      console.log("You should add at least one player.");
    } else {
      break;
    }
  } else {
    players.push(new Hand(newPlayerName));
  }
}
players.push(dealer);

console.log();

// Create and shuffle the deck we're going to use.
let deck = new Deck();
let deckLimitRegExp = new RegExp(`^[1-${MAX_DECKS}]{1}$`);
let numberOfDecks = readline.question(
  `How many decks do you want to play with? (1 - ${MAX_DECKS}): `,
  {
    limitMessage: `Please enter a number from 1 to ${MAX_DECKS}, inclusive.`,
    limit: deckLimitRegExp,
  },
);
while (numberOfDecks > 1) {
  deck.addDeck(new Deck());
  numberOfDecks -= 1;
}

// Game loop.
while (true) {
  console.clear();
  deck.shuffle();
  deal(deck, players);
  // This if statement just skips the players and dealer taking cards if the
  // dealer gets a blackjack on the deal.
  if (!(dealer.totalValue === TARGET)) {
    // Player loop
    for (let playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      if (players[playerIndex].isDealer) continue;
      // Turn loop
      doPlayerTurn(players[playerIndex], players, deck);
    }
    // Dealer loop (skip if all players bust).
    if (
      players.filter((hand) => !hand.isDealer).every((hand) =>
        hand.totalValue > TARGET
      )
    ) {
      console.log("All players bust, dealer wins.");
    } else {
      while (dealer.totalValue < DEALER_MIN) {
        hit(deck, dealer);
      }
    }
  }
  dealer.turnCardsFaceUp();
  console.clear();
  displayGameState(players, true);
  let playAgain = readline.keyInYNStrict("Would you like to play again? ");
  if (playAgain) {
    putAllCardsBackInDeck(deck, players);
  } else {
    break;
  }
}
