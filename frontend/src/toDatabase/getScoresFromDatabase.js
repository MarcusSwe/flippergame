import axios from 'axios'

export default function GetScoresFromDatabase(SetAllScores){
 
    const config = {
        url: 'http://localhost:8080/all',
        method: 'GET'
    }
   return axios(config).then(res => SetAllScores(res.data))
}