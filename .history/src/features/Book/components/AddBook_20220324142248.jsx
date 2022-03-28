import React, { useState, useRef,useEffect} from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BookAPI } from 'api/BookAPI'
import { CategoryAPI } from 'api/CategoryAPI';
import {required} from 'utils/handelValidate';

export default function AddBook() {
  const {bookId} = useParams();
  const [author, setAuthor] = useState('')
  const [listCategorySelect, setListCategorySelect] = useState([])
  const [bookname, setBookName] = useState('')
  const [inventory, setInventory] = useState(0)
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [categoryCode, setCategoryCode] = useState('')
  const [file, setFile] = useState()
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
        let book = {author, bookname, inventory,price,total,categoryCode,file}
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
             <h2 className = "text-center">{bookId ? "Update Book" : "Add Book"}</h2>
                 <div className = "card-body">
                 <Form onSubmit={handelAddBook} ref={form}>
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
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Giá(*)</label>
                <Input
                  type="number"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={(e)=>{setPrice(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inventory">Tồn kho</label>
                <Input
                  type="number"
                  className="form-control"
                  name="inventory"
                  value={inventory}
                  onChange={(e)=>{setInventory(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="total">Tổng số lượng(*)</label>
                <Input
                  type="number"
                  className="form-control"
                  name="total"
                  value={total}
                  onChange={(e)=>{setTotal(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoryCode">Thể loại(*)</label>
                <Select name='categoryCode' value={categoryCode} 
                validations={[required]} 
                className="form-control"
                onChange={(e)=>{setCategoryCode(e.target.value)}}
                >
                   {
                     listCategorySelect.map(item=>{
                       return  <option key={item.id} value={item.code}>{item.name}</option>
                     })
                   }
                </Select>
              </div>
              <div className="form-group">
                <label htmlFor="file">Hình ảnh(*)</label>
                <Input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={(e)=>{setFile(e.target.files[0])}}
                />
              </div>
              <br/>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Thêm sách</button>
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
