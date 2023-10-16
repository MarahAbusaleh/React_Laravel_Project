import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import test1 from '../../images/testimonial/img-1.jpg'
import test2 from '../../images/testimonial/img-2.jpg'
import test3 from '../../images/testimonial/img-3.jpg'





const Testimonials = [
    {
        tstImg: test1,
        name: 'Elezabeth Marvel',
        title: 'Photographer',
        descriptoion: 'Lorem ipsum dolor sit amet, consectetur adiping elit, do eiusmod tempor incididunt ut labore et doliore magna aliqjtua. Quis ipsum suspendisse ultrices gravida. Risus commodo maepac cenas.',
    },
    {
        tstImg: test2,
        name: 'Marry Jenefer',
        title: 'CEO Of Golden Bravo',
        descriptoion: 'Lorem ipsum dolor sit amet, consectetur adiping elit, do eiusmod tempor incididunt ut labore et doliore magna aliqjtua. Quis ipsum suspendisse ultrices gravida. Risus commodo maepac cenas.',
    },
    {
        tstImg: test3,
        name: 'William Robert',
        title: 'CEO Of Bexima',
        descriptoion: 'Lorem ipsum dolor sit amet, consectetur adiping elit, do eiusmod tempor incididunt ut labore et doliore magna aliqjtua. Quis ipsum suspendisse ultrices gravida. Risus commodo maepac cenas.',
    },
]



const Testimonial = () => {

    var settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };

    return (
        <div className="wpo-testimonial-area">
            <div className="container">
                <div className="wpo-testimonial-wrap">
                    <div className="testimonial-slider">
                        <Slider {...settings}>
                            {Testimonials.map((tstml, tsm) => (
                                <div className="wpo-testimonial-item" key={tsm}>
                                    <div className="wpo-testimonial-img">
                                        <img src={tstml.tstImg} alt="" />
                                    </div>
                                    <div className="wpo-testimonial-content">
                                        <p>{tstml.descriptoion}</p>
                                        <h2>{tstml.name}</h2>
                                        <span>Previous Client</span>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial;