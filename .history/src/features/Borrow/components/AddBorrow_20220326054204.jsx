import React, { useState, useRef,useEffect} from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {required} from 'utils/handelValidate';
import Select  from 'react-select';
import { LibrarianAPI } from "api/LibrarianAPI";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
 const defaultBorrow = {
   idUser: "",
   appointmentDate: "",
   borrowDate: "",
   idBooks: []
 } 


export default function AddBorrow() {
  const {bookId} = useParams();
  const [searchUser, setSearchUser] = useState([])
  const [borrow,setBorrow] = useState(defaultBorrow);
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
        // let book = {author, bookname, inventory,price,total,categoryCode}
  
        // BookAPI.createBook(book).then((response) =>{
        //    if(response.data){
        //         alert("Thêm sách thành công !");
        //         history.push('/book');
        //    }
        // }).catch(error => {
        //   const resMessage =
        //   (error.response && error.response.data.message) || error.toString();
        //    setMessage(resMessage);
        // })
    }
      }


  


const handelSearch=(value)=>{
  LibrarianAPI.getSearchUser(value).then((response) => {
      if(response.data){
          const list = response.data.map(item=>{
              return { value: item.id, label: item.fullname + " - " + item.username}
          })
          console.log(list)
          setSearchUser(list)
     }
 }).catch(error =>{
     console.log(error);
 })
}
console.log(borrow)
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
                <Select options={searchUser} 
                 value={borrow.idUser}
                 onKeyDown={(e)=>{handelSearch(e.target.value)}}
                 onChange={(e)=>{setBorrow({...borrow,idUser : e ? e.value : ""})}}
                 name="reader"
                 isClearable={true}
                 />
              </div>

              <div className="form-group">
                <label htmlFor="username">Chọn sách(*)</label>
                <Select options={options} 
                 name="book"
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
                  value={borrow.appointmentDate}
                  onChange={(e)=>{setBorrow({...borrow,appointmentDate: e.target.value})}}
                  validations={[required]}
                />
              </div>
             
              <br/>
              <div className="form-group d-flex justify-content-end">
                <button className="btn btn-primary btn-block me-3">Thêm sách</button>
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
