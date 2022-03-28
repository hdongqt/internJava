import React, { useState, useRef,useEffect} from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BookAPI } from 'api/BookAPI'
import { CategoryAPI } from 'api/CategoryAPI';
import {required,vnumber} from 'utils/handelValidate';
import Select  from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
export default function AddBorrow() {
  const {bookId} = useParams();
  const [searchUser, setSearchUser] = useState([])
  const history =  useHistory()
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  const handelAddBook = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        let book = {author, bookname, inventory,price,total,categoryCode}
        if(file){
          book = {...book,file: file}
        }
      if(bookId){
        book = {id: bookId , ...book}
        BookAPI.updateBook(book).then((response) => {
          if(response.data){
            alert("Cập nhật thành công")
            history.push('/book')
          }
        }).catch(error => {
          console.log(error.response)
          const resMessage =
          (error.response && error.response.data.message) || error.toString();
           setMessage(resMessage);
        })
    }else{
        BookAPI.createBook(book).then((response) =>{
           if(response.data){
                alert("Thêm sách thành công !");
                history.push('/book');
           }
        }).catch(error => {
          const resMessage =
          (error.response && error.response.data.message) || error.toString();
           setMessage(resMessage);
        })
    }
      }
}

  const deleteOneBook= (id)=>{
    if(window.confirm("Xác nhận xóa ?")) {
      BookAPI.deleteBook([id]).then((response) =>{
          if(response.status == 200){
              alert("Xóa thành công");
              history.push("/book")
          }
         }).catch(error =>{
             console.log(error.response)
             alert("Xóa không thành công !");
         })
        }
  }
useEffect(() => {

    const getInfoBook = async () =>{
          const response = await BookAPI.getBookById(bookId);
          if(response.data){
               const result = response.data;
               setAuthor(result.author)
               setBookName(result.bookname)
               setCategoryCode(result.categoryCode)
               setInventory(result.inventory)
               setPrice(result.price)
               setTotal(result.total)
              }
    }
    if(bookId){
        getInfoBook();
    }
}, [bookId])

useEffect(() => {

    const getListCategory = () =>{
     CategoryAPI.getAllCategorys().then(response=>{
      if(response.data){
        setListCategorySelect(response.data)
      }
     }).catch(error=>{
      console.log(error)
     })
    }
    getListCategory()
    console.log(listCategorySelect)
}, [])

  return (
    <div>
    <br /><br />
    <div className = "container">
         <div className = "row">
             <div className = "card col-md-6 offset-md-3 offset-md-3">
                 <br/>
             <h2 className = "text-center">Thêm phiếu mượn</h2>
                 <div className = "card-body">
         <Form onSubmit={handelAddBook} ref={form}>
          {!successful && (
            <div>
             <div className="form-group">
                <label htmlFor="bookname">Bạn đọc(*)</label>
                <Select options={options} 
                 isClearable={true}
                 />
              </div>

              <div className="form-group">
                <label htmlFor="username">Chọn sách(*)</label>
                <Select options={options} 
                 isClearable={true}
                />
              </div>
              <div className="form-group mb-3 mt-3">
                <label htmlFor="username">Danh sách(*)</label>
                <ul class="list-group scroll">
                <li class="list-group-item d-flex 
                 align-items-center
                justify-content-between">Dapibus ac facilisis in <i class="fa-solid fa-x"></i></li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Ngày mượn (*)</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birth"
                //   value={birth}
                //   onChange={(e)=>{setBirth(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Ngày hẹn trả (*)</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birth"
                //   value={birth}
                //   onChange={(e)=>{setBirth(e.target.value)}}
                  validations={[required]}
                />
              </div>
             
              <br/>
              <div className="form-group d-flex justify-content-end">
                <button className="btn btn-primary btn-block me-3">{bookId ? 'Cập nhật' :'Thêm sách'}</button>
                {
                 bookId &&   <div className="d-flex justify-content-end">
                          <span className="btn btn-danger btn-block me-3"
                          onClick={()=>{deleteOneBook(bookId)}}
                          >Xóa sách</span>
                          </div>
                  }
                <Link to="/book" className="btn btn-dark">Quay lại</Link>
              </div>
            </div>
          )}
      <br/>
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
 

                 </div>
             </div>
         </div>

    </div>

 </div>
  )
}
