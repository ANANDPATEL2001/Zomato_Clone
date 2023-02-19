import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

// Including required Pages 
import Checkout from './Pages/Checkout.page';
import GoogleAuth from './Pages/GoogleAuth.page';
import Home from './Pages/Home.page';
import Restaurant from './Pages/Restaurant.page';

// Including required compnents 
import Menu from './components/Restaurant/Menu';
import OrderOnline from './components/Restaurant/OrderOnline';
import Overview from './components/Restaurant/Overview';
import Photos from './components/Restaurant/Photos';
import Reviews from './components/Restaurant/Reviews';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/delivery' />} />
        <Route path='/:type' element={<Home />} />
        <Route path='/restaurant/:id' element={<Restaurant />} />
        <Route path='/restaurant/:id/overview' element={<Overview />} />
        <Route path='/restaurant/:id/order-online' element={<OrderOnline />} />
        <Route path='/restaurant/:id/reviews' element={<Reviews />} />
        <Route path='/restaurant/:id/menu' element={<Menu />} />
        <Route path='/restaurant/:id/photos' element={<Photos />} />
        <Route path='/google/token' element={<GoogleAuth />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
