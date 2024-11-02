// src/components/LunchVegNonVeg.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const LunchVegNonVeg = () => {
    return (
        <div className="container d-flex justify-content-center align-items-top ">
            <div className="card text-center" style={{ width: '40rem', borderRadius: '10px', overflow: 'hidden' }}>
                <div className="card-body">
                    <h5 className="card-title">WEDNESDAY SPECIAL LUNCH</h5>
                    <p className="card-text">CHOOSE VEG OR NON-VEG </p>

                    {/* Flex Row for Inner Cards */}
                    <div className="d-flex justify-content-center gap-3 mt-3">
                    
                        {/* First Small Card */}
                        <div className="card" style={{ width: '100%',padding:'5px' }}>
                            <img src="/images/vegmeal.jpg " className="card-img-top bg-light " alt="Main Dish" />
                            <div className="card-body">
                                <h6 className="card-title bg-primary text-white">VEG</h6>
                                <p className="card-text">Share your Feedback for the Vegetarian Option.</p>
                                <Link to="/wed-veg-lunch" className="btn btn-primary btn-sm">CLICK HERE</Link>
                            </div>
                        </div>
                        
                        {/* Second Small Card */}
                        <div className="card" style={{ width: '100%',padding:'5px' }}>
                        <img src="/images/non-veg.jpg " className="card-img-top bg-light" alt="Main Dish" />
                            <div className="card-body">
                                <h6 className="card-title bg-primary text-white ">NON-VEG</h6>
                                <p className="card-text">Share your feedback for the Non-Vegetarian Option.</p>
                                <Link to="/non-veg-feedback" className="btn btn-primary btn-sm">CLICK HERE</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LunchVegNonVeg;
