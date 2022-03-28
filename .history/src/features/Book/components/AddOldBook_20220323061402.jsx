import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useHistory, Link } from 'react-router-dom';
import  Select  from 'react-validation/build/select';
import { toContainHTML } from "@testing-library/jest-dom/dist/matchers";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const AddOldBook = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [book, setBook] = useState("");
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
    //   AuthAPI.login({username, password}).then(
    //     (response) => {
    //         if (response.data.accessToken) {
    //           history.push("/book")
    //         }
    //       }).catch(error=>{
    //         // console.log(error.response)
    //         const resMessage =
    //         (error.response && error.response.data.message) || error.toString();
    //       setLoading(false);
    //       setMessage(resMessage);
    //       })
    // } else {
    //   setLoading(false);
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center align-items-center">
    <div className="col-md-6">
      <br/>
     <div className="d-flex justify-content-between align-items-center" > <span style={{fontSize: "29px"}}>Thêm sách đã có</span> 
     <Link to = "/book/addnew" className = "btn btn-info mb-3 me-3" > Thêm sách mới </Link>
      </div>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Chọn sách</label>
            <br/>
            <Select
              className="form-control"
              name="book"
              value={book}
              onChange={(e)=>{setBook(e.target.value)}}
              onClick={()=>setLoading(false)}
              validations={[required]}
            >
               <option value=''>Chọn sách </option>
              <option value='1'>London</option>
              <option value='2'>Kyiv</option>
              <option value='3'>New York</option>
              </Select>
       
          </div>

          <div className="form-group">
            <label htmlFor="password">Số lượng</label>
            <Input
              type="number"
              className="form-control"
              name="total"
              value={total}
              onChange={(e)=>{setTotal(e.target.value)}}
              onClick={()=>setLoading(false)}
              validations={[required]}
            />
          </div>
          <br/>

          <div className="form-group">
            <button className="btn btn-success btn-block me-2" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Thêm</span>
            </button>
            <Link to="/book" className="btn btn-danger"> Cancel </Link>
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
    </div>
    </div>
  );
};

export default AddOldBook;