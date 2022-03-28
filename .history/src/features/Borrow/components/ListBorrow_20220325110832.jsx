import React, { useEffect, useState } from 'react'
import { BookAPI } from 'api/BookAPI'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import { typeHistory } from 'utils/typeHistory'
import { Librarian } from 'api/Librarian'
export const ListBorrow = () => {
    const [borrows, setBorrows] = useState([])
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
    }, [])
  const getListBorrow = () => {
    Librarian.getListBorrow(filters).then((response) => {
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
         typeHistory.map(item=><option value={item.code}>{item.name}</option>)
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
  <div className="form-outline me-2"
        style={{minWidth: "250px"}}
        >
            <input type="search" id="form1" className="form-control" 
            placeholder='Nhập tên để tìm kiếm'
             onChange={(e)=>{setFilters({...filters,key: e.target.value})}}
             onKeyDown={(e)=>{if(e.keyCode == 13){
                 getListBorrow()
             }}}
            />
        </div>
        <button type="button" className="btn btn-primary"
        onClick={(e)=>{getListBorrow()}}
        >
            Tìm kiếm
        </button>
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
                            book =>
                            <tr key = {book.id}> 
                               <td>  
                                   <input
                                type="checkbox"
                                className='form-check-input'
                                onChange={e => {
                                let value = e.target.checked;
                                checkDelete(book.id,value)    
                                }}
                                 /></td>
                                <td> {book.id} </td>
                                <td> {book.bookname} </td>
                                <td>{book.author}</td>
                                <td><img 
                                className="img-thumbnail"
                                style={{maxHeight: "120px"}}
                                src={"http://localhost:8081\\" + book.image}></img></td>
                                <td>{book.inventory}</td>
                                <td>{book.createDate}</td>
                                <td>{book.updateDate}</td>
                                <td>
                                    <Link className="btn btn-primary"
                                    style={{width: "max-content"}}
                                    to={`/book/update/${book.id}`} >Chi tiết</Link>
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
