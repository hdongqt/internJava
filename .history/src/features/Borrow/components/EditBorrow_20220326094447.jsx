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
   appointmentDate: "",
   borrowDate: "",
   returnDate: "",
   fine: 0,
   note: "",
   idBooks: []
 } 
 const defaultUser = {
  fullname: "",
  username: ""
} 

export default function EditBorrow() {
  const {id} = useParams();
  const [searchBook, setSearchBook] = useState([])
  const [listBookSelect,setListBookSelect] = useState([])
  const [user,setUser] = useState(defaultUser);
  const [borrow,setBorrow] = useState(defaultBorrow);
  const [updateInfo,setUpdateInfo] = useState({
    createDate: "",
    updateDate: "",
    createBy: "",
    updateBy: "",
  })


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


  useEffect(() => {

    const getInfoBorrow = () =>{
       LibrarianAPI.getOneBorrow(id).then(response=>{
         if(response.data){
            const data= response.data;
            const b = {
              idUser: data.user.id,
              appointmentDate: data.appointmentDate,
              borrowDate: data.borrowDate,
              returnDate: data.returnDate,
              fine: data.fine,
              note: data.note,
              idBooks: data.listbooks.map(item=>item.id)
            }
            setUser({
             fullname: data.user.fullname, username: data.user.username
            })
            const {createDate ,updateDate,createBy, updateBy} = data;
            setUpdateInfo({
              createDate,updateDate,createBy,updateBy
            })
            setListBookSelect(data.listbooks.map(item=>{
              return {value: item.id, label: item.bookname + " - " + item.author }
            }))
            setBorrow(b)
          }
       }).catch(error=>{
        console.log(error.data)
       })
    }
    if(id){
      getInfoBorrow();
  }
}, [id])
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
                <div className="form-group w-25 me-4">
                  <label htmlFor="bookname">Bạn đọc</label>
                  <Input
                  type="text"
                  className="form-control"
                  name="birth"
                  value={user.fullname +" - " + user.username}
                  disabled
                  validations={[required]}
                />
                </div>

              <div className="form-group w-25 me-4">
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
              <div className="form-group w-50 mb-3 mt-3">
             
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
                </div>
           

            <div className="d-flex w-100">
            <div className="form-group me-4">
                <label htmlFor="fullname">Ngày mượn (*)</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birth"
                  value={borrow.borrowDate}
                //   onChange={(e)=>{setBirth(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group me-4">
                <label htmlFor="fullname">Ngày hẹn trả (*)</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birth"
                  value={borrow.appointmentDate}
                //   onChange={(e)=>{setBirth(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Ngày trả (*)</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birth"
                  value={borrow.returnDate}
                //   onChange={(e)=>{setBirth(e.target.value)}}
                  validations={[required]}
                />
              </div>
            </div>
          <div className="d-flex w-100 mt-3">
          <div className="form-group me-2">
                <label htmlFor="fine">Phạt(*)</label>
                <Input
                  type="number"
                  className="form-control"
                  name="fine"
                  value={borrow.fine}
                  // onChange={(e)=>{setTotal(e.target.value)}}
                  validations={[required,vnumber]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fine">Ghi chú(*)</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" cols="50"
                  value={borrow.note}
                ></textarea>
              </div>
          </div>
          <div className="d-flex mt-4">
          <span className="me-2">
              Người cho mượn : {updateInfo.createBy}
          </span>
          <span className="me-2">
              Ngày tạo : {updateInfo.createDate}
          </span>
          <span className="me-2">
              Cập nhật bởi : {updateInfo.updateBy}
          </span>
          <span className="me-2">
            Ngày cập nhật : {updateInfo.updateDate}
          </span>
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
