import React, { useEffect, useState } from 'react'
import { BookAPI } from 'api/BookAPI'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
export const ListBook = () => {
    const [books, setBooks] = useState([])
    const [pagination,setPagination] = useState({
        page: 1,
        limit: 5,
        totalPage : 1
    })
    const [filters,setFilters] = useState({
        limit: 5,
        page: 1
    })
    const handelPageChange = (newPage) =>{
      setFilters({...filters, page: newPage})
    } 

    useEffect(() => {
        if(filters !=null){
            getListBook();
        }
    }, [filters])
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
  const deleteBook = (bookId) => {
    BookAPI.deleteBook(bookId).then((response) =>{
     getListBook();
    }).catch(error =>{
        console.log(error);
    })
 }
  return (
    <div className = "container">
      <h2 className = "text-center"> List Books </h2>
       <div className="d-flex justify-content-between">
      <div>
      <Link to = "/book/addnew" className = "btn btn-info mb-3 me-3" > Thêm sách mới </Link>
       <Link to = "/book/addold" className = "btn btn-info mb-3" > Thêm sách đã có </Link>
      </div>
      <div>
          <button className='btn btn-danger'>Xóa sách</button>
      </div>
       </div>
       <div className='d-flex justify-content-end align-items-start'>
       <div className="filter">
     <select className="form-select mb-3" 
     aria-label=".form-select-lg example" 
    //  onChange={(e)=>{setFilters({...filters,type: e.target.value})}}
     >
       <option value={'bookname'}>Tên sách</option>
       <option value={'category'}>Thể loại</option>
      </select>
     </div>
       <div class="input-group">
        <div class="form-outline">
            <input type="search" id="form1" class="form-control" />
        </div>
        <button type="button" class="btn btn-primary">
            Tìm kiếm
        </button>
       </div>
       </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                    <th>Check</th>
                    <th> Id </th>
                    <th> Book Name </th>
                    <th> Author </th>
                    <th>Image</th>
                    <th> Inventory </th>
                    <th> Total </th>
                    <th> Create Date </th>
                    <th> Update Date </th>
                    <th> Category Code </th>
                    <th>Update</th>
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
                                setBooks(
                                   books.map(b => {
                                    b.select = value;
                                    return b;
                                    })
                                );
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
                                    <Link className="btn btn-primary" to={`/book/update/${book.id}`} >Update</Link>
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
