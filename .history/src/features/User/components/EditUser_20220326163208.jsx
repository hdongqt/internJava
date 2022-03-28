import React, { useState, useRef,useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { ReaderAPI } from "api/ReaderAPI";
import {required,validEmail} from 'utils/handelValidate';

const defaultInfo = {
  "fullname ":"",
  "username": "",
  "email": "",
  "password": "",
  "phone": "",
  "cmnd": "",
  "sex": 0,
  "birth" : "",
  "address": "",
}



const EditUser = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [info,setInfo] = useState(defaultInfo);
 
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");



  useEffect(() => {
      ReaderAPI.getInfo().then((response) => {
       if(response.data){
           const {id,...infoGet} = response.data;
           setInfo(infoGet)
       }
      }).catch(error =>{
        const resMessage =
                (error.response && error.response.data.message) || error.toString();
              setMessage(resMessage);
      })
  }, [])



  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
     ReaderAPI.updateInfo(info).then(response =>{
      if(response.data){
        setSuccessful(true)
        setMessage("Thay đổi thông tin thành công !")
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
    <div className="container">
      <div className="row justify-content-center align-items-center">
    <div className="col-md-12">
        <br/>
        <h3>Thông tin cá nhân</h3>
        <Form onSubmit={handleRegister} ref={form}>
            <div>
           <div className="d-flex">
           <div className="form-group w-25 me-5">
                <label htmlFor="fullname">Họ tên(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={info.fullname}
                  onChange={(e)=>{setInfo({...info,fullname:e.target.value})}}
                  validations={[required]}
                />
              </div>
              <div className="form-group w-25">
                <label htmlFor="cmnd">CMND(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="cmnd"
                  value={info.cmnd}
                  onChange={(e)=>{setInfo({...info,cmnd:e.target.value})}}
                  validations={[required]}
                />
              </div>
           </div>
             <div className="d-flex">
             <div className="form-group w-25">
                <label htmlFor="username">Tên đăng nhập(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={info.username}
                  onChange={(e)=>{setInfo({...info,cmnd:e.target.value})}}
                  validations={[required]}
                />
              </div>
             <div className="form-group w-25 me-5">
                <label htmlFor="fullname">Họ tên(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={info.fullname}
                  onChange={(e)=>{setInfo({...info,fullname:e.target.value})}}
                  validations={[required]}
                />
              </div>
             </div>

              <div className="form-group">
                <label htmlFor="email">Email(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={info.email}
                  onChange={(e)=>{setInfo({...info,email:e.target.value})}}
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
                  onChange={(e)=>{setInfo({...info,phone:e.target.value})}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cmnd">Địa chỉ</label>
                <Input
                  type="text"
                  className="form-control"
                  name="cmnd"
                  value={info.address}
                  onChange={(e)=>{setInfo({...info,address:e.target.value})}}
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
                  onChange={(e)=>{setInfo({...info,birth:e.target.value})}}
                  validations={[required]}
                />
              </div>
           
              <br/>
              <div className="form-group">
               <div style={{display: "flex",justifyContent: "flex-end"}}>
               <button className="btn btn-primary btn-block">Cập nhật</button>
               </div>
              </div>
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
    </div>
    </div>
  );
};

export default EditUser;