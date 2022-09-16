import React, {useState,useEffect} from 'react'

const TILE_COLORS = ['red', 'green', 'blue', 'yellow'];

function Memory() {
    //states
    const[board,setBoard] = useState(()=>
        shuffle([...TILE_COLORS,...TILE_COLORS])
    );
    const [selectedTiles, setSelectedTiles] = useState([]);
    const[matchedTiles,setMatchedTiles] = useState([]);

    //function
    const selectTile = (index) =>{
        if (selectedTiles.length>=2 || selectedTiles.includes(index)) return;
            
        setSelectedTiles([...selectedTiles,index]);
    };
    //useEffect
    useEffect(() => {
        if(selectedTiles.length<2) return;

        if (board[selectedTiles[0]] === board[selectedTiles[1]]) {
            setMatchedTiles([...matchedTiles,...selectedTiles]);
            setSelectedTiles([]);
        }
        else{
            setTimeout(()=>{
                const timeOutId = setSelectedTiles([]);
                return () => clearTimeout(timeOutId);
            },1000);
        }
    }, [selectedTiles,board,matchedTiles]);
    
    //restart game
    const restartGame = () => {
        setBoard(shuffle([...TILE_COLORS,...TILE_COLORS]));
        setSelectedTiles([]);
        setMatchedTiles([]);
    };

    //did player win (win case)
    const didPlayerWin = matchedTiles.length === board.length;
     
  return (
   <>
   <h1>{didPlayerWin ? 'You Win' : 'Memory'}</h1>
      <div className='board'>
        {
            board.map((tileColor,key) => {
            const isTurnedOver = selectedTiles.includes(key) || matchedTiles.includes(key);
            const className = isTurnedOver ? `tile ${tileColor}`: "tile ";
            return(
                <div key={key} className={className} onClick={()=> selectTile(key)}/>
            )
        })}
      </div>
      {didPlayerWin && <button onClick={restartGame}>Restart</button>}
   </>
  )
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
  
      // Swap the elements at i and randomIndex
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

export default Memory