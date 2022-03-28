import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useHistory, Link } from 'react-router-dom';
import { BookAPI } from 'api/BookAPI';
import  Select  from 'react-select';


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
  const [book, setBook] = useState({id: "", total: ""});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchBooks, setSearchBooks] = useState([])
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      BookAPI.addBookExits(book).then(
        (response) => {
            if (response.data) {
              history.push("/book")
            }
          }).catch(error=>{
            const resMessage =
            (error.response && error.response.data.message) || error.toString();
          setLoading(false);
          setMessage(resMessage);
          })
    } else {
      setLoading(false);
    }
  };


  const handelSearch=(value)=>{
    BookAPI.searchBook(value).then((response) => {
        if(response.data){
            const list = response.data.map(item=>{
                return { value: item.id, label: item.bookname + " - " + item.author}
            })
            setSearchBooks(list)
       }
   }).catch(error =>{
       console.log(error);
   })
 }

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
            <Select options={searchBooks} className="w-100"
                onKeyDown={(e)=>{handelSearch(e.target.value)}}
                onChange={(e)=>{
                 setBook({...book,id: e.value})
                }}
                 name="book"
                 isClearable={true}
             />
       
          </div>

          <div className="form-group mt-3">
            <label htmlFor="password">Số lượng</label>
            <Input
              type="number"
              className="form-control"
              name="total"
              value={book.total}
              onChange={(e)=>{setBook({...book,total: +e.target.value})}}
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