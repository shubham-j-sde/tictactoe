import Board from "../Board/Board";

export default function AIBoard({squares, player, onPlay}) {
    return (
     <div>
        <Board squares={squares} player={player} onPlay={onPlay} onAutoMove={handleAutoMove} />    
     </div>
    );
}

function handleAutoMove(squares, player, calculateWinner){
    if(calculateWinner(squares)){ 
        return;
    }
    const opponent = player==='X' ? 'O' : 'X';
    const currentSquares = squares.slice();
    let vacant = [];
    let index = null;

    for(let i=0; i<9; ++i){
        if(!index && !currentSquares[i]){
        currentSquares[i] = opponent;
        if(calculateWinner(currentSquares)===opponent) index = i;
        currentSquares[i] = null;
        vacant.push(i);
        }
    }
    vacant.forEach( i => {
        if(!index && !currentSquares[i]){
        currentSquares[i] = player;
        if(calculateWinner(currentSquares)===player) index = i;
        currentSquares[i] = null;
        }
    });
    if(!index && vacant.length>0) index = vacant[Math.floor(Math.random()*(vacant.length))];
    if(index) squares[index] = opponent;
}
