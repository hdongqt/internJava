import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import NotFound  from 'components/NotFound/NotFound';
import { ListBorrow } from './components/ListBorrow';
import "./borrow.css"
import AddBorrow from './components/AddBorrow';
import EditBorrow from './components/EditBorrow';

export default function Borrow() {
    const match = useRouteMatch();
  return (
    <Switch>
    <Route exact path={match.url} component={ListBorrow} />
    <Route path={`${match.url}/add`} component={AddBorrow} /> 
    <Route path={`${match.url}//update/:id`} component={EditBorrow} /> 
   <Route component={NotFound} />
  </Switch>
  )
}
