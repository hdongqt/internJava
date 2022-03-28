import axios from 'axios';
import  queryString  from 'query-string';
import authHeader from './AuthHeader';

const LIBRARIAN_BASE_REST_API_URL = 'http://localhost:8081/api/librarian';
const Librarian  = {

    getListBorrow(filters){
        const paramString = queryString.stringify(filters);
        return axios.get(LIBRARIAN_BASE_REST_API_URL+`/borrow?${paramString}`,{headers : authHeader()})
    },
    getInfo(){
        return axios.get(LIBRARIAN_BASE_REST_API_URL+'/info',{headers : authHeader()})
    },
    updateInfo(newInfo){
        return axios.put(LIBRARIAN_BASE_REST_API_URL+'/info',newInfo,{headers : authHeader()});
    },
    deleteHistory(id){
        return axios.delete(LIBRARIAN_BASE_REST_API_URL, {
            headers:authHeader(),
            data: [id]
          });
    },
    changePassword(info){
        return axios.put(LIBRARIAN_BASE_REST_API_URL+'/password',info,{headers : authHeader()});
    }
}
export {Librarian};
