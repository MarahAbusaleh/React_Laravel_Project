import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tab');
    const [editableField, setEditableField] = useState(null);
    const [userOrder, setUserOrder] = useState({
        item_id: '',
        date: '',
        time: '',
        location: '',
        notes: '',
        editing: '',
        totalPrice: ''
    });

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleEditClick = (field) => {
        setEditableField(field);
    };

    const [userData, setUserData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        image: '',
        password: '',
    });
    const [userPass, setUserPass] = useState('');

    let user_id = 1;

    /*------------------------------------------- getUserInfo API -------------------------------------------*/
    const getUserInfo = () => {
        axios
            .get(`http://localhost:8000/api/getUserInfo/${user_id}`)
            .then((response) => {
                setUserData(response.data);

            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
            });
    };

    useEffect(() => {
        console.log('test');
        getUserInfo();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const oldPassword = e.target.elements.oldPass.value;
        const newPassword = e.target.elements.password.value;
        const confirmPassword = e.target.elements.confPass.value;

        if (oldPassword === userData.password) {
            if (newPassword === confirmPassword) {
                setUserPass(newPassword);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "New password and confirmation do not match",
                    showConfirmButton: false,
                    timer: 2500,
                });
                console.log('New password and confirmation do not match');
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Old password is incorrect",
                showConfirmButton: false,
                timer: 2500,
            });
            console.log('Old password is incorrect');
        }
    };

    useEffect(() => {
        if (userPass !== '') {
            const updateUserPass = () => {
                axios
                    .put(`http://127.0.0.1:8000/api/updateUserPass/${userData.id}`, {
                        password: userPass,
                    })
                    .then((response) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your Password updated successfully",
                            showConfirmButton: false,
                            timer: 2500,
                        });
                        console.log('Password changed successfully');
                    })
                    .catch((error) => {
                        console.error('Error updating password:', error);
                    });
            };
            updateUserPass();
        }
    }, [userPass, userData.id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imagePreview = event.target.result;
                setUserData({ ...userData, image: imagePreview });
            };
            reader.readAsDataURL(file);

            setUserData({ ...userData, image: file });
        }
    };

    const handleEditInfo = (e) => {
        e.preventDefault();
        console.log(userData);

        if (editableField === 'image') {
            const formData = new FormData();
            formData.append('image', e.target.elements.image.files[0]);

            axios
                .post(`http://127.0.0.1:8000/api/updateUserImage/${userData.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    console.log('User image updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating user image:', error);
                });
        }

        axios
            .put(`http://127.0.0.1:8000/api/updateUserInfo/${userData.id}`, userData)
            .then((response) => {
                console.log('User information updated successfully');
            })
            .catch((error) => {
                console.error('Error updating user information:', error);
            });

        Swal.fire({
            icon: "success",
            title: "Your information updated successfully",
            showConfirmButton: false,
            timer: 2500,
        });

        setEditableField(null);
    }



    const getTheLastUserOrder = () => {

        axios
            .get(`http://127.0.0.1:8000/api/getTheLastUserOrder/${userData.id}`)
            .then((response) => {

                console.log(response.data);
                setUserOrder({
                    item_id: response.data.item_id,
                    date: response.data.date,
                    time: response.data.time,
                    location: response.data.location,
                    notes: response.data.notes,
                    editing: response.data.editing,
                    totalPrice: response.data.totalPrice
                });
                console.log(userOrder);
            })

    }

    // getTheLastUserOrder();
    useEffect(() => {
        getTheLastUserOrder();
    }, [userOrder]);


    return (
        <div>
            <link
                rel="stylesheet"
                type="text/css"
                href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
            />
            <div className="container bootstrap snippets bootdey">
                <hr />
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="well profile">
                            <img
                                className="user img-circle pull-left clearfix"
                                height="54"
                                src={userData.image}
                                alt={userData.name}
                            />
                            <h3 className="name pull-left clearfix" style={{ marginLeft: '10px' }}>{userData.name}</h3>
                            <div className="clearfix"></div>
                            <ul className="nav nav-tabs">
                                <li className={activeTab === 'tab' ? 'active' : ''}>
                                    <a href="#tab" data-toggle="tab" onClick={() => handleTabClick('tab')}>
                                        User Information
                                    </a>
                                </li>
                                <li className={activeTab === 'tab2' ? 'active' : ''}>
                                    <a href="#tab2" data-toggle="tab" onClick={() => handleTabClick('tab2')}>
                                        Change Password
                                    </a>
                                </li>
                                <li className={activeTab === 'tab3' ? 'active' : ''}>
                                    <a href="#tab3" data-toggle="tab" onClick={() => handleTabClick('tab3')}>
                                        Your Booking
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className={`tab-pane ${activeTab === 'tab' ? 'active' : ''}`} id="tab">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                            <p>
                                                <br />
                                                <form onSubmit={handleEditInfo} method="PUT">
                                                    <div>
                                                        <h4 style={{ display: 'inline' }}>Name:</h4>
                                                        {editableField === 'name' ? (
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                className="form-control"
                                                                value={userData.name}
                                                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                            />
                                                        ) : (
                                                            <span style={{ display: 'inline', marginLeft: '10px' }}>{userData.name}</span>
                                                        )}
                                                        {editableField !== 'name' && (
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                                onClick={() => handleEditClick('name')}
                                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                            />
                                                        )}
                                                        <br /><br />

                                                        <h4 style={{ display: 'inline' }}>Email:</h4>
                                                        {editableField === 'email' ? (
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                className="form-control"
                                                                value={userData.email}
                                                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                            />
                                                        ) : (
                                                            <span style={{ display: 'inline', marginLeft: '10px' }}>{userData.email}</span>
                                                        )}
                                                        {editableField !== 'email' && (
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                                onClick={() => handleEditClick('email')}
                                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                            />
                                                        )}
                                                        <br /><br />

                                                        <h4 style={{ display: 'inline' }}>Phone:</h4>
                                                        {editableField === 'phone' ? (
                                                            <input
                                                                type="text"
                                                                name="phone"
                                                                className="form-control"
                                                                value={userData.phone}
                                                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                            />
                                                        ) : (
                                                            <span style={{ display: 'inline', marginLeft: '10px' }}>{userData.phone}</span>
                                                        )}
                                                        {editableField !== 'phone' && (
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                                onClick={() => handleEditClick('phone')}
                                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                            />
                                                        )}
                                                        <br /><br />

                                                        <h4>Image: </h4>
                                                        {editableField === 'image' ? (
                                                            <input
                                                                type="file"
                                                                name="image"
                                                                className="form-control"
                                                                onChange={handleImageChange}
                                                            />
                                                        ) : (
                                                            <img
                                                                className=" i pull-left clearfix"
                                                                height="200"
                                                                src={userData.image}
                                                                alt={userData.name}
                                                            />
                                                        )}
                                                        {editableField !== 'image' && (
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                                onClick={() => handleEditClick('image')}
                                                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                                                            />
                                                        )}
                                                    </div>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <button type='submit' className='theme-btn'>Save</button>
                                                </form>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="basic">
                                                    <form className="form-horizontal" onSubmit={handleSubmit} method="PUT">
                                                        <h4>Change Your Password</h4>

                                                        <div className="form-group">
                                                            <label htmlFor="oldPass">Current Password:</label>
                                                            <input name="oldPass" type="password" className="form-control" id="oldPass" required />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="password">New Password:</label>
                                                            <input name="password" type="password" className="form-control" id="password" required />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="confPass">Confirm New Password:</label>
                                                            <input name="confPass" type="password" className="form-control" id="confPass" required />
                                                        </div>

                                                        <button type="submit" className="theme-btn">Change</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane ${activeTab === 'tab3' ? 'active' : ''}`} id="tab3">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="basic">
                                                    <section className="wpo-about-section-s2 section-padding" style={{ background: 'none', padding: '60px 0px' }}>
                                                        <div className="container-fluid">
                                                            <div className="">
                                                                <div className="row align-items-center">
                                                                    <div className="col-xl-5 col-lg-8 col-md-8 col-12 offset-xl-6 offset-lg-4 offset-md-2" style={{ marginLeft: '280px' }}>
                                                                        <div className="wpo-about-content">
                                                                            <div className="about-title">
                                                                                <span>Your Booking</span>
                                                                                <h2>Drone Name</h2>
                                                                            </div>
                                                                            <div className="wpo-about-content-inner">
                                                                                <div className="about-info-wrap">
                                                                                    <div className="about-info-left">
                                                                                        <p>Date / Time</p>
                                                                                        <p>{userOrder.date} / {userOrder.time}</p>
                                                                                        <ul>
                                                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                                                            <li><span><i className="fa fa-star" aria-hidden="true"></i></span></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div className="about-info-right">
                                                                                        <p>Price</p>
                                                                                        <h3>{userOrder.totalPrice}</h3>
                                                                                    </div>
                                                                                    <div className="about-info-right">
                                                                                        <p>Location</p>
                                                                                        <h3>{userOrder.location}</h3>
                                                                                    </div>
                                                                                    <Link className="theme-btn" to="/room">Print</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
