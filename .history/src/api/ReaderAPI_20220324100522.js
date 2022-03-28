import axios from 'axios';
import  queryString  from 'query-string';
import authHeader from './AuthHeader';

const READER_BASE_REST_API_URL = 'http://localhost:8081/api/reader';
const readerAPI = {

    getHistorys(filters){
        const paramString = queryString.stringify(filters);
        console.log(paramString)
        return axios.get(READER_BASE_REST_API_URL+`/history?${paramString}`,{headers : authHeader()})
    },
    getInfo(){
        return axios.get(READER_BASE_REST_API_URL+'/info',{headers : authHeader()})
    },
    updateInfo(newInfo){
        return axios.put(READER_BASE_REST_API_URL+'/info',newInfo,{headers : authHeader()});
    },
    deleteHistory(id){
        let 
        return axios.get(READER_BASE_REST_API_URL,data:{
            
        },{headers : authHeader()});
    }
}
export {readerAPI as ReaderAPI};
