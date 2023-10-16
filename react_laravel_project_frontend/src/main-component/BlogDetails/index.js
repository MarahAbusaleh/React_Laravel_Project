import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import Logo from '../../images/logo2.png'
import Newslatter from '../../components/Newslatter/Newslatter';
import Scrollbar from '../../components/scrollbar'
import { useParams } from 'react-router-dom'
import blogs from '../../api/blogs'
import BlogSingle from '../../components/BlogDetails'
import Footer from '../../components/footer';


const BlogDetails = () => {

    const { id } = useParams()

    const BlogDetails = blogs.find(item => item.id === id)

    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={BlogDetails.title} pagesub={'Blog'} />
            <BlogSingle />
            <Newslatter nClass={'section-bg'}/>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetails;
