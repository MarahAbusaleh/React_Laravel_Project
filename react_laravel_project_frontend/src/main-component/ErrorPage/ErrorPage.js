import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Logo from '../../images/logo2.png'
import Newslatter from '../../components/Newslatter/Newslatter';
import Error from '../../components/404';



const ErrorPage =() => {
    return(
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'404'} pagesub={'404'}/> 
            <Error/>
            <Newslatter nClass={'section-bg'}/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};

export default ErrorPage;
