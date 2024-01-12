import React, { useState, useEffect } from "react";
import "./App.css";
import Logo from "./logo";

const initialBoard = Array(9).fill(null);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] };
    }
  }

  return null;
};

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winningSquares, setWinningSquares] = useState([]);

  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner) {
      setWinningSquares(winner.winningLine);
    }
  }, [winner]);

  const handleClick = (index) => {
    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    const isWinnerSquare = winner && winner.winningLine.includes(index);
    const isWinnerLineSquare = winningSquares.includes(index);
    const squareClassName = `square ${isWinnerSquare ? 'winner' : ''} ${isWinnerLineSquare ? 'winner-line' : ''}`;
    return (
      <div
        className={squareClassName}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinningSquares([]);
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      <Logo />

      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <div>
        {winner ? `Winner: ${winner.winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>

      <button id="restartGame" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
