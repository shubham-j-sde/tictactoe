import Square from "./Square/Square";
import "./Board.css";

export default function Board({player, squares, onPlay, onAutoMove}) {

    function handleClick(i){
      if(!player || squares[i] || calculateWinner(squares)){ 
        return; 
      }
    
      const nextSquares = squares.slice();
      nextSquares[i] = player;
      onAutoMove(nextSquares, player, calculateWinner);
      onPlay(nextSquares);
    }
  
    const winner = calculateWinner(squares);
    let status;
    if(winner){
      status =  "Winner: " + winner;
    }
    else{
      status = "Next player: " + (player ? player : "Select a Player");
    }
  
    const board = [];
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
          row.push(<Square key={3*i+j} value={squares[i*3+j]} onSquareClick={() => handleClick(i*3+j)} />);
        }
        board.push(<div key={i} className="board-row">{row}</div>);
    }
  
    return (
    <>
    <div className="status">{status}</div>
      {board}
    </>
    );
  }


function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let draw = true;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      if(!squares[a] || !squares[b] || !squares[c]) draw = false;
    }
    if(draw) return 'draw';
    return null;
  }
  