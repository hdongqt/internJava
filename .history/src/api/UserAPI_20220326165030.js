import axios from 'axios';
import  queryString  from 'query-string';
import authHeader from './AuthHeader';

const USER_BASE_REST_API_URL = 'http://localhost:8081/api/users';
const UserAPI  = {

    getListUser(filters){
        const paramString = queryString.stringify(filters);
        return axios.get(USER_BASE_REST_API_URL+`?${paramString}`,{headers : authHeader()})
    },
    deleteUser(listid){
        return axios.delete(USER_BASE_REST_API_URL,{
            headers:authHeader(),
            data: listid
          });
    },
    getOneUser(id){
        return axios.get(USER_BASE_REST_API_URL+ "/" + id,{headers : authHeader()})
    },
    updateBorrow(info,id){
        return axios.put(USER_BASE_REST_API_URL+`/${id}`,info,{headers : authHeader()})
    },
}
export {UserAPI};
