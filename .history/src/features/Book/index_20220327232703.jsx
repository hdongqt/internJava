import React from 'react'
import { useContext } from 'react';
import UserContext from 'store/Context';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { ListBook } from 'features/Book/components/ListBook';
import AddBook from './components/AddBook';
import AddOldBook from './components/AddOldBook';
import NotFound from 'components/NotFound/NotFound';

export default function Book() {
    const match = useRouteMatch();
    const context = useContext(UserContext)
    const user = context.user
  return (
    <Switch>
 {
           user && (user.roles == "ROLE_ADMIN" || user.roles == "ROLE_LIBRARIAN") && [
            <Route exact path={match.url} component={ListBook} />,
            <Route path={`${match.url}/addnew`} component={AddBook} />,
            <Route path={`${match.url}/addold`} component={AddOldBook} />,
            <Route path={`${match.url}/update/:bookId`} component={AddBook} />,
            <Route component={NotFound} />
           ]
   }
   <Route component={NotFound} />
  </Switch>
  )
}
