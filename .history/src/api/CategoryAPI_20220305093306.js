import axios from 'axios';
import authHeader from './AuthHeader';
const CATEGORY_BASE_REST_API_URL = 'http://localhost:8081/api/categorys';
const categoryAPI = {

    getAllCategorys(){
        return axios.get(CATEGORY_BASE_REST_API_URL,{headers : authHeader()})
    },
    createCategory(category){
        return axios.post(CATEGORY_BASE_REST_API_URL, category)
    },

    getCategoryById(categoryId){
        return axios.get(CATEGORY_BASE_REST_API_URL + '/' + categoryId);
    },

    updateCategory(category){
        return axios.put(CATEGORY_BASE_REST_API_URL + '/' + category.id,category);
    },

    deleteCategory(cateid){
        return axios.delete(CATEGORY_BASE_REST_API_URL + '/' + cateid);
    }
}
export {categoryAPI as CategoryAPI};
