import React, { Component } from 'react';

// Importing React-icons 
import { TiStarOutline } from 'react-icons/ti';
import { BiBookmarkPlus } from 'react-icons/bi';
import { RiDirectionLine, RiShareForwardLine } from 'react-icons/ri';

// Importing all the required components
import Navbar from '../components/Navbar';
// import ImageGrid from '../components/Restaurant/ImageGrid';
// import InfoButton from '../components/Restaurant/InfoButton';
// import RestaurantInfo from '../components/Restaurant/RestaurantInfo';
// import Tabs from '../components/Restaurant/Tabs';
// import CartContainer from '../components/Restaurant/Cart/CartContainer';


const RestaurantLayout = (Component) => ({ ...props }) => {
  return (
    <>
      <Navbar {...props} />
      {/* <div className='container mx-auto px-4 lg:px-20 pb-20'>
        <ImageGrid />
        <RestaurantInfo name='' restaurantRating='' deliveryRating='' cuisine='' />
        <div className='my-4 flex flex-wrap gap-3 mx-auto'>
          <InfoButton>
            <TiStarOutline />
            Add Review
          </InfoButton>
          <InfoButton>
            <RiDirectionLine />
            Direction
          </InfoButton>
          <InfoButton>
            <BiBookmarkPlus />
            Bookmark
          </InfoButton>
          <InfoButton>
            <RiShareForwardLine />
            Share
          </InfoButton>
        </div>
        <div className='my-10'>
          <Tabs />
        </div> */}
        <Component {...props} />
      {/* </div>
      <CartContainer {...props} /> */}
    </>
  )
}

export default RestaurantLayout