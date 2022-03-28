import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import { AuthAPI } from 'api/AuthAPI';

import {required,vusername,validEmail,vpassword,vaddress,vRepeat} from 'utils/handelValidate';
import { Link } from "react-router-dom";


const defaultRegister = {
  fullname : "",
  username : "",
  email : "",
  password : "",
  phone : "",
  cmnd : "",
  sex : "",
  birth : "",
  address : ""
}


const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [register, setRegister] = useState(defaultRegister);

  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
    const info = {username,email,password,phone,cmnd,address,fullname,sex,birth};
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
        <h3>Đăng ký <i class="fa-solid fa-user-plus"></i></h3>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
             <div className="form-group">
                <label htmlFor="fullname">Họ tên(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={register.fullname}
                  onChange={(e)=>{setRegister({...register,fullname: e.target.value})}}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={register.username}
                  onChange={(e)=>{setRegister({...register,username: e.target.value})}}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={register.email}
                  onChange={(e)=>{setRegister({...register,email: e.target.value})}}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <Input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={register.phone}
                  onChange={(e)=>{setRegister({...register,phone: e.target.value})}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cmnd">CMND(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="cmnd"
                  value={register.cmnd}
                  onChange={(e)=>{setRegister({...register,cmnd: e.target.value})}}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu(*)</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={register.password}
                  onChange={(e)=>{setRegister({...register,password: e.target.value})}}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
              <label htmlFor="passwordR">Lặp lại(*)</label>
              <Input
                type="password"
                className="form-control"
                name="passwordR"
                value={repeatPassword}
                onChange={(e)=>{setRepeatPassword(e.target.value)}}
                validations={[required,vRepeat]}
              />
            </div>
              <div className="form-group">
                <label htmlFor="sex">Giới tính(*)</label>
                <Select name='sex' value={register.sex} 
                validations={[required]} 
                className="form-control"
                onChange={(e)=>{setRegister({...register,sex: +e.target.value})}}
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
                  value={register.address}
                  onChange={(e)=>{setRegister({...register,username: e.target.value})}}
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

              <div className="form-group d-flex justify-content-end">
                <button className="btn btn-primary btn-block me-2">Đăng ký</button>
                <Link to="/login" className="btn btn-success btn-block">Đăng nhập</Link>
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
        {
          successful && <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
        }
      </div>
    </div>
    </div>
  );
};

export default Register;