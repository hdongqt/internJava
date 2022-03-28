import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { ListCategory } from './components/ListCategory';
import AddCategory from './components/AddCategory';
import NotFound from 'components/NotFound/NotFound';

export default function Category() {
    const match = useRouteMatch();
    const context = useContext(UserContext)
    const user = context.user
  return (
    <Switch>
      {
          user?.roles == "ROLE_ADMIN" && [
            <Route exact path={match.url} component={ListCategory} />,
            <Route path={`${match.url}/add`} component={AddCategory} />,
            <Route path={`${match.url}/update/:id`} component={AddCategory} />
          ]
      }
   <Route component={NotFound} />
  </Switch>
  )
}
