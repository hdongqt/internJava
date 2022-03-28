import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import { BookAPI } from 'api/BookAPI'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import { typeHistory } from 'utils/typeHistory'
import { LibrarianAPI } from 'api/LibrarianAPI'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export const ListBorrow = () => {
    const [borrows, setBorrows] = useState([])
    const [searchUser, setSearchUser] = useState([])
    const [pagination,setPagination] = useState({
        page: 1,
        limit: 5,
        totalPage : 1
    })
    const [filters,setFilters] = useState({
        page: 1,
        limit: 5,
        type: "ALL",
        username: ""
    })
    const handelPageChange = (newPage) =>{
      setFilters({...filters, page: newPage})
      getListBorrow()
    } 

    useEffect(() => {
            getListBorrow();
    }, [filters])
  const getListBorrow = () => {
    LibrarianAPI.getListBorrow(filters).then((response) => {
     if(response.data.listResult){
     let list = response.data.listResult;
       setBorrows(list.map(item=>{
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
 const s =  borrows.map(item=>{
        if(item.id == id) {
            return {...item,select: value}
        }else{
            return item;
        }
    })
    setBorrows(s)
}

  const deleteBook = () => {
    const listid = [];
    borrows.forEach(item=>{
        if(item.select){
           listid.push(item.id)
        }
    })
   console.log(listid)
    if(window.confirm("Xác nhận xóa ?")) {
        BookAPI.deleteBook(listid).then((response) =>{
            if(response.status == 200){
                alert("Xóa thành công");
                getListBorrow();
            }
           }).catch(error =>{
               console.log(error.response)
               alert("Xóa không thành công !");
           })
    }
 }
 const handelSearch=(value)=>{
    LibrarianAPI.getSearchUser(value).then((response) => {
        if(response.data){
            console.log(response.data)
            setSearchUser(response.data)
       }
   }).catch(error =>{
       console.log(error);
   })
 }
  return (
    <div className = "container">
      <h2 className = "text-center"> Quản lý phiếu mượn </h2>
       <div className="d-flex">
      <Link to = "/book/addnew" className = "btn btn-primary mb-3 me-3" > Thêm mới </Link>
    <div className="div">
    <select className="form-select mb-3" 
     aria-label=".form-select-lg example" 
     onChange={(e)=>{setFilters({...filters,type: e.target.value})}}
     >
      {
         typeHistory.map((item,index)=><option key={index} value={item.code}>{item.name}</option>)
       }
      </select>
    </div>
      </div>
      <div>
       </div>
       <div className='d-flex align-items-start justify-content-between'>
       {/* <div className="input-group"> */}
     
      <div className="d-flex justify-content-between mb-3"
    //   style={{flex: 1}}
      >
     
        <button className='btn btn-danger ml-auto'
          onClick={()=>{deleteBook()}}
          >Xóa</button>
      </div>
  <div className='d-flex'>
     <Select options={options} 
     onKeyDown={(e)=>{handelSearch(e.target.value)}}
     onChange={(e)=>{console.log("change")}}
     />
  </div>
       {/* </div> */}
     
       </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                    <th>Check</th>
                    <th> Id </th>
                    <th> Họ tên </th>
                    <th> Tên đăng nhập </th>
                    <th>Ngày mượn</th>
                    <th>Ngày hẹn trả </th>
                    <th> Tình trạng</th>
                    <th>Ngày trả </th>
                    <th>Chi tiết </th>
                    </tr>
                </thead>
                <tbody>
                {
                       borrows && borrows.map(
                            borrow =>
                            <tr key = {borrow.id}> 
                               <td>  
                                   <input
                                type="checkbox"
                                className='form-check-input'
                                onChange={e => {
                                let value = e.target.checked;
                                checkDelete(borrow.id,value)    
                                }}
                                 /></td>
                                <td> {borrow.id} </td>
                                <td> {borrow.user.fullname} </td>
                                <td>{borrow.user.username}</td>
                                <td>{borrow.borrowDate}</td>
                                <td>{borrow.appointmentDate}</td>
                                <td>{borrow.status}</td>
                                <td>{borrow.returnDate}</td>
                                <td>
                                    <Link className="btn btn-primary"
                                    style={{width: "max-content"}}
                                    to={`/book/update/${borrow.id}`} >Chi tiết</Link>
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
