const readline = require("readline-sync");

const EMPTY_SQUARE = " ";
const USER_MARKER = "X";
const COMPUTER_MARKER = "O";
const MAX_POSITIONS_TO_EVALUATE = 10000000000; // Works on MacBook Air M2
const CHAR_CODE_FOR_A = 65;
const CHAR_CODE_FOR_LOWERCASE_A = 97;
let xDimension;
let yDimension;
let numSquaresRequiredToWin;
let winningArrays;
let limitRegExp;
let limitMessageText;

// This examines each square on the board, looking for winning combinations that
// have it as an endpoint.
function generateWinningCombinations(xDim, yDim, squaresNeeded) {
  let winningArrays = [];
  for (let x = 0; x < xDim; x += 1) {
    for (let y = 0; y < yDim; y += 1) {
      // Checks for a winning combination going down.
      if (yDim - 1 - y >= squaresNeeded - 1) {
        let newCombo = [];
        for (let count = 0; count < squaresNeeded; count += 1) {
          newCombo.push([x, y + count]);
        }
        winningArrays.push(newCombo);
      }
      // Checks for a winnning combination going across.
      if (xDim - 1 - x >= squaresNeeded - 1) {
        let newCombo = [];
        for (let count = 0; count < squaresNeeded; count += 1) {
          newCombo.push([x + count, y]);
        }
        winningArrays.push(newCombo);
      }
      // Checks for a winning combination going down and right.
      if (
        (xDim - 1 - x >= squaresNeeded - 1) &&
        (yDim - 1 - y >= squaresNeeded - 1)
      ) {
        let newCombo = [];
        for (let count = 0; count < squaresNeeded; count += 1) {
          newCombo.push([x + count, y + count]);
        }
        winningArrays.push(newCombo);
      }
      // Checks for a winning combination going down and left.
      if (
        (x - (squaresNeeded - 1) >= 0) &&
        (yDim - 1 - y >= squaresNeeded - 1)
      ) {
        let newCombo = [];
        for (let count = 0; count < squaresNeeded; count += 1) {
          newCombo.push([x - count, y + count]);
        }
        winningArrays.push(newCombo);
      }
    }
  }
  return winningArrays;
}

