import React from 'react'
import { useContext } from 'react';
import UserContext from './../../store/Context';

export const ReaderHeader = () => {
  const context = useContext(UserContext)
  console.log(context)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      {/* <a className="navbar-brand" href="/">Home</a> */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {
            context.user && context.user.roles == 'ROLE_USER' && <>
            <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/reader">Thông tin cá nhân</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reader/history">Lịch sử mượn sách</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reader/changepassword">Đổi mật khẩu</a>
          </li>
            </>
          }
        {
             context.user && context.user.roles == 'ROLE_LIBRARIAN' && <>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/user">Quản lý người dùng</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/category">Quản lý thể loại</a>
              </li>
             
             </>
        }
        {
           context.user && context.user.roles == 'ROLE_LIBRARIAN' && <>
           <li className="nav-item">
           <a className="nav-link active" aria-current="page" href="/book">Quản lý sách</a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="/borrow">Quản lý mượn</a>
         </li>
        
        </>
        }



        </ul>
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
