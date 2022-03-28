import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {required,vnumber} from 'utils/handelValidate';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { CategoryAPI } from 'api/CategoryAPI';
const defaultInfo = {
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
      if(id){
        CategoryAPI.updateCategory({...info,id: id}).then((response) => {
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
        CategoryAPI.createCategory(info).then((response) =>{
           if(response.data){
                alert("Thêm thể loại thành công !");
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

useEffect(() => {
  if(id){
    CategoryAPI.getCategoryById(id).then((response) => {
        if(response.data){
            console.log(response.data)
            const {id,...infoGet} = response.data;
            setInfo(infoGet)
        }
       }).catch(error =>{
         const resMessage =
                 (error.response && error.response.data.message) || error.toString();
               setMessage(resMessage);
       })
  }
}, [id])

const deleteOneCategory= (id)=>{
    if(window.confirm("Xác nhận xóa ?")) {
      CategoryAPI.deleteCategory([id]).then((response) =>{
          if(response.status == 200){
              alert("Xóa thành công");
              history.push("/category")
          }
         }).catch(error =>{
            const resMessage =
            (error.response && error.response.data.message) || error.toString();
            setMessage(resMessage);
         })
        }
  }


  return (
    <div>
    <br /><br />
    <div className = "container">
         <div className = "row">
             <div className = "card col-md-6 offset-md-3 offset-md-3">
             <h2 className = "text-center">{id ? "Cập nhật sách" : "Thêm thể loại"}</h2>
                 <div className = "card-body">
         <Form onSubmit={handelSubmitForm} ref={form}>
          {!successful && (
            <div>
             <div className="form-group">
                <label htmlFor="bookname">Tên thể loại(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
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
                  name="code"
                  value={info.code}
                //   onChange={(e)=>{setAuthor(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Mô tả</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={info.description}
                //   onChange={(e)=>{setAuthor(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <br/>
              <div className="form-group d-flex justify-content-end">
                <button className="btn btn-primary btn-block me-3">{id ? 'Cập nhật' :'Thêm thể loại'}</button>
                {
                 id &&   <div className="d-flex justify-content-end">
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
