import React, { useEffect, useState } from 'react'
import { BookAPI } from 'api/BookAPI'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import Select  from 'react-select';
import { UserAPI } from 'api/UserAPI';

const options = [
    { value: 'ROLE_USER', label: 'Bạn đọc' },
    { value: 'ROLE_LIBRARIAN', label: 'Thủ thư' },
    { value: 'ROLE_ADMIN', label: 'Admin' }
  ]
  
export const ListUser = () => {
    const [users, setUsers] = useState([])
    const [pagination,setPagination] = useState({
        page: 1,
        limit: 5,
        totalPage : 1
    })
    const [filters,setFilters] = useState({
        page: 1,
        limit: 5,
        role: "ROLE_USER",
        fullname: ""
    })
    const handelPageChange = (newPage) =>{
      setFilters({...filters, page: newPage})
      getListUser()
    } 

    useEffect(() => {
            getListUser();
    }, [])
  const getListUser = () => {
    UserAPI.getListUser(filters).then((response) => {
     if(response.data.listResult){
     let list = response.data.listResult;
     console.log(list)
       setUsers(list.map(item=>{
        return {
            ...item, select: false
        }
    }))
       setPagination({
           page: response.data.page,
           limit: 1,
           totalPage :response.data.totalPage
       })
    }
}).catch(error =>{
    console.log(error);
})
}
const checkDelete = (id,value) =>{
 const s =  users.map(item=>{
        if(item.id == id) {
            return {...item,select: value}
        }else{
            return item;
        }
    })
    setUsers(s)
}

  const deleteUser = () => {
    const listid = [];
    users.forEach(item=>{
        if(item.select){
           listid.push(item.id)
        }
    })
   console.log(listid)
    if(window.confirm("Xác nhận xóa ?")) {
        BookAPI.deleteBook(listid).then((response) =>{
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
      <h2 className = "text-center"> Danh sách người dùng </h2>
       <div className='d-flex align-items-start mt-5'>
       <div className="filter me-3">
       <Select options={options}
       defaultValue={options[0]}
       />
     </div>
       <div className="input-group">
        <div className="form-outline me-2"
        style={{minWidth: "250px"}}
        >
            <input type="search" id="form1" className="form-control" 
            placeholder='Nhập tên để tìm kiếm...'
             onChange={(e)=>{setFilters({...filters,key: e.target.value})}}
             onKeyDown={(e)=>{if(e.keyCode == 13){
                 getListUser()
             }}}
            />
        </div>
        <button type="button" className="btn btn-primary"
        onClick={(e)=>{getListUser()}}
        >
            Tìm kiếm
        </button>
        <button className='btn btn-danger'
          onClick={()=>{deleteUser()}}
          >Xóa</button>
       </div>
       </div>
            <table className="table table-bordered table-striped mt-4">
                <thead>
                    <tr>
                    <th>Check</th>
                    <th> Id </th>
                    <th> Họ tên </th>
                    <th> Chức vụ </th>
                    <th>Ngày sinh</th>
                    <th> CMND </th>
                    <th> Giới tính</th>
                    <th> Địa chỉ </th>
                    <th> Email </th>
                    <th> Số điện thoại </th>
                    <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                {
                       users && users.map(
                            user =>
                            <tr key = {user.id}> 
                               <td>  
                                   <input
                                type="checkbox"
                                className='form-check-input'
                                onChange={e => {
                                let value = e.target.checked;
                                checkDelete(user.id,value)    
                                }}
                                 /></td>
                                <td> {user.id} </td>
                                <td> {user.fullname} </td>
                                <td>{user.roleCode}</td>
                                <td>{user.birth}</td>
                                <td>{user.cmnd}</td>
                                <td>{user.sex ? 'Nam' : 'Nữ'}</td>
                                <td>{user.address}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Link className="btn btn-primary"
                                    style={{width: "max-content"}}
                                    to={`/book/update/${user.id}`} >Chi tiết</Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Pagination pagination={pagination}
            onPageChange={handelPageChange}
            />
        </div>
  )
}
