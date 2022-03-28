import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CategoryAPI } from 'api/CategoryAPI';
import { useRef } from 'react';
import { CheckButton } from 'react-validation/build/button';
import {required,vnumber} from 'utils/handelValidate';

export default function AddCategory() {
  const history =  useHistory()
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [info,setInfo] = useState()
  const {id} = useParams();

  const handelAddBook = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
    //     let book = {author, bookname, inventory,price,total,categoryCode}
    //     if(file){
    //       book = {...book,file: file}
    //     }
    //   if(bookId){
    //     book = {id: bookId , ...book}
    //     BookAPI.updateBook(book).then((response) => {
    //       if(response.data){
    //         alert("Cập nhật thành công")
    //         history.push('/book')
    //       }
    //     }).catch(error => {
    //       console.log(error.response)
    //       const resMessage =
    //       (error.response && error.response.data.message) || error.toString();
    //        setMessage(resMessage);
    //     })
    // }else{
    //     BookAPI.createBook(book).then((response) =>{
    //        if(response.data){
    //             alert("Thêm sách thành công !");
    //             history.push('/book');
    //        }
    //     }).catch(error => {
    //       const resMessage =
    //       (error.response && error.response.data.message) || error.toString();
    //        setMessage(resMessage);
    //     })
    // }
      }
}

  return (
    <div>
    <br /><br />
    <div className = "container">
         <div className = "row">
             <div className = "card col-md-6 offset-md-3 offset-md-3">
             <h2 className = "text-center">{id ? "Cập nhật sách" : "Thêm sách"}</h2>
                 <div className = "card-body">
         <Form onSubmit={handelAddBook} ref={form}>
          {!successful && (
            <div>
             <div className="form-group">
                <label htmlFor="bookname">Tên thể loại(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="bookname"
                  value={info.name}
                //   onChange={(e)=>{setBookName(e.target.value)}}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Code(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="author"
                  value={info.code}
                //   onChange={(e)=>{setAuthor(e.target.value)}}
                  validations={[required]}
                />
              </div>

              <br/>
              <div className="form-group d-flex justify-content-end">
                <button className="btn btn-primary btn-block me-3">{bookId ? 'Cập nhật' :'Thêm sách'}</button>
                {
                 bookId &&   <div className="d-flex justify-content-end">
                          <span className="btn btn-danger btn-block me-3"
                        //   onClick={()=>{deleteOneBook(bookId)}}
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
