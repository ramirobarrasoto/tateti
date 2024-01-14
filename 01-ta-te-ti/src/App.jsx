import { useState } from 'react';
import './App.css';

const PLAYERS = {
  X: 'x',
  O: 'o',
};

const winnerCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index);
    console.log('valor de clic', index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(PLAYERS.X);
  const [winner, setWinner] = useState(null);

  const winnerCheck = (boardToCheck) => {
    for (const combo of winnerCombination) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    // validación para no pisar una posición
    if (board[index] || winner) return;
    // cambio en el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambio en el turno del jugador
    const newTurn = turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
    setTurn(newTurn);
    // validamos si hay un ganador
    const newWinner = winnerCheck(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className='board'>
      <h1>Ta Te Ti</h1>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === PLAYERS.X}>{PLAYERS.X}</Square>
        <Square isSelected={turn === PLAYERS.O}>{PLAYERS.O}</Square>
      </section>
      {winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h1>{winner === false ? 'EMPATE' : 'GANÓ: '}</h1>
            <header>{winner && <Square>{winner}</Square>}</header>
            <footer>
              <button>Volver a jugar</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
