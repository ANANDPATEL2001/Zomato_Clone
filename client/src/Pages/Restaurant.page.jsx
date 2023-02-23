import React from 'react';
import { Outlet } from 'react-router-dom';

// Importing Layout
import RestaurantLayout from '../layouts/Restaurant.Layout';


const Restaurant = () => {
  return (
    <>
      <h1>Restaurant</h1>
      {/* An <Outlet> is used in parent route elements to render their child route elements which allows nested UI to show up when child routes are rendered ie. subroutes of the Restaurant */}
      <Outlet />
    </>
  )
}

export default RestaurantLayout(Restaurant);