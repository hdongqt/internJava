import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { ListCategory } from './components/ListCategory';
import AddCategory from './components/AddCategory';

export default function Category() {
    const match = useRouteMatch();
  return (
    <Switch>
    <Route exact path={match.url} component={ListCategory} />

    <Route path={`${match.url}/add`} component={AddCategory} />
    <Route path={`${match.url}/update/:categoryId`} component={AddCategory} />

   {/* <Route component={NotFound} /> */}
  </Switch>
  )
}
