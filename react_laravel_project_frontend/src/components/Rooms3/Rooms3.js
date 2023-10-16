import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import api from "../../api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Rooms3 = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const productsArray = api();

  const products = productsArray

  var settings = {
    dots: false,
    arrows: true,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="wpo-room-area-s2 pb-0">
      <div className="container-fluid">
        <div className="room-wrap room-active">
          <Slider {...settings}>
            {products.length > 0 &&
              products.slice(0, 6).map((product, pitem) => (
                <div className="room-item" key={pitem}>
                  <div className="room-img">
                    <img src={product.proImg} alt="" />
                  </div>
                  <div className="room-content">
                    <h2><Link onClick={ClickHandler} to={`/room-single/${product.id}`}>{product.title}</Link></h2>
                    <ul>
                      <li><i className="fi flaticon-expand-arrows"></i>{product.sqm} sqm</li>
                      <li><i className="fi flaticon-bed"></i>{product.bedroom} Bed</li>
                      <li><i className="fi flaticon-bathtub"></i>{product.bathroom} Bathroom</li>
                    </ul>
                    <h3>${product.price} <span>/ Night</span></h3>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default connect(null)(Rooms3);
