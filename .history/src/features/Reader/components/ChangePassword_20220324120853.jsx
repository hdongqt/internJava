import React, { useEffect, useState,useRef } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from 'react-router-dom';
import {required,vusername,validEmail,vpassword,vaddress,lt} from 'utils/handelValidate';
import { ReaderAPI } from 'api/ReaderAPI';

export const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const form = useRef();
    const checkBtn = useRef();



    const handleLogin = (e) => {
        e.preventDefault();
    
        setMessage("");
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          console.log("sđs")
          ReaderAPI.changePassword({oldPassword,newPassword}).then(response =>{
            if(response.data){
              setSuccessful(true)
              setMessage("Thay đổi mật khẩu thành công !")
            }
           }).catch(error=>{
                setSuccessful(false)
                const resMessage =
                (error.response && error.response.data.message) || error.toString();
              setMessage(resMessage);
           })
          }
      };
  return (
    <div className = "container">
     <div className="row">
         <div className="col-3"></div>
         <div className="col-6">
         <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="passwordO">Mật khẩu cũ:</label>
            <Input
              type="password"
              className="form-control"
              name="oldPassword"
              value={oldPassword}
              onChange={(e)=>{setOldPassword(e.target.value)}}
              validations={[required,vpassword]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu mới</label>
            <Input
              type="password"
              className="form-control"
              name="newPassword"
              value={newPassword}
              onChange={(e)=>{setNewPassword(e.target.value)}}
              validations={[required,vpassword]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordR">Nhập lại mật khẩu mới</label>
            <Input
              type="password"
              className="form-control"
              name="passwordR"
              value={repeatPassword}
              onChange={(e)=>{setRepeatPassword(e.target.value)}}
              validations={[required,vpassword,lt]}
            />
          </div>
          <br/>

          <div className="form-group d-flex justify-content-end">
            <button className="btn btn-primary btn-block me-2">Xác nhận
            </button>
            <Link to="/reader/history"className="btn btn-dark">Quay lại</Link>
          </div>
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
         <div className="col-3"></div>
     </div>
   </div>
  )
}
