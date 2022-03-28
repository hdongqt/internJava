import React, { useState, useRef,useContext } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { AuthAPI } from 'api/AuthAPI';
import { useHistory } from 'react-router-dom';
import UserContext from "store/Context";
import { Link } from "react-router-dom";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const context = useContext(UserContext);
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthAPI.login({username, password}).then(
        (response) => {
            if (response.data.accessToken) {
              context.login(response.data)
              history.push("/book")
            }
          }).catch(error=>{
            // console.log(error.response)
            const resMessage =
            (error.response && error.response.data.message) || error.toString();
          setLoading(false);
          setMessage(resMessage);
          })
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center align-items-center">
    <div className="col-md-6">
      <br/>
      <h2>Login</h2>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              onClick={()=>setLoading(false)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
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
          <br/>

          <div className="form-group">
            <button className="btn btn-primary btn-block me-3" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Đăng nhâp</span>
            </button>
            <Link to="/register" className="btn btn-info">Đăng ký</Link>
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

export default Login;