// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BreakfastFeedbackForm from './components/BreakfastFeedbackForm';
import LunchFeedbackForm from './components/LunchFeedbackForm';
import DinnerFeedbackForm from './components/DinnerFeedbackForm';
import FeedbackList from './components/FeedbackList';
import NavBar from './components/NavBar';
import { breakfastMealType, lunchMealType, dinnerMealType } from './components/mealConfigs';
import Dashboard from './components/Dashboard'

const App = () => {
  const [activeMeal, setActiveMeal] = useState(null); // State to manage which meal form is active
  const [selectedMealType, setSelectedMealType] = useState('All'); // State for feedback list filter

  return (
    <Router>
      <NavBar />
      <div className="container my-4">
        

        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Feedback Form Route */}
          <Route path="/feedback-form" element={
            <>
              <h5 className='text-center fw-bold'>MESS FEEDBACK SURVEY</h5>
              <div className="mt-3 d-flex justify-content-center">
                <button className="btn btn-primary btn-sm fw-bold me-2 mt-2" onClick={() => setActiveMeal('breakfast')}>BREAKFAST</button>
                <button className="btn btn-primary btn-sm fw-bold me-2 mt-2" onClick={() => setActiveMeal('lunch')}>LUNCH</button>
                <button className="btn btn-primary btn-sm fw-bold mt-2" onClick={() => setActiveMeal('dinner')}>DINNER</button>
              </div>

              {/* Conditional rendering of meal feedback forms based on activeMeal state */}
              {activeMeal === 'breakfast' && <BreakfastFeedbackForm mealType={breakfastMealType} />}
              {activeMeal === 'lunch' && <LunchFeedbackForm mealType={lunchMealType} />}
              {activeMeal === 'dinner' && <DinnerFeedbackForm mealType={dinnerMealType} />}
            </>
          } />

          {/* Feedback List Route */}
          <Route path="/feedback-list" element={
            <>
                           
             <FeedbackList mealType={selectedMealType} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
