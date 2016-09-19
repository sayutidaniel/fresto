import React from 'react';
import { Route } from 'react-router';
import BasePage from './../../pages/BasePage';
import HomePage from './../../pages/HomePage';
import SearchPage from './../../pages/SearchPage';
import RestaurantPage from './../../pages/RestaurantPage';

export default (
  <Route component={BasePage}>
    <Route path="/" component={HomePage} />
    <Route path="/search" component={SearchPage} />
    <Route path="/restaurant/:id" component={RestaurantPage} />
  </Route>
);
