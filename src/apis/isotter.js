import axios from 'axios';
import env from '../environment';


export default axios.create({
    baseURL: env.API_ORIGIN,
    headers: {
        'Content-Type': 'application/json'
    }
})