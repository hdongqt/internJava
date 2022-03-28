import React, { useState, useRef,useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { AuthAPI } from 'api/AuthAPI';
import { ReaderAPI } from "api/ReaderAPI";

const defaultInfo = {
  "fullname ":"",
  "username": "",
  "email": "",
  "password": "",
  "phone": "",
  "cmnd": "",
  "sex": "",
  "birth" : "",
  "address": "",
}


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
       Trường bắt buộc nhập dữ liệu !
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email không hợp lệ.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
       Username có độ dài từ 3 đến 20 kí tự.
      </div>
    );
  }
};
const vaddress = (value) => {
    if (value.length < 3 || value.length > 150) {
      return (
        <div className="alert alert-danger" role="alert">
         Địa chỉ có độ dài từ 3 đến 150 kí tự.
        </div>
      );
    }
  };


const InfoUser = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [info,setInfo] = useState(defaultInfo);
 
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");



  useEffect(() => {
      ReaderAPI.getInfo().then((response) => {
       if(response.data){
           console.log(response.data)
       }
      }).catch(error =>{
          console.log(error);
      })
  }, [])



  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
    // const info = {username,email,phone,cmnd,address,fullname,sex,birth};
    console.log(info)
      AuthAPI.register(info).then(
        (response) => {
          console.log(response.data)
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          console.log(error.response)
          const resMessage =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
    <div className="col-md-6">
        <br/>
        <h3>Thông tin cá nhân</h3>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
             <div className="form-group">
                <label htmlFor="fullname">Họ tên(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={info.fullname}
                  onChange={(e)=>{setFullname(e.target.value)}}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">CMND(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={info.username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={info.email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <Input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={info.phone}
                  onChange={(e)=>{setPhone(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cmnd">Địa chỉ</label>
                <Input
                  type="text"
                  className="form-control"
                  name="cmnd"
                  value={info.cmnd}
                  onChange={(e)=>{setCmnd(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Ngày sinh(*)</label>
                <Input
                  type="date"
                  className="form-control"
                  name="birth"
                  value={info.birth}
                  onChange={(e)=>{setBirth(e.target.value)}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sex">Giới tính(*)</label>
                <Select name='sex' value={info.sex} 
                validations={[required]} 
                className="form-control"
                onChange={(e)=>{setSex(+e.target.value)}}
                >
                    <option value=''>Giới tính</option>
                    <option value={1}>Nam</option>
                    <option value={0}>Nữ</option>
                </Select>
              </div>
            
             
              <br/>

              <div className="form-group">
               <div style={{display: "flex",justifyContent: "flex-end"}}>
               <button className="btn btn-primary btn-block">Cập nhật</button>
               </div>
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
  );
};

export default InfoUser;