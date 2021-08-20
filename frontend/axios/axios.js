import axios from 'axios';
import {baseURL} from '../helpers/env';

const Axios = axios.create({
    baseURL:baseURL+'/api/',
    timeout:10000,
    headers:{
        'Content-Type': 'application/json',
        accept: 'application/json'
    },
    withCredentials:true


})

export default  Axios;