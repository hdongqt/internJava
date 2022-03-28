import React from 'react'
import { AuthAPI } from 'api/AuthAPI';
import { useContext } from 'react';
import UserContext from '../../store/Context';

export const LibrarianHeader = () => {
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
            <a className="nav-link active" aria-current="page" href="/book">Quản lý sách</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/borrow">Quản lý mượn</a>
          </li>
        </ul>
        {!context.user && 
        <>
          <a href="/login" className="btn btn-info" type="submit" style={{marginRight: "5px"}}>Đăng nhập</a>
          <a href="/register" className="btn btn-info" type="submit" style={{marginRight: "5px"}}>Đăng ký</a>
          </>
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
