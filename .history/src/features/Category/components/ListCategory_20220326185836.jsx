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
           setCategorys(response.data.map(item=>{
            return {
                ...item, select: false
            }
        }))
     }
    }).catch(error =>{
        console.log(error);
    })
}
const checkDelete = (id,value) =>{
    const s =  categorys.map(item=>{
           if(item.id == id) {
               return {...item,select: value}
           }else{
               return item;
           }
       })
       setCategorys(s)
   }
   

const deleteCategorys = () => {
    const listid = [];
    categorys.forEach(item=>{
        if(item.select){
           listid.push(item.id)
        }
    })
    if(window.confirm("Xác nhận xóa ?")) {
        CategoryAPI.deleteCategory(listid).then((response) =>{
            if(response.status == 200){
                alert("Xóa thành công");
                getListCategory();
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
                    <th>Chi tiết</th>
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
                                <td className='text-center'>
                                    <Link className="btn btn-primary" to={`/category/update/${category.id}`} >Chi tiết</Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
  )
}
