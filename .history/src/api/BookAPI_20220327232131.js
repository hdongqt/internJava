import axios from 'axios';
import  queryString  from 'query-string';
import authHeader from './AuthHeader';

const BOOK_BASE_REST_API_URL = 'http://localhost:8081/api/books';
const bookAPI = {

    getAllBooks(filters){
        const paramString = queryString.stringify(filters);
        return axios.get(BOOK_BASE_REST_API_URL+`?${paramString}`)
    },
    createBook(book){
        var formData = new FormData();
        for (let key in book) {
            if (book.hasOwnProperty(key)) {
                console.log(book[key])
                formData.append(key, book[key]);
            }
          }
        return axios.post(BOOK_BASE_REST_API_URL, formData, {headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader()
            }})
    },

    getBookById(bookId){
        return axios.get(BOOK_BASE_REST_API_URL + '/' + bookId,{headers : authHeader()}));
    },

    updateBook(book){
        var formData = new FormData();
        for (let key in book) {
            if (book.hasOwnProperty(key)) {
                formData.append(key, book[key]);
            }
          }
        return axios.put(BOOK_BASE_REST_API_URL + '/' +book.id,  formData, {headers: {
            'Content-Type': 'multipart/form-data'
            }})
    },

    deleteBook(listid){
        return axios.delete(BOOK_BASE_REST_API_URL,{data: listid});
    },
    searchBook(name){
        const paramString = queryString.stringify({name: name});
        return axios.get(BOOK_BASE_REST_API_URL+`/search?${paramString}`)
    }
}
export {bookAPI as BookAPI};
