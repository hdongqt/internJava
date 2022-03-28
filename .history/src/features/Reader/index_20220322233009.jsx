import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import InfoUser from 'components/InfoUser';
import { HistoryBorrow } from './components/HistoryBorrow';
import "./reader.css";
import { ChangePassword } from './components/ChangePassword';
export default function Category() {
    const match = useRouteMatch();
  return (
    <Switch>
    <Route exact path={match.url} component={InfoUser} />

    <Route path={`${match.url}/history`} component={HistoryBorrow} />
    <Route path={`${match.url}/changepassword`} component={ChangePassword} />
   {/* <Route component={NotFound} /> */}
  </Switch>
  )
}
