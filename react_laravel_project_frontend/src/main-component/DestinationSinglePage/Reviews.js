import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
//import Swal from "sweetalert2";

function Reviews() {
  let { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/review/${id}`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  const comment = (e) => {
    e.preventDefault();
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    axios
      .post("https://651db05044e393af2d5a346e.mockapi.io/review", {
       // comment: commentText,  Send the comment text
        yacht_id: id,
        username: user.name,
        image: user.image,
        userId: user.id,
      })
      .then((response) => {
        // Handle success, reset state variables here
       // setCommentText("");  Clear the comment text after posting
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error posting comment:", error);
      });
  };

  return (
    <div>
      <div class="border-bottom py-4">
        <h5 class="font-size-21 font-weight-bold text-dark mb-8">
          Showing verified guest comments
        </h5>
        {reviews.map((review) => (
          <div class="media flex-column flex-md-row align-items-center align-items-md-start mb-4">
            <div className="mr-md-5">
              <img
                src={review.image}
                alt={`Image by ${review.username}`}
                style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust the dimensions as needed
              />
            </div>

            <div class="media-body text-center text-md-left">
              <div>
                <div class="mb-4">
                  <h6 class="font-weight-bold text-gray-3">
                    {review.username}
                  </h6>

                  <div class="d-flex align-items-center flex-column flex-md-row mb-2">
                    <span class="font-weight-bold font-italic text-gray-3">
                      {review.comment}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="media flex-column flex-md-row align-items-center align-items-md-start mb-0"></div>
          </div>
        ))}
      </div>

      <div
        class="py-4"
        style={{
          display: localStorage.getItem("user") ? "block" : "none",
        }}
      >
        <h5 class="font-size-21 font-weight-bold text-dark mb-6">
          Write a Review
        </h5>
        <form class="js-validate" novalidate="novalidate">
          <div class="row mb-5 mb-lg-0">
            {/* <!-- Input --> */}
            <div class="col-sm-12 mb-5">
              <div class="js-form-message">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    rows="6"
                    cols="77"
                    name="text"
                    placeholder="Comment"
                    aria-label="Hi there, I would like to ..."
                    required=""
                    data-msg="Please enter a reason."
                    data-error-class="u-has-error"
                    data-success-class="u-has-success"
                   // value={commentText}
                    //onChange={(e) => setCommentText(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            {/* <!-- End Input --> */}
            <div className="col d-flex justify-content-center justify-content-lg-start">
              <button
                onClick={(e) => comment(e)}
                style={{
                  backgroundColor: "#297cbb", // Background color #297cbb;

                  color: "white", // Text color
                  padding: "10px 20px", // Padding
                  border: "none", // Remove border
                  borderRadius: "4px", // Rounded corners
                  cursor: "pointer", // Add a pointer cursor on hover
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
