import axios from 'axios';
import  queryString  from 'query-string';
import authHeader from './AuthHeader';

const LIBRARIAN_BASE_REST_API_URL = 'http://localhost:8081/api/librarian';
const LibrarianAPI  = {

    getListBorrow(filters){
        const paramString = queryString.stringify(filters);
        return axios.get(LIBRARIAN_BASE_REST_API_URL+`/borrow?${paramString}`,{headers : authHeader()})
    },
    getSearchUser(name){
        const paramString = queryString.stringify({fullname: name});
        return axios.get(LIBRARIAN_BASE_REST_API_URL+`/searchuser?${paramString}`,{headers : authHeader()})
    },
    deleteBook(listid){
        return axios.delete(LIBRARIAN_BASE_REST_API_URL,{data: listid});
    },
    changePassword(info){
        return axios.put(LIBRARIAN_BASE_REST_API_URL+'/password',info,{headers : authHeader()});
    }
}
export {LibrarianAPI};
