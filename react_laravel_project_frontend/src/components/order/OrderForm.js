import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/actions/order";
import axios from "../../main-component/axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import "./order.css";
import Header from "../header/index";
import Footer from "../../components/footer/index";
import PageTitle from "../../components/pagetitle/PageTitle";
import Navbar from '../../components/Navbar';
import Logo from '../../images/logo2.png'

////////////////////////////////////////////////////////////////////////////////////////////////////////////
const OrderForm = () => {
  const { itemId } = useParams();
  //It allows you to access the URL parameters, specifically the itemId from the URL.

  const dispatch = useDispatch();
  //used for accessing the dispatch function from Redux, which is typically used to dispatch actions to update the Redux store.

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    item_id: "",
    date: "",
    time: "",
    location: "",
    notes: "",
    totalPrice: "",
    editing: false,
  });
  const user_id = localStorage.getItem("user_id");
  formData.user_id = user_id;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleEditingChange = (event) => {
    const isChecked = event.target.checked;
    const editingValue = isChecked;
    const editingTotalPriceAdjustment = isChecked ? 20 : 0;
    const newTotalPrice = parseFloat(formData.totalPrice) + editingTotalPriceAdjustment;
    // Update the form data
    setFormData((prevData) => ({
      ...prevData,
      editing: editingValue,
      totalPrice: newTotalPrice,
    }));
    // If the checkbox is unchecked, and the editingValue is false, revert to the previous total price
    if (!editingValue) {
      setFormData((prevData) => ({
        ...prevData,
        totalPrice: parseFloat(prevData.totalPrice) - 20,
      }));
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = async (param) => {
    param.preventDefault();
    //prevents the default form submission behavior, which would cause a page refresh.

    try {
      console.log(formData);
      //////////////////////////////
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.csrf_token;
      axios.defaults.headers.common["XSRF-TOKEN"] = csrfToken;
      const response = await axios.post("/api/order", formData);
      /////////////////////////////
      dispatch(addOrder(response.data.order));
      console.log("Order created successfully:", response.data);
      // Redirect to the payment page after successful submission
      navigate("/payment");
    } catch (error) {
      console.error("Error creating order:", error);
    }
    
  };


  //   Making an Order Creation Request:

  // The code then makes an asynchronous POST request to create an order by sending the formData to the "/api/order" endpoint using Axios.
  //  The response from the server is stored in the response variable.
  // Dispatching the Order:
  // After a successful order creation, the code dispatches the order data to the Redux store using the dispatch function. 
  // This is typically used to update the state in your Redux store so that the new order is available throughout the application.
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Header />
      <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
      <PageTitle pageTitle="Order" pagesub={"Order Form"} />

      <br />
      <br />
      <br />
      <br />
      <div className="centered-box">
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
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="hidden"
                          name="user_id"
                          value={user_id}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Item ID:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="item_id"
                         // value={item.id}
                          onChange={handleInputChange}
                        />
                      </div>

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
                        <label>Total Price:</label>
                        <input
                          className="form-control"
                          // type="text"
                          name="totalPrice"
                          value={formData.totalPrice}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>

                      <div className="form-group">
                        <label>Editing Video:</label>
                        <input
                          type="checkbox"
                          name="editing"
                          checked={formData.editing}
                          onChange={handleEditingChange}
                        />
                      </div>
                      <div className="form-btn">
                        <button className="submit-btn" type="submit">
                          Proceed to checkout
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> <br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default OrderForm;