// This is the board object we'll use. It has methods to alter its state and
// give information about its state, but it doesn't have methods that know
// about the game itself (like if anyone has won, etc.)
const board = {
  boardStateArray: [],
  // This is because we haven't learned how to create classes and such yet, I'm
  // using stuff that we actually have learned. Hence the duplicate function.
  duplicate: function () {
    let newBoard = Object.assign({}, this);
    newBoard.boardStateArray = newBoard.boardStateArray.map((subArr) =>
      subArr.slice()
    );
    return newBoard;
  },
  initializeBoardState: function () {
    for (let y = 0; y <= (yDimension - 1); y += 1) {
      if (this.boardStateArray[y] === undefined) {
        this.boardStateArray.push([]);
      }
      for (let x = 0; x <= (xDimension - 1); x += 1) {
        this.boardStateArray[y][x] = EMPTY_SQUARE;
      }
    }
  },
  findEmptySquares: function () {
    let emptySquares = [];
    for (let y = 0; y < this.boardStateArray.length; y += 1) {
      for (let x = 0; x < this.boardStateArray[y].length; x += 1) {
        if (this.isEmptySquare([x, y])) {
          emptySquares.push([x, y]);
        }
      }
    }
    return emptySquares;
  },
  findAdjacentSquares: function (square) {
    let adjacentSquares = [];
    let x = square[0];
    let y = square[1];
    for (let yOffset of [-1, 0, 1]) {
      for (let xOffset of [-1, 0, 1]) {
        if (!(this.boardStateArray[y + yOffset][x + xOffset] === undefined)) {
          adjacentSquares.push([x + xOffset, y + yOffset]);
        }
      }
    }
  },
  // This is a little complicated because we're enabling it to display an
  // arbitrarily large gameboard (though it's really limited to 9 tall and 26)
  // wide because otherwise we run into spacing issues with the row numbers and
  // we run out of letters in the English alphabet.
  generateDisplay: function () {
    let dividerRow = ` ─${Array(xDimension).fill("─").join("─┼─")}─\n`;
    let boardRows = Array(yDimension).fill().map((_, index) =>
      `${index + 1} ${this.boardStateArray[index].join(" │ ")}\n`
    );
    return "\n" +
      `  ${
        Array(xDimension).fill().map((_, index) =>
          String.fromCharCode(index + CHAR_CODE_FOR_A)
        ).join("   ")
      }\n` +
      boardRows.join(dividerRow) +
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

// Helper function we'll use to determine the max depth that we're going to look
// for a good move.
function partialFactorial(from, to) {
  if (from === to) {
    return to;
  } else {
    return from * partialFactorial(from - 1, to);
  }
}

function isGameOver(board) {
  return (board.isFull() || !!determineWinner(board));
}

function determineWinner(board) {
  for (let combo = 0; combo < winningArrays.length; combo += 1) {
    if (
      winningArrays[combo].every((move) =>
        board.whoseSquare(move) === USER_MARKER
      )
    ) {
      return "user";
    } else if (
      winningArrays[combo].every((move) =>
        board.whoseSquare(move) === COMPUTER_MARKER
      )
    ) {
      return "computer";
    }
  }
  return false;
}

function moveStringToXYArr(moveString) {
  let x = moveString[0].charCodeAt() - CHAR_CODE_FOR_A;
  let y = Number(moveString[1]) - 1;
  return [x, y];
}

function determineMovePointValue(move, board, player, maxDepth, depth = 0) {
  board = board.duplicate(); // Needed to avoid mutating in recursion.
  board.registerMove(move, player);
  if (determineWinner(board) === "user") {
    return -20 + depth;
  } else if (determineWinner(board) === "computer") {
    return 20 - depth;
  } else if (board.isFull() || depth > maxDepth) {
    return 0;
  } else if (player === "user") {
    return Math.max(
      ...(board.findEmptySquares().map((move) =>
        determineMovePointValue(move, board, "computer", maxDepth, depth + 1)
      )),
    );
  } else {
    return Math.min(
      ...(board.findEmptySquares().map((move) =>
        determineMovePointValue(move, board, "user", maxDepth, depth + 1)
      )),
    );
  }
}

function findMaxDepthPossible(emptySquares) {
  let maxDepth = 0;
  for (let depth = 0; depth <= emptySquares; depth += 1) {
    if (
      partialFactorial(emptySquares, emptySquares - depth) *
          (winningArrays.length ** depth) <= MAX_POSITIONS_TO_EVALUATE
    ) {
      maxDepth = depth;
    } else {
      break;
    }
  }
  return maxDepth;
}

function computerMove(board) {
  const emptySquares = board.findEmptySquares();
  // Boards bigger than 3x4 seem too challenging for Minimax and my processor,
  // so I've tweaked the algorithm to limit the depth and, in the case of
  // multiple moves with the same point value I'm having the computer choose
  // one closer to the center of the board. Also, I'm doing simple checks first
  // on the off-chance that they will help in large boards.

  // If we can win in the next move, then do so.
  for (let move of emptySquares) {
    let computerBoard = board.duplicate();
    computerBoard.registerMove(move, "computer");
    if (determineWinner(computerBoard) === "computer") {
      return move;
    }
  }

  // If we can block opponent from winning, then do so.
  for (let move of emptySquares) {
    let userBoard = board.duplicate();
    userBoard.registerMove(move, "user");
    if (determineWinner(userBoard) === "user") {
      return move;
    }
  }

  // Otherwise, use the Minimax with depth limit.
  let maxDepth = findMaxDepthPossible(emptySquares.length);
  console.log(`Looking up to ${maxDepth} moves ahead.`);
  console.log(
    `There are ${winningArrays.length} possible winning combinations.`,
  );
  console.log(
    `So, I'm evaluating ${
      partialFactorial(emptySquares.length, emptySquares.length - maxDepth)
    } different move sequences against each of those winning combinations.`,
  );
  let movePoints = emptySquares.map((move) =>
    determineMovePointValue(move, board, "computer", maxDepth)
  );
  // Make an array of the moves that have the max points.
  let bestMoves = emptySquares.map((move, index) => [move, movePoints[index]])
    .filter(([_, points]) => points === Math.max(...movePoints))
    .map(([move, _]) => move);
  // All else being equal, choose a move closest to the center of the board.
  let simpleMovePoints = bestMoves.map((move) => {
    let centralityPoints = Math.sqrt(
      (((xDimension - 1) / 2) - (Math.abs((xDimension - 1) / 2) - move[0])) +
        (((yDimension - 1) / 2) - (Math.abs((yDimension - 1) / 2) - move[1])),
    );
    return centralityPoints;
  });
  return bestMoves[simpleMovePoints.indexOf(Math.max(...simpleMovePoints))];
}

function solicitMove() {
  let moveString = readline.question(
    "Please enter the column and row of your move: ",
    {
      limit: limitRegExp,
      limitMessage: limitMessageText,
    },
  ).toUpperCase();
  return moveStringToXYArr(moveString);
}

function displayGameOver(board) {
  console.clear();
  console.log(board.generateDisplay());
  console.log(
    determineWinner(board)
      ? `The winner is the ${determineWinner(board)}!`
      : "It's a tie!",
  );
}

function displayGameState() {
  console.clear();
  console.log(`You are ${USER_MARKER}. Computer is ${COMPUTER_MARKER}.`);
  console.log(board.generateDisplay());
}

function playGame() {
  while (true) {
    displayGameState();
    let userMove = solicitMove();
    while (!board.registerMove(userMove, "user")) {
      console.log(
        "Invalid move - that square is already taken. Please try again.",
      );
      userMove = solicitMove();
    }
    if (isGameOver(board)) break;
    displayGameState();
    console.log("Computer is thinking . . .");
    board.registerMove(computerMove(board), "computer");
    if (isGameOver(board)) break;
  }
  displayGameOver(board);
}

function joinOr(arr, delimeter = ",", andOr = "or") {
  if (arr.length <= 2) {
    return arr.join(" " + andOr + " ");
  } else {
    return `${arr.slice(0, -1).join(delimeter + " ")}${delimeter} ${andOr} ${
      arr.slice(-1)
    }`;
  }
}

function solicitGameParameters() {
  console.clear();
  let dimension = Number.parseInt(
    readline.question(
      "Input width of board (default is 3): ",
      {
        defaultInput: 3,
        limit: /^[3-9]$/,
        limitMessage: "Please pick a number 3 through 9.",
      },
    ),
    10,
  );
  xDimension = dimension; // Pick a number <= 26 or we run out of letters.
  yDimension = dimension; // Pick a number <= 9 or the board won't render properly.
  let winningSquareCountLimit = new RegExp(`^[3-${dimension}$]`);
  let winningSquareCountLimitMessage = (dimension === 3)
    ? "3 is the only valid choice"
    : `Must pick a number 3 through ${dimension}`;
  numSquaresRequiredToWin = Number.parseInt(
    readline.question(
      "Input number of squares needed to win (default is 3): ",
      {
        defaultInput: 3,
        limit: winningSquareCountLimit,
        limitMessage: winningSquareCountLimitMessage,
      },
    ),
    10,
  );
}

function setUpDimensionalPseudoConstants() {
  winningArrays = generateWinningCombinations(
    xDimension,
    yDimension,
    numSquaresRequiredToWin,
  );

  limitRegExp = new RegExp(
    `^[` +
      `a-${String.fromCharCode(xDimension + (CHAR_CODE_FOR_LOWERCASE_A - 1))}` +
      `A-${String.fromCharCode(xDimension + (CHAR_CODE_FOR_A - 1))}]` +
      `[1-${yDimension}]$`,
  );
  limitMessageText =
    "Invalid move. Your move should have two characters - the letter of the column " +
    `${
      joinOr(
        Array(xDimension).fill().map((_, index) =>
          String.fromCharCode(index + CHAR_CODE_FOR_A)
        ),
      )
    } ` +
    "followed by the number of the row " +
    `${joinOr(Array(yDimension).fill().map((_, index) => index + 1))}. ` +
    'For example, the top left square is "A1".\n';
}

while (true) {
  solicitGameParameters();
  setUpDimensionalPseudoConstants();
  board.initializeBoardState();
  playGame();
  if (!readline.keyInYN("Would you like to play again? ")) break;
}
console.log("Thanks for playing tic-tac-toe!");
