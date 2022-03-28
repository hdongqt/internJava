import React from 'react'
import { AuthAPI } from 'api/AuthAPI';
import { useContext } from 'react';
import UserContext from './../../store/Context';

export const Header = () => {
  const context = useContext(UserContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Home</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/reader">Thông tin cá nhân</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reader/history">Lịch sử mượn sách</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/changepassword">Đổi mật khẩu</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li className="nav-item">
          </li>
        </ul>
        {!context.user && 
          <a href="/login" className="btn btn-info" type="submit" style={{marginRight: "5px"}}>Login</a>
        }
         {
           context.user &&
           <>
           <span className="btn btn-info" style={{marginLeft: "5px"}}>{context.user.username}</span>
            <button className="btn btn-danger" 
            onClick={context.logout}
            style={{marginLeft: "5px"}}>Logout</button>
           </>
         }
      </div>
    </div>
  </nav>
  )
}
