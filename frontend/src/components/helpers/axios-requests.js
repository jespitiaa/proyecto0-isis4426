import axios from 'axios';

const instance = axios.create({
    baseURL:'http://172.24.98.89:8080/',
    responseType: "json"
})

export default instance;
