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
import { Header } from 'components/Header/Header';
import Borrow from './features/Borrow/index';
import User from 'features/User';
import Forbidden from './components/Forbidden/Forbidden';
function App() {
  const context = useContext(UserContext)
  const user = context.user
  return (
    <div className="book-app">
      <BrowserRouter>
     <Header/>
       <Switch>
       <Route path="/" exact >
           {user ? <Book /> : <Redirect to="/login" />}
       </Route>
         <Route path="/book"> 
         {user && (user.roles ==='ROLE_ADMIN' || user.roles ==='ROLE_ADMIN')  ? <Book /> : <Redirect to="/forbidden" />}
         </Route>
         <Route path="/category">
         {user && user.roles ==='ROLE_ADMIN' ? <Category /> : <Redirect to="/login" />}
         </Route>
         <Route path="/reader">
         {user && user.roles ==='ROLE_USER' ? <Reader /> : <Redirect to="/notfound" />}
         </Route>
         <Route path="/borrow" >
         {user ? <Borrow /> : <Redirect to="/login" />}
         </Route>
         <Route path="/user" >
         {user ? <User /> : <Redirect to="/login" />}
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
          <Route path="/forbidden" component={Forbidden}/>
      </Switch>
   </BrowserRouter>
 </div>
  );
}

export default App;
