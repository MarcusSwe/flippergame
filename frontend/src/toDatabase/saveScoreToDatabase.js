import axios from 'axios'

export default function SaveScoreToDatabase(name, score){
 
    const config = {
        url: 'http://localhost:8080/newscore',
        method: 'POST',
        data: {'name': name,
               'score': score}
    }
    return axios(config)
}