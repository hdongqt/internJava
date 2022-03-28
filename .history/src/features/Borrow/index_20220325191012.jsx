import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import NotFound  from 'components/NotFound/NotFound';
import { ListBorrow } from './components/ListBorrow';
import "./borrow.css"
import AddBorrow from './components/AddBorrow';

export default function Borrow() {
    const match = useRouteMatch();
  return (
    <Switch>
    <Route exact path={match.url} component={ListBorrow} />
    <Route path={`${match.url}/add`} component={AddBorrow} /> 
    {/* <Route path={`${match.url}/changepassword`} component={ChangePassword} /> */} 
   <Route component={NotFound} />
  </Switch>
  )
}
