import React, { useEffect, useState } from "react";
import SaveScoreToDatabase from "./toDatabase/saveScoreToDatabase";
import GetScoresFromDatabase from "./toDatabase/getScoresFromDatabase";

function App() {

  const [userName, setUserName] = useState("name")
  const [score, setScore] = useState(0)
  const [allscores, SetAllScores] = useState([])
  const [reload, setReload] = useState(false)

  const saveScore = () => {
    SaveScoreToDatabase(userName, score, reload, setReload)    
  }

  useEffect(() => {
    GetScoresFromDatabase(SetAllScores)    
  }, [reload])

  useEffect(() => {
    GetScoresFromDatabase(SetAllScores)    
  }, [])

  return (
    <div>
           fetch to mongoDB test
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

/* 
 GetScoresFromDatabase().then(res => SetAllScores(res.data))    
*/