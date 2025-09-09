import axios from "axios";

//encapsulate axios for easy using
const http = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

export { http }