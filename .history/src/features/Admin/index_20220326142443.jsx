import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import NotFound  from 'components/NotFound/NotFound';
import "./borrow.css"
import { ListUser } from './components/ListUser';

export default function Admin() {
    const match = useRouteMatch();
  return (
    <Switch>
    <Route exact path={match.url} component={ListUser} />
    {/* <Route path={`${match.url}/add`} component={AddBorrow} /> 
    <Route path={`${match.url}/update/:id`} component={EditBorrow} />  */}
   <Route component={NotFound} />
  </Switch>
  )
}
