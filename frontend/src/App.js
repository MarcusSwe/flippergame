import React, { useEffect, useState } from "react";
import SaveScoreToDatabase from "./toDatabase/saveScoreToDatabase";
import GetScoresFromDatabase from "./toDatabase/getScoresFromDatabase";
import CanvasTest from './Canvas/CanvasTest'
import Flipper from "./Canvas/Flipper";


function App() {

  const [userName, setUserName] = useState("name")
  const [score, setScore] = useState(0)
  const [allscores, SetAllScores] = useState([])  

    
  const addScore = (amount) => {
    console.log("amount: " +amount)
    console.log("score: " +score)
    let newscore = score + amount
    setScore(newscore)
  }

  const saveScore = () => {
    SaveScoreToDatabase(userName, score).then(() =>GetScoresFromDatabase(SetAllScores))
  } 

 useEffect(() => {
    GetScoresFromDatabase(SetAllScores)    
  }, [])

  return (
    <div>
      <Flipper score={score} setScore={setScore} />
           <div>Push arrow up to start, left arrow to move flippers up and right arrow to move them down</div>
           <div>F5 to restart</div>
           <div>&nbsp;</div>
           <span>Score: {score}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
     <input value={userName} type="text" onChange={e =>{setUserName(e.target.value)}} />     
     <button onClick={() => saveScore()}>Add my score</button>
     <br/>
     <div>&nbsp;</div>
     <div>------------</div>   
     <div>Top 10: </div>   
      <div>
       {allscores.sort((a,b) => b.score - a.score).slice(0,10).map((p, index) => <div key={index}>{p.name} : {p.score}</div>)}
      </div>
    </div>
  );
}

export default App;