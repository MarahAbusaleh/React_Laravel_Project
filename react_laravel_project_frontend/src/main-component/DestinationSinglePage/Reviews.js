import React, { useEffect, useState } from "react";
import axios from "../axios/axios";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import test1 from '../../images/defaultImage.png'


function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  let [commentText, setCommentText] = useState("");
  let [editCommentId, setEditCommentId] = useState(null);
  const loggedInUserId = localStorage.getItem("user_id");

  useEffect(() => {

    axios.get(`/api/review/${id}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

  const comment = async (e) => {
    e.preventDefault();
    const userData = loggedInUserId;
    const formData = new FormData();
    console.log(commentText);

    if (!commentText) {
      return;
    }

    formData.append("comment", commentText);

    formData.append("user_id", userData);
    formData.append("item_id", id);

    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.csrf_token;
      axios.defaults.headers.common["XSRF-TOKEN"] = csrfToken;
      console.log("testttt");
      console.log(editCommentId);
      if (editCommentId) {
        console.log('edited');
        console.log(commentText);
        await axios.put(`/api/editReview/${editCommentId}/${userData}`, { comment: commentText });
        await axios.get(`/api/review/${id}`)
          .then((response) => {
            setReviews(response.data);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
          });
        setEditCommentId(null);
      } else {
        const response = await axios.post("/api/review", formData);
        setReviews([...reviews, response.data]);
      }

      setCommentText("");
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  const handleEditClick = async (commentId) => {
    setEditCommentId(commentId);
    editCommentId = commentId;
    console.log(editCommentId);
    const commentToEdit = reviews.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setCommentText(commentToEdit.comment);
      commentText = commentToEdit.comment;
      console.log(commentText);

    }
  };

  const handleDeleteClick = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(`/api/deleteReview/${commentId}/${loggedInUserId}`);
        const updatedReviews = reviews.filter((review) => review.id !== commentId);
        setReviews(updatedReviews);
      } catch (error) {
        console.error("Error while deleting comment:", error);
      }
    }
  };

  return (
    <div>
      <div className="room-review">
        <div className="room-title">
          <h2>Room Reviews</h2>
        </div>
        {reviews.map((review, index) => (
          <div className="review-item" key={index}>
            <div className="review-img" style={{ width: '80px' }}>
              <img className="user img-circle pull-left clearfix" src={`${process.env.PUBLIC_URL}/${review.user.image}`} alt={review.user.name} />
            </div>
            <div className="review-text">
              <div className="r-title">
                <h2>{review.user.name}</h2>
                {/* <h2>tttt</h2> */}
                {/* <ul>
                  {[...Array(review.starRating).keys()].map((i) => (
                    <li key={i}>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                  ))}
                </ul> */}
                {loggedInUserId === review.user_id && (
                  <div>
                    <button
                      onClick={() => {
                        console.log("Edit button clicked with comment ID:", review.id);
                        handleEditClick(review.id);
                      }}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(review.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                )}

              </div>
              {editCommentId === review.id ? (
                // Display an edit form when the edit button is clicked
                <form onSubmit={comment}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="text"
                      placeholder="Edit your comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button type="submit">Save Edit</button>
                  </div>
                </form>
              ) : (
                <p>{review.comment}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className="py-4"
        style={{
          display: loggedInUserId ? "block" : "none",
        }}
      >
        <h5 className="font-size-21 font-weight-bold text-dark mb-6">
          Write a Review
        </h5>
        <form className="js-validate" onSubmit={comment}>
          <div className="row mb-5 mb-lg-0">
            <div className="col-sm-12 mb-5">
              <div className="js-form-message">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    placeholder={
                      editCommentId ? "Edit your comment" : "Write a new comment"
                    }
                    aria-label="Hi there, I would like to ..."
                    required=""
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button type="submit">
                    {editCommentId ? "Save Edit" : "Submit Comment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reviews;



