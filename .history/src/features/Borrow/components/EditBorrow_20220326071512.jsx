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
import { dateNow } from "utils/getDateNow";
import { LibrarianAPI } from "api/LibrarianAPI";
 const defaultBorrow = {
   idUser: "",
   appointmentDate: dateNow,
   borrowDate: dateNow,
   idBooks: []
 } 

export default function EditBorrow() {
  const [searchUser, setSearchUser] = useState([])
  const [searchBook, setSearchBook] = useState([])
  const [listBookSelect,setListBookSelect] = useState([])
  const [borrow,setBorrow] = useState(defaultBorrow);
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  const handelAddBook = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
     
}
  }

  const deleteOneBook= (id)=>{
    // if(window.confirm("Xác nhận xóa ?")) {
    //   BookAPI.deleteBook([id]).then((response) =>{
    //       if(response.status == 200){
    //           alert("Xóa thành công");
    //           history.push("/book")
    //       }
    //      }).catch(error =>{
    //          console.log(error.response)
    //          alert("Xóa không thành công !");
    //      })
    //     }
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


  return (
    <div>
    <br /><br />
    <div className = "container">
         <div className = "row">
             <div className = "card col-md-12">
                 <br/>
             <h2 className = "text-center">Cập nhật phiếu mượn</h2>
                 <div className = "card-body">
         <Form onSubmit={handelAddBook} ref={form}>
          {!successful && (
              <div>
                <div className="d-flex w-100">
                <div className="form-group w-25">
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
                // onKeyDown={(e)=>{handelSearchBook(e.target.value)}}
                onChange={(e)=>{
                  // setListBookSelect([...listBookSelect,e])
                  // setBorrow({...borrow,idBooks : e ? [...borrow.idBooks,e.value] : [...borrow.idBooks]})
                }}
                 name="book"
                 isClearable={true}
                />
              </div>
              <div className="form-group mb-3 mt-3">
                <label htmlFor="username">Danh sách(*)</label>
                <ul class="list-group scroll">
              {/* {
                listBookSelect && listBookSelect.map(item=>{
                  return  <li class="list-group-item d-flex 
                  align-items-center
                 justify-content-between"
                 >{item.label}<i class="fa-solid fa-x text-danger"
                 onClick={(e)=>{setListBookSelect(listBookSelect.filter(b=>b.value !== item.value))}}
                 ></i></li>
                })
              } */}
              </ul>
              </div>
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
                  disabled
                //   value={birth}
                //   onChange={(e)=>{setBirth(e.target.value)}}
                  validations={[required]}
                />
              </div>
             
              <br/>
              <div className="form-group d-flex justify-content-end">
                <button className="btn btn-primary btn-block me-3">Cập nhật</button>
               <div className="d-flex justify-content-end">
                          <span className="btn btn-danger btn-block me-3"
                          // onClick={()=>{deleteOneBook(bookId)}}
                          >Xóa sách</span>
                          </div>
              
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
