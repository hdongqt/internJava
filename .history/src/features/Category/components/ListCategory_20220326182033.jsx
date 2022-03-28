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
         console.log(response.data)
         setCategorys(response.data)
        //  console.log(categorys)
     }
    }).catch(error =>{
        console.log(error);
    })
}
const deleteCategorys = () => {
    const listid = [];
    categorys.forEach(item=>{
        if(item.select){
           listid.push(item.id)
        }
    })
    if(window.confirm("Xác nhận xóa ?")) {
        CategoryAPI.deleteUser(listid).then((response) =>{
            if(response.status == 200){
                alert("Xóa thành công");
                getListUser();
            }
           }).catch(error =>{
               console.log(error.response)
               alert("Xóa không thành công !");
           })
    }
 }
  return (
    <div className = "container">
            <h2 className = "text-center"> Thể loại </h2>
            <Link to = "/category/add" className = "btn btn-primary mb-2" > Thêm thể loại </Link>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th> Id </th>
                    <th> Tên thể loại </th>
                    <th> Code </th>
                    <th> Mô tả </th>
                    <th>Cập nhật</th>
                    <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                {
                       categorys && categorys.map(
                            category =>
                             <tr key = {category.id}> 
                              <td> {category.id} </td>
                                <td> {category.name} </td>
                                <td> {category.code} </td>
                                <td> {category.description} </td>
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
