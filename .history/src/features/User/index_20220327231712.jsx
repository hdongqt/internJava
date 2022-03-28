import React from 'react'
import { useContext } from 'react';
import UserContext from 'store/Context';

import { useRouteMatch, Switch, Route } from 'react-router-dom';
import EditUser from './components/EditUser';
import NotFound  from 'components/NotFound/NotFound';
import { ListUser } from './components/ListUser';

export default function User() {
    const match = useRouteMatch();

    const context = useContext(UserContext)
    const user = context.user
  return (
    <Switch>
      {
            user?.roles == "ROLE_ADMIN" && [
              <Route exact path={match.url} component={ListUser} />,
              <Route path={`${match.url}/update/:id`} component={EditUser} /> ,
             <Route component={NotFound} />
            ]
      }
      <Route component={NotFound} />
  </Switch>
  )
}
