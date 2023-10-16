import React, {Fragment} from 'react';
import About2 from '../../components/about2/about2';
import BlogSection from '../../components/BlogSection';
import Destination from '../../components/Destination';
import Footer from '../../components/footer';
import FunFact from '../../components/FunFact';
import Hero2 from '../../components/hero2/hero2';
import Navbar from '../../components/Navbar'
import Newslatter from '../../components/Newslatter/Newslatter';
import PricingSection from '../../components/PricingSection';
import Rooms from '../../components/Rooms/Rooms';
import Scrollbar from '../../components/scrollbar'
import SearchSection from '../../components/SearchSection';
import ServiceSection2 from '../../components/ServiceSection2/ServiceSection2';
import Testimonial from '../../components/Testimonial';
import Logo from '../../images/logo.png'



const HomePage2 =() => {

    return(
        <Fragment>
            <Navbar topbarBlock={'wpo-header-style-1'} Logo={Logo}/> 
            <Hero2/> 
            <SearchSection/> 
            <About2/> 
            <Destination/> 
            <FunFact fClass={'section-padding'}/> 
            <Rooms/> 
            <ServiceSection2/> 
            <PricingSection/> 
            <Testimonial/> 
            <BlogSection/> 
            <Newslatter/> 
            <Footer/> 
            <Scrollbar/>
        </Fragment>
    )
};

export default HomePage2;