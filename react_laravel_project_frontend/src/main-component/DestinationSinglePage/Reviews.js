import React, { useEffect, useState } from "react";
import axios from "../axios/axios";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState(""); // State to capture user's comment

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/review/${id}`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const comment = async (param) => {
    param.preventDefault();
    const userData = localStorage.getItem("user_id");
    //const user = JSON.parse(userData);
    const formData = new FormData();
    formData.append("comment", commentText);
    formData.append("user_id", userData);
    formData.append("item_id", id);
    console.log(formData);
    const csrfResponse = await axios.get("/get-csrf-token");
    const csrfToken = csrfResponse.data.csrf_token;

    axios.defaults.headers.common["XSRF-TOKEN"] = csrfToken;
    axios({
      method: "post",
      url: "/api/review",
      data: formData,
    })
      .then((res) => {})
      .catch((error) => {
        console.error("Error while saving data:", error);
      });
  };

  return (
    <div>
      <div className="room-review">
        <div className="room-title">
          <h2>Room Reviews</h2>
        </div>
        {reviews.map((review, index) => (
          <div className="review-item" key={index}>
            <div className="review-img">
              <img src={review.image} alt={`Image by ${review.username}`} />
            </div>
            <div className="review-text">
              <div className="r-title">
                <h2>{review.username}</h2>
                <ul>
                  {[...Array(review.starRating).keys()].map((i) => (
                    <li key={i}>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                  ))}
                </ul>
              </div>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="py-4"
        style={{
          display: localStorage.getItem("user_id") ? "block" : "none",
        }}
      >
        <h5 className="font-size-21 font-weight-bold text-dark mb-6">
          Write a Review
        </h5>
        <form className="js-validate">
          <div className="row mb-5 mb-lg-0">
            <div className="col-sm-12 mb-5">
              <div className="js-form-message">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    placeholder="Comment"
                    aria-label="Hi there, I would like to ..."
                    required=""
                    data-msg="Please enter a reason."
                    data-error-class="u-has-error"
                    data-success-class="u-has-success"
                    value={commentText}
                    onChange={(param) => setCommentText(param.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center justify-content-lg-start">
              <button
                onClick={(param) => comment(param)}
                style={{
                  backgroundColor: "#297cbb",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Submit Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
