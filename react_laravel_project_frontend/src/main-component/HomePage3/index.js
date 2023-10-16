import React, {Fragment} from 'react';
import About3 from '../../components/about3/about3';
import BlogSection from '../../components/BlogSection';
import Destination from '../../components/Destination';
import Footer from '../../components/footer';
import FunFact from '../../components/FunFact';
import Hero3 from '../../components/hero3';
import Navbar from '../../components/Navbar'
import Newslatter from '../../components/Newslatter/Newslatter';
import PricingSection from '../../components/PricingSection';
import Rooms3 from '../../components/Rooms3/Rooms3';
import Scrollbar from '../../components/scrollbar'
import SearchSection from '../../components/SearchSection';
import ServiceSection2 from '../../components/ServiceSection2/ServiceSection2';
import Testimonial from '../../components/Testimonial';
import Logo from '../../images/logo2.png'



const HomePage3 =() => {

    return(
        <Fragment>
            <Navbar hclass={"wpo-header-style-4"} Logo={Logo}/> 
            <Hero3/> 
            <SearchSection svClass={'wpo-select-section-s2'}/> 
            <About3/> 
            <FunFact fClass={'wpo-fun-fact-section-s2 section-padding pt-0'}/> 
            <ServiceSection2/> 
            <Destination dClass={'section-padding'}/> 
            <Rooms3/> 
            <PricingSection/> 
            <Testimonial/> 
            <BlogSection/> 
            <Newslatter/> 
            <Footer/> 
            <Scrollbar/>
        </Fragment>
    )
};

export default HomePage3;