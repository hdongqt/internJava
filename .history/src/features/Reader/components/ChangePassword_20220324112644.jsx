import React, { useEffect, useState,useRef } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from 'react-router-dom';
import {required,vusername,validEmail,vpassword,vaddress,validCustom} from 'utils/handelValidate';

export const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const form = useRef();
    const checkBtn = useRef();



    const handleLogin = (e) => {
        e.preventDefault();
    
        setMessage("");
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
       
              setLoading(false);
            //   setMessage(resMessage);
        } else {
          setLoading(false);
        }
      };
  return (
    <div className = "container">
     <div className="row">
         <div className="col-3"></div>
         <div className="col-6">
         <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="passwordO">Mật khẩu củ:</label>
            <Input
              type="password"
              className="form-control"
              name="passwordo"
              value={oldPassword}
              onChange={(e)=>{setOldPassword(e.target.value)}}
              onClick={()=>setLoading(false)}
              validations={[required,validCustom]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu mới</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              onClick={()=>setLoading(false)}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordR">Nhập lại mật khẩu mới</label>
            <Input
              type="passwordR"
              className="form-control"
              name="passwordR"
              value={repeatPassword}
              onChange={(e)=>{setRepeatPassword(e.target.value)}}
              onClick={()=>setLoading(false)}
              validations={[required]}
            />
          </div>
          <br/>

          <div className="form-group d-flex justify-content-end">
            <button className="btn btn-primary btn-block me-2" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
            <Link to="/reader/history"className="btn btn-info">Quay lại</Link>
            <a href="/reader/history"className="btn btn-info">Quay lại</a>
          </div>
          <br/>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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
