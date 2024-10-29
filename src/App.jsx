import React, { useState,useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BreakfastFeedbackForm from './components/BreakfastFeedbackForm';
import LunchFeedbackForm from './components/LunchFeedbackForm';
import LunchVegNonVeg from './components/LunchVegNonVeg';
import DinnerFeedbackForm from './components/DinnerFeedbackForm';
import FeedbackList from './components/FeedbackList';
import { breakfastMealType, lunchMealType, dinnerMealType } from './components/mealConfigs';
import Dashboard from './components/Dashboard';
import { Link } from 'react-router-dom';
import NonVegFeedback from './components/NonVegFeedback';

const App = () => {
  const navigate = useNavigate();
    const [activeMeal, setActiveMeal] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [enabledButton, setEnabledButton] = useState('');
  // const navigate = useNavigate();

    useEffect(() => {
    const checkTimeForMeal = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      // Check for Breakfast time (6:00 AM - 9:00 AM)
      if (currentHour >= 6 && (currentHour < 9 || (currentHour === 9 && currentMinutes === 0))) {
        setEnabledButton('breakfast');
      }
      // Check for Lunch time (12:01 PM - 3:00 PM)
      else if (currentHour >= 12 && currentHour < 15) {
        setEnabledButton('lunch');
      }
      // Check for Dinner time (6:00 PM - 9:30 PM)
      else if (currentHour >= 18 && (currentHour < 21 || (currentHour === 21 && currentMinutes <= 30))) {
        setEnabledButton('dinner');
      } else {
        setEnabledButton(''); // No button enabled outside of meal times
      }
    };

    checkTimeForMeal();
    const timer = setInterval(checkTimeForMeal, 60000); // Check every minute
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);
  

  const handleLunchClick = () => {
    const today = new Date();
    const day = today.toLocaleString('en-IN', { weekday: 'long' });
    
    if (day === 'Wednesday') {
      navigate('/lunch-veg-nonveg');
    } else {
      navigate('/lunch-feedback'); // Navigate to LunchFeedbackForm if not Wednesday
    }
  };

  return (
    <div>
      {/* <NavBar /> */}
      <div className="container my-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/" element={
            <>
             

              {/* Main Card containing Company Logo and Buttons */}
              <div className="card mt-4 bg-light">
                <div className="card-body d-flex flex-column justify-content-around align-items-center">

                  {/* Company Image Card */}
                  <div className="card mx-2" style={{ width: '18rem' }}>
                    <div className="card-body text-center">
                    <h5 className="fw-bold mb-3 text-primary">SRI JAYAJOTHI AND COMPANY PRIVATE LIMITED</h5>
                    <Link to="/Dashboard" className=" ">
                    <img src="images/sjjmlogo.jpg" alt="Company Logo" className="img-fluid" />
                    </Link>
                      
                     

                      {/* Meal Selection Buttons */}
                      <h6 className="text-center fw-bold mt-3">MESS FEEDBACK SURVEY</h6>
                      <div className=" card-body d-flex flex-column text-center">
                        <button 
                          className="btn btn-primary fw-bold mb-2 " 
                          onClick={() => navigate('/breakfast-feedback')}
                          disabled={enabledButton !== 'breakfast'}
                        >
                          BREAKFAST
                        </button>
                        <button 
                          className="btn btn-primary fw-bold mb-2" 
                          onClick={handleLunchClick}
                          disabled={enabledButton !== 'lunch'}
                        >
                          LUNCH
                        </button>
                        <button 
                          className="btn btn-primary fw-bold" 
                          onClick={() => navigate('/dinner-feedback')}
                          disabled={enabledButton !== 'dinner'}
                        >
                          DINNER
                        </button>
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
            </>
          } />

          {/* Separate routes for feedback forms */}
          <Route path="/breakfast-feedback" element={<BreakfastFeedbackForm mealType={breakfastMealType} />} />
          <Route path="/lunch-feedback" element={<LunchFeedbackForm mealType={lunchMealType} />} />
          <Route path="/dinner-feedback" element={<DinnerFeedbackForm mealType={dinnerMealType} />} />

          <Route path="/lunch-veg-nonveg" element={<LunchVegNonVeg />} />
          <Route path="/non-veg-feedback" element={<NonVegFeedback />} />
          <Route path="/wed-veg-lunch" element={<LunchFeedbackForm />} />
          <Route path="/feedback-list" element={<FeedbackList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
