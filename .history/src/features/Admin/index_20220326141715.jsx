import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import NotFound  from 'components/NotFound/NotFound';
import "./borrow.css"

export default function Borrow() {
    const match = useRouteMatch();
  return (
    <Switch>
    <Route exact path={match.url} component={ListBorrow} />
    <Route path={`${match.url}/add`} component={AddBorrow} /> 
    <Route path={`${match.url}/update/:id`} component={EditBorrow} /> 
   <Route component={NotFound} />
  </Switch>
  )
}
