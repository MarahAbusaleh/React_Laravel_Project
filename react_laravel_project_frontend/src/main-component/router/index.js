import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Homepage from '../HomePage'
import Homepage2 from '../HomePage2'
import HomePage3 from '../HomePage3';
import AboutPage from '../AboutPage/AboutPage';
import CartPage from '../CartPage';
import CheckoutPage from '../CheckoutPage';
import DestinationPage from '../DestinationPage/DestinationPage';
import DestinationSinglePage from '../DestinationSinglePage/DestinationSinglePage';
import OrderRecived from '../OrderRecived';
import RoomPage from '../RoomPage';
import RoomSinglePage from '../RoomSinglePage';
import SearchResults from '../SearchResults/SearchResults';
import ServicePage from '../ServicePage/ServicePage';
import ServicePageS2 from '../ServicePageS2/ServicePageS2';
import ServiceSinglePage from '../ServiceSinglePage/ServiceSinglePage';
import BlogPage from '../BlogPage'
import BlogPageLeft from '../BlogPageLeft'
import BlogPageFullwidth from '../BlogPageFullwidth'
import BlogDetails from '../BlogDetails'
import BlogDetailsFull from '../BlogDetailsFull'
import BlogDetailsLeftSiide from '../BlogDetailsLeftSiide'
import LoginPage from '../LoginPage'
import SignUpPage from '../SignUpPage'
import ForgotPassword from '../ForgotPassword'
import PricingPage from '../PricingPage/PricingPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import ContactPage from '../ContactPage/ContactPage';

const AllRoute = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='home' element={<Homepage />} />
          <Route path='home2' element={<Homepage2 />} />
          <Route path='home3' element={<HomePage3 />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='search-result' element={<SearchResults />} />
          <Route path='room-single/:id' element={<RoomSinglePage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='order_received' element={<OrderRecived />} />
          <Route path='room' element={<RoomPage />} />
          <Route path='destination' element={<DestinationPage />} />
          <Route path='destination-single/:id' element={<DestinationSinglePage />} />
          <Route path='service' element={<ServicePage />} />
          <Route path='service-s2' element={<ServicePageS2 />} />
          <Route path='service-single/:id' element={<ServiceSinglePage />} />
          <Route path='pricing' element={<PricingPage />} />
          <Route path='404' element={<ErrorPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='blog-single/:id' element={<BlogDetails />} />
          <Route path='blog-single-left-sidebar/:id' element={<BlogDetailsLeftSiide />} />
          <Route path='blog-single-fullwidth/:id' element={<BlogDetailsFull />} />
          <Route path='blog' element={<BlogPage />} />
          <Route path='blog-left-sidebar' element={<BlogPageLeft />} />
          <Route path='blog-fullwidth' element={<BlogPageFullwidth />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<SignUpPage />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default AllRoute;
