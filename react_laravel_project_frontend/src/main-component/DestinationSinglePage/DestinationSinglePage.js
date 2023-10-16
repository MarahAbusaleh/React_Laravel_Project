import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import Scrollbar from '../../components/scrollbar'
import Destinations from '../../api/destination'
import Benefits from './benefits'
import DestinationSidebar from './sidebar'
import Footer from '../../components/footer';
import Logo from '../../images/logo2.png'

import dimg1 from '../../images/destination-single/2.jpg'
import dimg2 from '../../images/destination-single/3.jpg'
import Newslatter from '../../components/Newslatter/Newslatter';


const DestinationSinglePage = (props) => {
    const { id } = useParams()

    const destinationDetails = Destinations.find(item => item.id === id)


    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={destinationDetails.title} pagesub={'destination'} />
            <section className="wpo-destination-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="wpo-destination-single-wrap">
                                <div className="wpo-destination-single-content">
                                    <img src={destinationDetails.dSimg} alt="" />
                                    <div className="wpo-destination-single-content-des">
                                        <h2>{destinationDetails.title}</h2>
                                        <p>I must explain to you how all this mistaken idea of denouncing pleasure and
                                            praising pain was born and I will give you a complete account of the system, and
                                            expound the actual teachings of the great explorer of the truth, the
                                            master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
                                            itself, because it is pleasure, but because those who do not know how to pursue
                                            pleasure rationally encounter consequences that are extremely painful. </p>
                                        <p>Nor again is there anyone who loves or pursues or desires to obtain pain of
                                            itself, because it is pain, but because occasionally circumstances occur in
                                            which toil and pain can procure him some great pleasure. To take a trivial
                                            example, which of us ever undertakes laborious physical exercise.</p>
                                        <div className="wpo-destination-single-sub-img">
                                            <ul>
                                                <li><img src={dimg1} alt="" /></li>
                                                <li><img src={dimg2} alt="" /></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                <p>but because those who do not know how to pursue
                                    pleasure rationally encounter consequences that are extremely painful. </p>
                                <p>Nor again is there anyone who loves or pursues or desires to obtain pain of
                                    itself, because it is pain, but because occasionally circumstances occur in
                                    which toil and pain can procure him some great pleasure. To take a trivial
                                    example, which of us ever undertakes laborious physical exercise</p>

                                <Benefits />

                            </div>
                        </div>
                        <DestinationSidebar />
                    </div>
                </div>
            </section>
            <Newslatter nClass={'section-bg'}/>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default DestinationSinglePage;
