import React, { useState, useRef,useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { ReaderAPI } from "api/ReaderAPI";
import {required,validEmail} from 'utils/handelValidate';
import  Select  from 'react-select';
import { Link, useParams } from 'react-router-dom';
import { UserAPI } from 'api/UserAPI';
const options = [
  { value: 'ROLE_USER', label: 'Bạn đọc' },
  { value: 'ROLE_LIBRARIAN', label: 'Thủ thư' },
  { value: 'ROLE_ADMIN', label: 'Admin' }
]
let defaultInfo = {
  id: "",
  fullname:"",
  username: "",
  email: "",
  phone: "",
  cmnd: "",
  sex: "",
  birth : "",
  address: "",
  roleCode: "",
  isDelete: "",

}

const optionsIsDelete = [
  { value: 0, label: 'Hoạt động' },
  { value: 1, label: 'Xóa' },
]
const optionsSex = [
  { value: 0, label: 'Nữ' },
  { value: 1, label: 'Nam' },
]
const EditUser = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const {id} = useParams();

  const [info,setInfo] = useState(defaultInfo);
 
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");


const getInfo = ()=>{
  UserAPI.getOneUser(id).then((response) => {
    if(response.data){
        setInfo(response.data)
       }
     }).catch(error =>{
       const resMessage =
       (error.response && error.response.data.message) || error.toString();
       setMessage(resMessage);
     })
}
  useEffect(() => {
    
      }, [id])
      

  const handelUpdate = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
     UserAPI.updateUser(info,id).then(response =>{
      if(response.data){
        setSuccessful(true)
        setMessage("Thay đổi thông tin thành công !")
        get
      }
     }).catch(error=>{
          setSuccessful(false)
          const resMessage =
          (error.response && error.response.data.message) || error.toString();
        setMessage(resMessage);
     })
    }
  };
  console.log(info)
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
    <div className="col-md-12">
        <br/>
        <h3 className="text-center">Thông tin</h3>
        <Form onSubmit={handelUpdate} ref={form}>
            <div className="mt-3">
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
              <div className="form-group w-25 me-5">
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
              <div className="form-group w-25">
                <label htmlFor="sex">Giới tính(*)</label>
                <Select options={optionsSex}
                  isSearchable={false}
                  value={optionsSex.find(item=>item.value==info.sex)}
                onChange={(e)=>{setInfo({...info,sex: e.value})}}
                />
              </div>
           </div>
             <div className="d-flex mt-3">
             <div className="form-group w-25 me-5">
                <label htmlFor="username">Tên đăng nhập(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={info.username}
                  disabled
                  validations={[required]}
                />
              </div>
              <div className="form-group w-25 me-5">
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
              <div className="form-group w-25">
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
             </div>
                <div className="d-flex mt-3">
                <div className="form-group w-25 me-5">
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
              <div className="form-group w-25 me-5">
              <label htmlFor="email">Quyền(*)</label>
                <Select options={options}
                    value={options.find(item=>item.value==info.roleCode)}
                  isSearchable={false}
                onChange={(e)=>{setInfo({...info,roleCode: e.value})}}
                />
              </div>
                </div>
            
          <div className="d-flex mt-3">
          <div className="form-group w-25 me-5">
                <label htmlFor="cmnd">Địa chỉ</label>
                <Input
                  type="text"
                  className="form-control"
                  name="cmnd"
                  value={info.address}
                  onChange={(e)=>{setInfo({...info,address:e.target.value})}}
                />
              </div>
              <div className="form-group w-25">
                <label htmlFor="sex">Trạng thái</label>
                <Select options={optionsIsDelete}
                  isSearchable={false}
                  value={optionsIsDelete.find(item=>item.value==info.isDelete)}
                onChange={(e)=>{setInfo({...info,isDelete: e.value})}}
                />
              </div>
          </div>
              <div className="form-group d-flex justify-content-end me-5 mt-5">
              <button className="btn btn-primary btn-block me-3">Cập nhật</button>
                <Link to="/user" className="btn btn-dark">Quay lại</Link>
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