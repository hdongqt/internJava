import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CategoryAPI } from 'api/CategoryAPI';
import { useRef } from 'react';
import { CheckButton } from 'react-validation/build/button';
import {required,vnumber} from 'utils/handelValidate';
import { Form } from 'react-validation/build/form';
import { Input } from 'react-validation/build/input';

const defaultInfo = {
    id: "",
    name: "",
    code: "",
    description: ""
}

export default function AddCategory() {
  const history =  useHistory()
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [info,setInfo] = useState(defaultInfo)
  const {id} = useParams();

  const handelSubmitForm = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
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
         <Form onSubmit={handelSubmitForm} ref={form}>
          {!successful && (
           
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
