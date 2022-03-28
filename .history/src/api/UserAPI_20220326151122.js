import axios from 'axios';
import  queryString  from 'query-string';
import authHeader from './AuthHeader';

const USER_BASE_REST_API_URL = 'http://localhost:8081/api/user/borrow';
const UserAPI  = {

    getListBorrow(filters){
        const paramString = queryString.stringify(filters);
        return axios.get(LIBRARIAN_BASE_REST_API_URL+`?${paramString}`,{headers : authHeader()})
    },
    getSearchUser(name){
        const paramString = queryString.stringify({fullname: name});
        return axios.get(LIBRARIAN_BASE_REST_API_URL+`/searchuser?${paramString}`,{headers : authHeader()})
    },
    deleteBorrow(listid){
        return axios.delete(LIBRARIAN_BASE_REST_API_URL,{
            headers:authHeader(),
            data: listid
          });
    },
    createBorrow(borrowInfo){
        return axios.post(LIBRARIAN_BASE_REST_API_URL+"/create",borrowInfo,{headers : authHeader()})
    },
    getOneBorrow(id){
        return axios.get(LIBRARIAN_BASE_REST_API_URL+ "/" + id,{headers : authHeader()})
    },
    updateBorrow(info,id){
        return axios.put(LIBRARIAN_BASE_REST_API_URL+`/${id}`,info,{headers : authHeader()})
    },
}
export {LibrarianAPI};
