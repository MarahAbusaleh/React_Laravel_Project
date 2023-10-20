import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/actions/order";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./order.css";
import Header from "../header/index";
import Footer from "../../components/footer/index";

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function
  const [formData, setFormData] = useState({
    user_id: "",
    item_id: "",
    date: "",
    time: "",
    location: "",
    notes: "",
    totalprice: "",
    editing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //editing
  const handleEditingChange = (event) => {
    const isChecked = event.target.checked;
    const editingValue = isChecked ? 1 : 0; // Set to 1 if checked, 0 if not

    // Calculate the totalprice adjustment
    const editingtotalpriceAdjustment = isChecked ? 20 : 0; // Add $20 if checked, otherwise 0

    // Update the form data
    setFormData((prevData) => ({
      ...prevData,
      editing: editingValue,
      totalprice: parseFloat(prevData.totalprice) + editingtotalpriceAdjustment,
    }));
  };

  //editing
  //total
  // const totalDisplayedtotalprice = servertotalprice + (editingStatus === 1 ? 20 : 0);
  //total
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://64db19d6593f57e435b070c9.mockapi.io/order",
        // "http://localhost:8000/api/order",
        formData
      );
      dispatch(addOrder(response.data.order));
      console.log("Order created successfully:", response.data);
      // Redirect to the home page after successful submission
      navigate("/"); // Use navigate to go to the home page
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
<div>
<Header />
    <div class="centered-box">
      <div className="box">
        <div id="booking" className="section">
          <div className="section-center">
            <div className="container">
              <div className="row">
                <div className="booking-form">
                  <div className="form-header">
                    <h1>Make a Reservation</h1>
                  </div>
                  <form onSubmit={handleSubmit}>
                    {/* <div className="form-group">
                  <label>User ID:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                  />
                </div> */}
                    {/* <div className="form-group">
                  <label>User ID:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="user_id"
                    value={user_id} // Replace 'user_id' with the actual variable holding the user's ID
                    readOnly // Make it read-only since it's auto-filled
                  />
                </div> */}

                    {/* <div className="form-group">
                  <label>Item ID:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="item_id"
                    value={formData.item_id}
                    onChange={handleInputChange}
                  />
                </div> */}
                    {/* Assuming you have a function to handle item selection, e.g., handleItemSelection */}
                    {/* <div className="form-group">
                  <label>Item ID:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="item_id"
                    value={formData.item_id} // Use the state variable holding the selected item ID
                    onChange={handleItemSelection} // Use a function to update the selected item
                  />
                </div> */}

                    <div className="form-group">
                      <label>Date:</label>
                      <input
                        className="form-control"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Time:</label>
                      <input
                        className="form-control"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Location:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Notes:</label>
                      <textarea
                        className="form-control"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number:</label>
                      <input
                        className="form-control"
                        type="tel" // Set the input type to "tel" for phone numbers
                        name="phonenumber" // Set the name attribute to "phonenumber"
                        value={formData.phonenumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Editing Video:</label>
                      <input
                        // className="form-control"
                        type="checkbox"
                        name="editing"
                        checked={formData.editing}
                        onChange={handleEditingChange}
                      />
                    </div>
                    <Link to="/payment">
                      <div className="form-btn">
                        <button className="submit-btn" type="submit">
                          Proceed to checkout
                        </button>
                      </div>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default OrderForm;
