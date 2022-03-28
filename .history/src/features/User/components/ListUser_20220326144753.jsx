import React, { useEffect, useState } from 'react'
import { BookAPI } from 'api/BookAPI'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import Select  from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
export const ListUser = () => {
    const [books, setBooks] = useState([])
    const [pagination,setPagination] = useState({
        page: 1,
        limit: 5,
        totalPage : 1
    })
    const [filters,setFilters] = useState({
        page: 1,
        limit: 5,
        type: "BOOKNAME",
        key: ""
    })
    const handelPageChange = (newPage) =>{
      setFilters({...filters, page: newPage})
      getListBook()
    } 

    useEffect(() => {
            getListBook();
    }, [])
  const getListBook = () => {
    BookAPI.getAllBooks(filters).then((response) => {
     if(response.data.listResult){
     let list = response.data.listResult;
       setBooks(list.map(item=>{
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
 const s =  books.map(item=>{
        if(item.id == id) {
            return {...item,select: value}
        }else{
            return item;
        }
    })
    setBooks(s)
}

  const deleteBook = () => {
    const listid = [];
    books.forEach(item=>{
        if(item.select){
           listid.push(item.id)
        }
    })
   console.log(listid)
    if(window.confirm("Xác nhận xóa ?")) {
        BookAPI.deleteBook(listid).then((response) =>{
            if(response.status == 200){
                alert("Xóa thành công");
                getListBook();
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
       <div className="d-flex justify-content-between">
      <div>
        
      </div>
       </div>
       <div className='d-flex align-items-start'>
       <div className="filter me-3">
       <Select options={options} />
     </div>
       <div className="input-group">
        <div className="form-outline me-2"
        style={{minWidth: "250px"}}
        >
            <input type="search" id="form1" className="form-control" 
            placeholder='Nhập tên để tìm kiếm...'
             onChange={(e)=>{setFilters({...filters,key: e.target.value})}}
             onKeyDown={(e)=>{if(e.keyCode == 13){
                 getListBook()
             }}}
            />
        </div>
        <button type="button" className="btn btn-primary"
        onClick={(e)=>{getListBook()}}
        >
            Tìm kiếm
        </button>
        <button className='btn btn-danger'
          onClick={()=>{deleteBook()}}
          >Xóa</button>
       </div>
       </div>
            <table className="table table-bordered table-striped">
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
                       books && books.map(
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
                                <td>{book.total}</td>
                                <td>{book.createDate}</td>
                                <td>{book.updateDate}</td>
                                <td>{book.categoryCode}</td>
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
