import { CategoryAPI } from 'api/CategoryAPI'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export const ListCategory = () => {
    const [categorys, setCategorys] = useState([])
    useEffect(() => {
     
    getListCategory();
  }, [])

  const getListCategory = () => {
    CategoryAPI.getAllCategorys().then((response) => {
     if(response.data){
         setCategorys(response.data.listResult)
        //  console.log(categorys)
     }
    }).catch(error =>{
        console.log(error);
    })
}
  const deleteCategory = (id) => {
    CategoryAPI.deleteCategory(id).then((response) =>{
     getListCategory();
    }).catch(error =>{
        console.log(error.response);
    })
     
 }
  return (
    <div className = "container">
            <h2 className = "text-center"> List Categorys </h2>
            <Link to = "/category/add" className = "btn btn-primary mb-2" > Add Category </Link>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th> Id </th>
                    <th> Category Name </th>
                    <th> Category Code </th>
                    <th>Update</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                       categorys && categorys.map(
                            category =>
                             <tr key = {category.id}> 
                              <td> {category.id} </td>
                                <td> {category.categoryName} </td>
                                <td> {category.code} </td>
                                <td>
                                    <Link className="btn btn-primary" to={`/category/${category.id}`} >Update</Link>
                                </td>
                                <td>
                                <button className = "btn btn-danger" 
                                    onClick = {() =>deleteCategory(category.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
  )
}
