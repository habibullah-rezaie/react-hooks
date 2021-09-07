// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';
import {useLocalStorageState} from '../utils';

function Board({squares, onSelect}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onSelect(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [boards, setBoards] = useLocalStorageState('history', [
    Array(9).fill(null),
  ]);

  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0);

  const currentSquares = boards[currentStep];

  // - nextValue ('X' or 'O')
  const nextValue = calculateNextValue(currentSquares);

  // - winner ('X', 'O', or null)
  const winner = calculateWinner(currentSquares);

  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  const status = calculateStatus(winner, currentSquares, nextValue);

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return;
    }

    const squaresCopy = [...currentSquares];
    squaresCopy[square] = nextValue;

    setCurrentStep(prevStep => prevStep + 1);
    setBoards(prevBoards => {
      const newBoards = [...prevBoards].slice(0, currentStep + 1);
      newBoards.push(squaresCopy);
      return newBoards;
    });
  }

  function restart() {
    // 🐨 reset the squares
    setCurrentStep(0);
    setBoards([Array(9).fill(null)]);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={boards[currentStep]}
          onSelect={selectSquare}
        />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>

        <ol>
          {boards.map((board, i) => {
            let text = `Go to move #${i}`;
            if (i === currentStep) {
              text += ' (current)';
            } else if (i === 0) {
              text = 'Go to game start';
            }
            return (
              <li key={board.toString()}>
                <button
                  disabled={i === currentStep}
                  onClick={() => {
                    setCurrentStep(i);
                  }}
                >
                  {text}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
