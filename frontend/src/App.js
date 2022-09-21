import React, { useEffect, useState } from "react";
import SaveScoreToDatabase from "./toDatabase/saveScoreToDatabase";
import GetScoresFromDatabase from "./toDatabase/getScoresFromDatabase";
import CanvasTest from './Canvas/CanvasTest'


function App() {

  const [userName, setUserName] = useState("name")
  const [score, setScore] = useState(0)
  const [allscores, SetAllScores] = useState([])  

  

  
  

  const saveScore = () => {
    SaveScoreToDatabase(userName, score).then(() =>GetScoresFromDatabase(SetAllScores))
  } 

 useEffect(() => {
    GetScoresFromDatabase(SetAllScores)    
  }, [])

  return (
    <div>
      <CanvasTest />
           <div>fetch to mongoDB test</div>
     <input value={userName} type="text" onChange={e =>{setUserName(e.target.value)}} />
     <input value={score} type="number" onChange={e =>{setScore(e.target.value)}} />
     <button onClick={() => saveScore()}>to database</button>     
      <div>
       {allscores.map((p, index) => <div key={index}>{p.name} - {p.score}</div>)}
      </div>
    </div>
  );
}

export default App;