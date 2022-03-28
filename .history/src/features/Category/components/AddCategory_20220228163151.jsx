import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CategoryAPI } from 'api/CategoryAPI';

export default function AddCategory() {
  const {categoryId} = useParams();
  const [categoryName, setCategoryName] = useState('')
  const [code, setCode] = useState('')
  const history =  useHistory()
 
  const saveOrUpdateBook = (e) => {
    e.preventDefault();
    let category = {categoryName, code}
    if(categoryId){
        category = {id: categoryId, ...category}
        CategoryAPI.updateCategory(category).then((response) => {
            history.push('/category')
        }).catch(error => {
            console.log(error.response)
        })

    }else{
        CategoryAPI.createCategory(category).then((response) =>{
            console.log(response)
                alert("Thêm category thành công !");
                history.push('/category');
        }).catch(error => {
            if(error.response){
               if(error.response.data.message) alert(error.response.data.message)
               else{
                   const objectt =  error.response.data
                for (let key in objectt) {
                    if (objectt.hasOwnProperty(key)) {
                      alert(objectt[key])
                    }
                  }
               }
            }
        })
    }
}
useEffect(() => {

   if(categoryId){
    CategoryAPI.getCategoryById(categoryId).then((response) =>{
        if(response.data){
            setCategoryName(response.data.categoryName)
            setCode(response.data.code)
        }
      }).catch(error => {
          if(error.response){
              alert(error.response.data.message)
          }
      })
   }
}, [categoryId])


  return (
    <div>
    <br /><br />
    <div className = "container">
         <div className = "row">
             <div className = "card col-md-6 offset-md-3 offset-md-3">
             <h2 className = "text-center">{categoryId ? "Update Category" : "Add Category"}</h2>
                 <div className = "card-body">
                     <form>
                         <div className = "form-group mb-2">
                             <label className = "form-label"> Category Name:</label>
                             <input
                                 type = "text"
                                 placeholder = "Enter category name"
                                 name = "category"
                                 className = "form-control"
                                 value = {categoryName}
                                 onChange = {(e) => setCategoryName(e.target.value)}
                             >
                             </input>
                         </div>
                         <div className = "form-group mb-2">
                             <label className = "form-label"> Category Code:</label>
                             <input
                                 type = "email"
                                 placeholder = "Enter category code"
                                 name = "categorycode"
                                 className = "form-control"
                                 value = {code}
                                 onChange = {(e) => setCode(e.target.value)}
                             >
                             </input>
                             
                         </div>
                         <button className = "btn btn-success" 
                         style={{marginRight: "8px"}}
                         onClick = {(e) => saveOrUpdateBook(e)} 
                         >Submit </button>
                         <Link to="/category" className="btn btn-danger"> Cancel </Link>
                     </form>

                 </div>
             </div>
         </div>

    </div>

 </div>
  )
}
