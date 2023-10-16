import React from 'react'
import { Link } from 'react-router-dom'
import blogs from '../../api/blogs'
import SectionTitleS2 from '../SectionTitleS2'

const BlogSection = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className={`wpo-blog-section section-padding ${props.blogClass}`}>
            <div className="container">
                <SectionTitleS2 topTitle={'News'} MainTitle={'Latest News'} />
                <div className="wpo-blog-items">
                    <div className="row">
                        {blogs.map((blog, Bitem) => (
                            <div className="col col-lg-4 col-md-6 col-12" key={Bitem}>
                                <div className="wpo-blog-item">
                                    <div className="wpo-blog-img">
                                        <img src={blog.screens} alt="" />
                                    </div>
                                    <div className="wpo-blog-content">
                                        <div className="wpo-blog-content-top">
                                            <div className="b-top">
                                                <div className="b-top-inner">
                                                    <h2><Link onClick={ClickHandler} to={`/blog-single/${blog.id}`}>{blog.title}</Link></h2>
                                                    <p>{blog.description}</p>
                                                </div>
                                            </div>
                                            <Link className="b-btn" onClick={ClickHandler} to={`/blog-single/${blog.id}`}>Read More..</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogSection;