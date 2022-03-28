import React, { useState, useRef,useEffect} from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BookAPI } from 'api/BookAPI'
import { CategoryAPI } from 'api/CategoryAPI';
import {required,vusername,validEmail,vpassword,vaddress} from 'utils/handelValidate';

export default function AddBook() {
  const {bookId} = useParams();
  const [author, setAuthor] = useState('')
  const [listCategorySelect, setListCategorySelect] = useState([])
  const [bookname, setBookName] = useState('')
  const [inventory, setInventory] = useState(0)
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [categoryCode, setCategoryCode] = useState('')
  const history =  useHistory()
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  const saveOrUpdateBook = (e) => {
    e.preventDefault();
        let book = {author, bookname, inventory,price,total,categoryCode}
        if(bookId){
            book = {id: bookId , ...book}
            BookAPI.updateBook(book).then((response) => {
                history.push('/book')
            }).catch(error => {
                console.log(error)
            })
    
        }else{
            BookAPI.createBook(book).then((response) =>{
               if(response.data){
                    alert("Thêm sách thành công !");
                    history.push('/book');
               }
            }).catch(error => {
                if(error.response.data){
                    const objectt = error.response.data
                    let mess = "";
                    for (let key in objectt) {
                        if (objectt.hasOwnProperty(key)) {
                          mess += `\n ${objectt[key]}`
                        }
                      }
                    alert(mess)
                }
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

    const getListCategory = async () =>{
          const response = await CategoryAPI.getAllCategorys();
          if(response.data){
             setListCategorySelect(response.data.listResult)
        }
    }
    getListCategory()
}, [])

  return (
    <div>
    <br /><br />
    <div className = "container">
         <div className = "row">
             <div className = "card col-md-6 offset-md-3 offset-md-3">
             <h2 className = "text-center">{bookId ? "Update Book" : "Add Book"}</h2>
                 <div className = "card-body">
                 <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
             <div className="form-group">
                <label htmlFor="bookname">Tên sách(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="bookname"
                  value={bookname}
                  onChange={(e)=>{setBookName(e.target.value)}}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Tác giả(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  onChange={(e)=>{setAuthor(e.target.value)}}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Giá(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={(e)=>{setPhone(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cmnd">CMND(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="cmnd"
                  value={cmnd}
                  onChange={(e)=>{setCmnd(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password(*)</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sex">Giới tính(*)</label>
                <Select name='sex' value={sex} 
                validations={[required]} 
                className="form-control"
                onChange={(e)=>{setSex(+e.target.value)}}
                >
                    <option value=''>Giới tính</option>
                    <option value={1}>Nam</option>
                    <option value={0}>Nữ</option>
                </Select>
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Địa chỉ</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                  validations={[required,vaddress]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Ngày sinh(*)</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birth"
                  value={birth}
                  onChange={(e)=>{setBirth(e.target.value)}}
                  validations={[required]}
                />
              </div>
             
              <br/>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Đăng ký</button>
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
