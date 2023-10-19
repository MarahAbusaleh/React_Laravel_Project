import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle/PageTitle";
import DestinationSidebar from "./sidebar";
import Benefits from "./benefits";
import Footer from "../../components/footer";
//import Newslatter from "../../components/Newslatter/Newslatter";
import Scrollbar from "../../components/scrollbar";
import Logo from "../../images/logo2.png";
import rv1 from "../../images/room/r1.jpg";
import rv2 from "../../images/room/r2.jpg";
import Reviews from "./Reviews";

const DestinationSinglePage = (props) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`http://127.0.0.1:8000/api/item/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h1>Error fetching data: {error.message}</h1>;
  }

  const SubmitHandler = (itemId) => {
    // window.scrollTo(10, 0);
    navigate(`/order/${itemId}`);
  };

  return (
    <Fragment>
      <Navbar hclass={"wpo-header-style-3"} Logo={Logo} />
      <PageTitle pageTitle={item.name} pagesub={"destination"} />
      <section className="wpo-destination-single-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="wpo-destination-single-wrap">
                <div className="wpo-destination-single-content">
                  <img src={item.image} alt="" />
                  <div className="wpo-destination-single-content-des">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
                {/* Include Reviews component here */}
                <Reviews />
                <div className="room-review">
                  <div className="room-title">
                    <h2>Room Reviews</h2>
                  </div>
                  <div className="review-item">
                    <div className="review-img">
                      <img src={rv1} alt="" />
                    </div>
                    <div className="review-text">
                      <div className="r-title">
                        <h2>Marry Watson</h2>
                        <ul>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                        </ul>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Quis ipsum suspendisse ultrices gravida.
                        Risus commodo viverra maecenas accumsan lacus vel
                        facilisis.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="review-item">
                    <div className="review-img">
                      <img src={rv2} alt="" />
                    </div>
                    <div className="review-text">
                      <div className="r-title">
                        <h2>Lily Havenly</h2>
                        <ul>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                          <li>
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </li>
                        </ul>
                      </div>
                      <p>
                        {" "}
                        Quis ipsum suspendisse ultrices gravida. Risus commodo
                        viverra maecenas accumsan lacus vel facilisis.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="add-review">
                  <div className="room-title">
                    <h2>Add Review</h2>
                  </div>
                  <div className="wpo-blog-single-section review-form ">
                    <div className="give-rat-sec">
                      <p>Your rating *</p>
                      <div className="give-rating">
                        <label>
                          <input type="radio" name="stars" value="1" />
                          <span className="icon">★</span>
                        </label>
                        <label>
                          <input type="radio" name="stars" value="2" />
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                        </label>
                        <label>
                          <input type="radio" name="stars" value="3" />
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                        </label>
                        <label>
                          <input type="radio" name="stars" value="4" />
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                        </label>
                        <label>
                          <input type="radio" name="stars" value="5" />
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                        </label>
                      </div>
                    </div>
                    <div className="review-add">
                      <div className="comment-respond">
                        <form
                          id="commentform"
                          className="comment-form"
                          onSubmit={() => SubmitHandler(item.id)}
                        >
                          <div className="form-inputs">
                            <input placeholder="Your Name*" type="text" />
                            <input placeholder="Your Email*" type="email" />
                          </div>
                          <div className="form-textarea">
                            <textarea
                              id="comment"
                              placeholder="Your Review"
                            ></textarea>
                          </div>
                          <div className="form-check">
                            <div className="shipp pb">
                              <input type="checkbox" id="c2" name="cc" />
                              <label htmlFor="c2">
                                <span></span>Save my name, email, and website in
                                this browser for the next time I comment.
                              </label>
                            </div>
                          </div>
                          <div className="form-submit">
                            <input
                              id="submit"
                              value="Submit Now"
                              type="submit"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Include Benefits component here */}
                <Benefits />
              </div>
            </div>
            {/* Include DestinationSidebar component here */}
            <DestinationSidebar />
          </div>
        </div>
      </section>
      {/* Include Newslatter component here */}
      {/* <Newslatter nClass={"section-bg"} /> */}
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default DestinationSinglePage;
