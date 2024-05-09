import {useState} from 'react';
import Board from './Board/Board';

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const player = currentMove%2 === 0 ? 'X' : 'O';
  
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }
  
  const moves = history.map( (squares, move) => {
    let description;
    if (move > 0) {
      let index = 0;
      while(index<9 && history[move][index]===history[move-1][index]) index++;

      description = `Go to move #${move} : row=${Math.floor(index/3)} col=${index%3}`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <div>
         <button onClick={() => jumpTo(move)}>{description}</button>
        </div>
      </li>
    );
  });

  moves[moves.length - 1] = <li key={moves.length-1}>You are at move #{currentMove} </li>

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <Board player={player} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}
