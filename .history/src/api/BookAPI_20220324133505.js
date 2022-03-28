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
        var imagefile = document.querySelector('#file');
        formData.append("image", imagefile.files[0]);
        axios.post('upload_file', formData, {
            
        })
        return axios.post(BOOK_BASE_REST_API_URL, book, {headers: {
            'Content-Type': 'multipart/form-data'
            }})
    },

    getBookById(bookId){
        return axios.get(BOOK_BASE_REST_API_URL + '/' + bookId);
    },

    updateBook(book){
        console.log(book)
        return axios.put(BOOK_BASE_REST_API_URL + '/' +book.id, book);
    },

    deleteBook(bookId){
        return axios.delete(BOOK_BASE_REST_API_URL + '/' + bookId);
    }
}
export {bookAPI as BookAPI};
