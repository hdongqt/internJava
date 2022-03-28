import axios from 'axios';
import  queryString  from 'query-string';

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
            'Content-Type': 'multipart/form-data'
            }})
    },

    getBookById(bookId){
        return axios.get(BOOK_BASE_REST_API_URL + '/' + bookId);
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

    deleteBook(bookId){
        return axios.delete(BOOK_BASE_REST_API_URL + '/' + bookId);
    }
}
export {bookAPI as BookAPI};
