import React, { useState, useRef,useEffect} from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {required} from 'utils/handelValidate';
import Select  from 'react-select';
import { LibrarianAPI } from "api/LibrarianAPI";
import { BookAPI } from 'api/BookAPI';

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
  const [searchBook, setSearchBook] = useState([])
  const [listBookSelect,setListBookSelect] = useState([])
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
      const listIdBook = listBookSelect.map(item=>item.value)
       const create = {...borrow,idBooks : listIdBook }
  
        LibrarianAPI.createBorrow(create).then((response) =>{
           if(response.data){
               setMessage("Thành công !")
               setSuccessful(true)
                history.push('/book');
           }
        }).catch(error => {
          const resMessage =
          (error.response && error.response.data.message) || error.toString();
           setMessage(resMessage);
           setSuccessful(false)

        })
    }
      }


  


const handelSearchReader=(value)=>{
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

const handelSearchBook=(value)=>{
  BookAPI.searchBook(value).then((response) => {
      if(response.data){
          const list = response.data.map(item=>{
              return { value: item.id,
                isDisabled: item.inventory > 0 ? false : true,
                label: item.bookname + " - " + item.author + `${item.inventory > 0 ? '' : ' - Hết sách'}`}
          })
          console.log(list)
          setSearchBook(list)
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
                 value={searchUser.find(item=>item.value === borrow.idUser)}
                 onKeyDown={(e)=>{handelSearchReader(e.target.value)}}
                 onChange={(e)=>{setBorrow({...borrow,idUser : e ? e.value : ""})}}
                 name="reader"
                 isClearable={true}
                 />
              </div>

              <div className="form-group">
                <label htmlFor="username">Chọn sách(*)</label>
                <Select options={searchBook} 
                onKeyDown={(e)=>{handelSearchBook(e.target.value)}}
                onChange={(e)=>{
                  setListBookSelect([...listBookSelect,e])
                  setBorrow({...borrow,idBooks : e ? [...borrow.idBooks,e.value] : [...borrow.idBooks]})
                }}
                 name="book"
                 isClearable={true}
                />
              </div>
              <div className="form-group mb-3 mt-3">
                <label htmlFor="username">Danh sách(*)</label>
                <ul class="list-group scroll">
              {
                listBookSelect && listBookSelect.map(item=>{
                  return  <li class="list-group-item d-flex 
                  align-items-center
                 justify-content-between"
                 >{item.label}<i class="fa-solid fa-x text-danger"
                 onClick={(e)=>{setListBookSelect(listBookSelect.filter(b=>b.value !== item.value))}}
                 ></i></li>
                })
              }
              </ul>
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Ngày mượn (*)</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birth"
                  value={borrow.borrowDate}
                  onChange={(e)=>{setBorrow({...borrow,borrowDate: e.target.value})}}
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
                <Link to="/borrow" className="btn btn-dark">Quay lại</Link>
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
