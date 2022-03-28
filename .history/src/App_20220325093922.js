import { BrowserRouter, Redirect, Route, Router, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Book from './features/Book';
import Login from 'features/Auth/pages/Login';
import { ListCategory } from 'features/Category/components/ListCategory';
import Category from './features/Category/index';
import Reader from 'features/Reader';
import Register from './features/Auth/pages/Register/index';
import { AuthAPI } from 'api/AuthAPI';
import { useContext } from 'react';
import UserContext from './store/Context';
import { LibrarianHeader } from 'components/Header/LibrarianHeader';
import { ReaderHeader } from 'components/Header/ReaderHeader';
function App() {
  const context = useContext(UserContext)
  const user = context.user
  console.log(user)
  return (
    <div className="book-app">
      <BrowserRouter>
       {user && user.roles =='ROLE_LIBRARIAN'  && <LibrarianHeader/>}
      {user && user.roles =='ROLE_USER'  &&<ReaderHeader/>}
       <Switch>
       <Route path="/" exact >
           {user ? <Book /> : <Redirect to="/login" />}
       </Route>
         <Route path="/book"> 
         {user ? <Book /> : <Redirect to="/login" />}
         </Route>
         <Route path="/category">
         {user ? <Category /> : <Redirect to="/login" />}
         </Route>
         <Route path="/reader">
         {user ? <Reader /> : <Redirect to="/login" />}
         </Route>
         <Route path="/borrow" >
         {!user ? <Login /> : <Redirect to="/book" />}
         </Route>
         <Route path="/login" >
         {!user ? <Login /> : <Redirect to="/book" />}
         </Route>
             <Route path="/login" >
         {!user ? <Login /> : <Redirect to="/book" />}
         </Route>
         <Route path="/register" >
          <Register/>
         </Route>
      </Switch>
   </BrowserRouter>
 </div>
  );
}

export default App;
