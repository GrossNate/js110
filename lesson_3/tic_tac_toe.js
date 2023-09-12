const readline = require("readline-sync");

const EMPTY_SQUARE = " ";
const USER_MARKER = "X";
const COMPUTER_MARKER = "O";
const WINNING_ARRAYS = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

const board = {
  boardStateArray: [],
  initializeBoardState: function () {
    for (let x = 0; x <= 2; x += 1) {
      if (this.boardStateArray[x] === undefined) {
        this.boardStateArray.push([]);
      }
      for (let y = 0; y <= 2; y += 1) {
        this.boardStateArray[x][y] = EMPTY_SQUARE;
      }
    }
  },
  generateDisplay: function () {
    return "\n" +
      "  A   B   C\n" +
      `1 ${this.boardStateArray[0][0]} │ ${this.boardStateArray[0][1]} │ ${
        this.boardStateArray[0][2]
      }\n` +
      " ───┼───┼───\n" +
      `2 ${this.boardStateArray[1][0]} │ ${this.boardStateArray[1][1]} │ ${
        this.boardStateArray[1][2]
      }\n` +
      " ───┼───┼───\n" +
      `3 ${this.boardStateArray[2][0]} │ ${this.boardStateArray[2][1]} │ ${
        this.boardStateArray[2][2]
      }\n` +
      "\n";
  },
  isEmptySquare: function (moveArr) {
    let [x, y] = moveArr;
    return this.boardStateArray[y][x] === EMPTY_SQUARE;
  },
  registerMove: function (moveArr, player) {
    let [x, y] = moveArr;
    if (!this.isEmptySquare(moveArr)) return false;
    this.boardStateArray[y][x] = player === "user"
      ? USER_MARKER
      : COMPUTER_MARKER;
    return true;
  },
  isFull: function () {
    for (let y = 0; y < this.boardStateArray.length; y += 1) {
      for (let x = 0; x < this.boardStateArray[y].length; x += 1) {
        if (this.isEmptySquare([x, y])) return false;
      }
    }
    return true;
  },
  whoseSquare: function (moveArr) {
    return this.boardStateArray[moveArr[1]][moveArr[0]];
  },
};

function isGameOver(board) {
  return (board.isFull() || !!determineWinner(board));
}

function determineWinner(board) {
  for (let combo = 0; combo < WINNING_ARRAYS.length; combo += 1) {
    if (
      board.whoseSquare(WINNING_ARRAYS[combo][0]) ===
        board.whoseSquare(WINNING_ARRAYS[combo][1]) &&
      board.whoseSquare(WINNING_ARRAYS[combo][1]) ===
        board.whoseSquare(WINNING_ARRAYS[combo][2])
    ) {
      if (board.whoseSquare(WINNING_ARRAYS[combo][0]) != EMPTY_SQUARE) {
        return (board.whoseSquare(WINNING_ARRAYS[combo][0]) === USER_MARKER)
          ? "user"
          : "computer";
      }
    }
  }
  return false;
}

function moveStringToXYArr(moveString) {
  let x = moveString[0] === "A" ? 0 : moveString[0] === "B" ? 1 : 2;
  let y = Number(moveString[1]) - 1;
  return [x, y];
}

function computerMove(board) {
  let computerMove;
  do {
    computerMove = [
      Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 3),
    ];
  } while (!board.isEmptySquare(computerMove));
  return computerMove;
}

function solicitMove() {
  let moveString = readline.question(
    "Please enter the column and row of your move: ",
    {
      limit: /^[a-cA-C][1-3]$/,
      limitMessage:
        "Invalid move. Your move should have two characters - the letter of the" +
        " column A, B, or C followed by the number of the row 1, 2, or 3. For" +
        ' example, the center square is "B2".\n',
    },
  ).toUpperCase();
  return moveStringToXYArr(moveString);
}

function displayGameOver(board) {
  console.clear();
  console.log(board.generateDisplay());
  console.log(
    !!determineWinner(board)
      ? `The winner is the ${determineWinner(board)}!`
      : "It's a tie!",
  );
}

function playGame() {
  board.initializeBoardState();
  while (true) {
    console.clear();
    console.log(`You are ${USER_MARKER}. Computer is ${COMPUTER_MARKER}.`);
    console.log(board.generateDisplay());
    let userMove = solicitMove();
    while (!board.registerMove(userMove, "user")) {
      console.log(
        "Invalid move - that square is already taken. Please try again.",
      );
      userMove = solicitMove();
    }
    if (isGameOver(board)) break;
    board.registerMove(computerMove(board), "computer");
    if (isGameOver(board)) break;
  }
  displayGameOver(board);
}

while (true) {
  playGame();
  if (!readline.keyInYN("Would you like to play again (y/n)? ")) break;
}
console.log("Thanks for playing tic-tac-toe!");
