// src/App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BreakfastFeedbackForm from './components/BreakfastFeedbackForm';
import LunchFeedbackForm from './components/LunchFeedbackForm';
import LunchVegNonVeg from './components/LunchVegNonVeg';
import DinnerFeedbackForm from './components/DinnerFeedbackForm';
import FeedbackList from './components/FeedbackList';
import NavBar from './components/NavBar';
import { breakfastMealType, lunchMealType, dinnerMealType } from './components/mealConfigs';
import Dashboard from './components/Dashboard';
import NonVegFeedback from './components/NonvegFeedback';

const App = () => {
  const [activeMeal, setActiveMeal] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [enabledButton, setEnabledButton] = useState('');
  const navigate = useNavigate();

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
      setActiveMeal('lunch');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container my-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/" element={
            <>
              <h5 className='text-center fw-bold'>MESS FEEDBACK SURVEY</h5>
              <div className="mt-3 d-flex justify-content-center">
                <button 
                  className="btn btn-primary btn-sm fw-bold me-2 mt-2" 
                  onClick={() => setActiveMeal('breakfast')} 
                  disabled={enabledButton !== 'breakfast'}
                >
                  BREAKFAST
                </button>
                <button 
                  className="btn btn-primary btn-sm fw-bold me-2 mt-2" 
                  onClick={handleLunchClick} 
                  disabled={enabledButton !== 'lunch'}
                >
                  LUNCH
                </button>
                <button 
                  className="btn btn-primary btn-sm fw-bold mt-2" 
                  onClick={() => setActiveMeal('dinner')} 
                  disabled={enabledButton !== 'dinner'}
                >
                  DINNER
                </button>
              </div>

              {activeMeal === 'breakfast' && <BreakfastFeedbackForm mealType={breakfastMealType} />}
              {activeMeal === 'lunch' && <LunchFeedbackForm mealType={lunchMealType} />}
              {activeMeal === 'dinner' && <DinnerFeedbackForm mealType={dinnerMealType} />}
            </>
          } />

          <Route path="/lunch-veg-nonveg" element={<LunchVegNonVeg />} />
          <Route path="/non-veg-feedback" element={<NonVegFeedback />} />
          <Route path="/wed-veg-lunch" element={<LunchFeedbackForm />} />
          <Route path="/feedback-list" element={<FeedbackList mealType={selectedMealType} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

