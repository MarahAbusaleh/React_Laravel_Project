import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
    const [activeTab, setActiveTab] = useState('tab');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        image: '',
        password: '',
    });
    const [userPass, setUserPass] = useState('');

    let user_id = 2;


    /*------------------------------------------- getUserInfo API -------------------------------------------*/
    const getUserInfo = () => {
        axios
            .get(`http://localhost:8000/api/getUserInfo/${user_id}`)
            .then((response) => {
                setUserData(response.data);
                console.log(response.data);
                console.log(userData.image);
                console.log(userData.name);
                console.log(userData.name);
            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
            });
    };

    useEffect(() => {
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
                console.log('New password and confirmation do not match');
            }
        } else {
            console.log('Old password is incorrect');
        }
    };

    useEffect(() => {
        if (userPass !== '') {
            const updateUserPass = () => {
                axios
                    .put(`http://127.0.0.1:8000/api/updateUserPass/${user_id}`, {
                        password: userPass,
                    })
                    .then((response) => {
                        console.log('Password changed successfully');
                    })
                    .catch((error) => {
                        console.error('Error updating password:', error);
                    });
            };
            updateUserPass();
        }
    }, [userPass]);


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
                                        Account
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className={`tab-pane ${activeTab === 'tab' ? 'active' : ''}`} id="tab">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                            <p>
                                                <br />
                                                <div>
                                                    <h4 style={{ display: 'inline' }}>Name:</h4><span style={{ display: 'inline', marginLeft: '10px' }}>{userData.name}</span><br></br><br></br>
                                                    <h4 style={{ display: 'inline' }}>Email:</h4><span style={{ display: 'inline', marginLeft: '10px' }}>{userData.email}</span><br></br><br></br>
                                                    <h4 style={{ display: 'inline' }}>Phone:</h4><span style={{ display: 'inline', marginLeft: '10px' }}>{userData.phone}</span><br></br><br></br>
                                                </div>

                                            </p>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="basic">
                                                    <form className="form-horizontal" onSubmit={handleSubmit} method="GET">
                                                        <h4>Change Your Password</h4>

                                                        <label>Currant Password:</label>
                                                        <input name="oldPass" type="password"></input>
                                                        <br></br>
                                                        <label>New Password:</label>
                                                        <input name="password" type="password"></input>
                                                        <br></br>
                                                        <label>Confirm New Password:</label>
                                                        <input name="confPass" type="password"></input>
                                                        <br></br>
                                                        <button type="submit"> Change</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane ${activeTab === 'tab3' ? 'active' : ''}`} id="tab3">
                                    {/* Content for Account tab */}
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="basic">
                                                    <form className="form-horizontal" role="form">
                                                        {/* Account tab content */}
                                                        hi2
                                                    </form>
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
