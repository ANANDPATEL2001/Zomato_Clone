import React from 'react';

import Navbar from '../components/Navbar';


const CheckoutLayout = (Component) => ({ ...props }) => {
  return (
    <>
      <Navbar {...props} />
      <div className='container mx-auto px-4 lg:px-20'>
        <Component {...props} />
      </div>
    </>
  )
}

export default CheckoutLayout