import axios from 'axios';

const AUTH_BASE_REST_API_URL = 'http://localhost:8081/auth/';
const authAPI = {
    login: info=>axios.post(AUTH_BASE_REST_API_URL+"signin", info),
    register: info => axios.post(AUTH_BASE_REST_API_URL + "signup",info),
}
export {authAPI as AuthAPI};
