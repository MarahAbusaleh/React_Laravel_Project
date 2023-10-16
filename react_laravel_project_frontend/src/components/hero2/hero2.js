import React from "react";
import { Link } from 'react-router-dom'

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Hero2 = (props) => {
    return(
        <section className="static-hero">
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="container-fluid">
                        <div className="row justify-content-end">
                            <div className="col-lg-6">
                                <div className="wpo-slide-content">
                                    <div className="slide-title">
                                        <h2><span>Our World is</span> Your Playground</h2>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="slide-btns">
                                        <Link className="theme-btn" onClick={ClickHandler} to="/room"> Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="left-img"></div>
        </section>
    )
}

export default Hero2;