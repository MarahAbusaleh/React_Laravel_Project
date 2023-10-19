import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../checkout/checkout.css";
import { CLIENT_ID } from "../../Config/config";
import { Link } from "react-router-dom";
import Header from "../header/index";
import Footer from "../../components/footer/index";
import abimg from '../../images/03OK8RtV8MnXM5XSsZmBUvl-12..v1668779182.jpg'

const Checkout = () => {
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState("creditCard");
    const [show, setShow] = useState(false);

    // Function to handle payment method selection
    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    // creates a PayPal order
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Sunflower",
                        amount: {
                            currency_code: "USD",
                            value: "20.00",
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    // capture likely error
    const onError = (error) => {
        setErrorMessage("An Error occurred with your payment");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log("Order successful. Your order ID is:", orderID);
        }
    }, [success, orderID]);

    return (
        <div>
            <Header />
            <div className="payment_image">
                <img src={abimg} alt="" />
            </div>
        
            <section className="content header">
                <div className="container">
                    <div className="details shadow">
                        <div className="details__item">
                            <div className="item__image">
                                <img
                                    className="iphone"
                                    src="https://www.apple.com/v/iphone/compare/k/images/overview/compare_iphoneXSmax_silver_large.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="item__details">
                                <div className="item__title">Iphone X</div>
                                <div className="item__price">649.99 Â£</div>

                                <div className="item__description">
                                    <ul>
                                        <li>Super fast and power efficient</li>
                                        <li>A lot of fast memory</li>
                                        <li>High resolution camera</li>
                                        <li>Smart tools for health and traveling and more</li>
                                        <li>
                                            Share your games and achievements with your friends via
                                            Group Play
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="discount"></div>
                    <div className="container">
                        <div className="payment">
                            <div className="payment__title">Payment Method</div>
                            <div className="payment__types">
                                <div className="payment__type payment__type--paypal">
                                    <Link to="/order_received">
                                        {" "}
                                        {/* Specify the URL where you want to navigate */}
                                        <i className="icon icon-paypal">Cash</i>
                                    </Link>
                                </div>

                                <div
                                    className={`payment__type payment__type--paypal ${selectedPaymentMethod === "paypal" ? "active" : ""
                                        }`}
                                    onClick={() => {
                                        setShow(true);
                                        handlePaymentMethodChange("paypal");
                                    }}
                                >
                                    <Link>
                                        <i className="icon icon-paypal">Paypal</i>
                                        {show ? (
                                            <PayPalScriptProvider
                                                options={{ "client-id": CLIENT_ID }}
                                            >
                                                <PayPalButtons
                                                    style={{ layout: "vertical" }}
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                />
                                            </PayPalScriptProvider>
                                        ) : null}
                                    </Link>
                                </div>
                            </div>

                            <div className="payment__info">
                                {selectedPaymentMethod === "creditCard" && (
                                    <div className="payment__cc">
                                        {/* Personal Information Form */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />
                    <br />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Checkout;