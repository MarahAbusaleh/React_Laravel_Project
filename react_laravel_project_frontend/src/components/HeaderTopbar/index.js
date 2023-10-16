import React from 'react'
import { Link } from 'react-router-dom'

const HeaderTopbar = () => {
    return (
        <div className="topbar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-lg-7 col-md-8 col-sm-12 col-12">
                        <div className="contact-intro">
                            <ul>
                                <li><i className="fi flaticon-email"></i> parador@gmail.com</li>
                                <li><i className="fi flaticon-phone-call"></i> +888 (123) 869523</li>
                                <li><i className="fi ti-location-pin"></i> New York – 1075 Firs Avenue</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-lg-5 col-md-4 col-sm-12 col-12">
                        <div className="contact-info">
                            <ul>
                                <li className="language">
                                    <select name="language" id="language">
                                        <option value="">English</option>
                                        <option value="">Arabic</option>
                                        <option value="">France</option>
                                    </select>
                                </li>
                                <li><Link to="/"><i className="fi flaticon-facebook-app-symbol"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-twitter"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-linkedin"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-instagram"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-pinterest"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-youtube"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTopbar;