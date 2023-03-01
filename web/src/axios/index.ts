import axios from "axios";

let server = axios.create({
    baseURL:"http://127.0.0.1:3000", 
})

export function getNow() {
    return server.get('/api/weather/now').then((res)=>res.data)
}