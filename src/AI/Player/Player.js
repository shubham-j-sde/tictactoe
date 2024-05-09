import "./Player.css"

export default function Player({player, setPlayer}){
    return (
        <div className="select-player">
          <button onClick={() => setPlayer('X') } disabled={player}>X</button>
          <button onClick={() => setPlayer('O') } disabled={player}>O</button>
        </div>
    );
}
