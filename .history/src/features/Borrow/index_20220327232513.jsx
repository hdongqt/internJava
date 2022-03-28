import React from 'react'
import { useContext } from 'react';
import UserContext from 'store/Context';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import NotFound  from 'components/NotFound/NotFound';
import { ListBorrow } from './components/ListBorrow';
import "./borrow.css"
import AddBorrow from './components/AddBorrow';
import EditBorrow from './components/EditBorrow';

export default function Borrow() {
    const match = useRouteMatch();
   const context = useContext(UserContext)
    const user = context.user
  return (
    <Switch>
         {
           user && (user.roles == "ROLE_ADMIN" || user.roles == "ROLE_LIBRARIAN") && [
            <Route exact path={match.url} component={ListBorrow} />,
            <Route path={`${match.url}/add`} component={AddBorrow} /> ,
            <Route path={`${match.url}/update/:id`} component={EditBorrow} /> ,
           <Route component={NotFound} />
            ]
        }
 
  </Switch>
  )
}
