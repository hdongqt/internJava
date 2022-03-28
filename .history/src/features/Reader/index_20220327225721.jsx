import React, { useContext }  from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { HistoryBorrow } from './components/HistoryBorrow';
import "./reader.css";
import { ChangePassword } from './components/ChangePassword';
import InfoUser from './components/InfoUser';
import NotFound  from 'components/NotFound/NotFound';
import  UserContext  from 'store/Context';
export default function Category() {
    const match = useRouteMatch();
    const context = useContext(UserContext)
    const user = context.user
  return (
    <Switch>
      {
        user?.roles == "ROLE_USER" && 
        <>
        <Route exact path={match.url} component={InfoUser} />
        <Route path={`${match.url}/history`} component={HistoryBorrow} />
        <Route path={`${match.url}/changepassword`} component={ChangePassword} />
       <Route component={NotFound} />
       </>
      }
   <Route component={NotFound} />
  </Switch>
  )
}
