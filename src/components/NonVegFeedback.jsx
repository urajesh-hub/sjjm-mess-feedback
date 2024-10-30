import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './StarRating.css';

const NonVegFeedback = () => {
  const [formData, setFormData] = useState({
    categories: [],
    rise:[],
    mutton:[],
    chicken:[],
    egg:[],
    hospitalityOptions:[],
    mainDish: [],
    sideDish: [],
    cleanlinessOptions:[],
    additionalComments: ''
  });

  const [currentDateTime, setCurrentDateTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Function to format the current date and time
    const formatDateTime = () => {
      const date = new Date();
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const day = dayNames[date.getDay()];
      const dayFormatted = String(date.getDate()).padStart(2, '0');
      const monthFormatted = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();
      const hoursFormatted = String(date.getHours()).padStart(2, '0');
      const minutesFormatted = String(date.getMinutes()).padStart(2, '0');
      const secondsFormatted = String(date.getSeconds()).padStart(2, '0');

      return `${dayFormatted}-${monthFormatted}-${year} ${hoursFormatted}:${minutesFormatted}:${secondsFormatted} ${day}`;
    };

    // Set the current date and time when the component mounts
    setCurrentDateTime(formatDateTime());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categories') {
      setFormData({ ...formData, categories: [value] });
    } else if (name === 'mainDish' || name === 'sideDish') {
      const updatedDishes = formData[name].includes(value)
        ? formData[name].filter(dish => dish !== value)
        : [...formData[name], value];
      setFormData({ ...formData, [name]: updatedDishes });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      await addDoc(collection(db, 'nonVegFeedback'), { ...formData, date: currentDate });
      alert('Non-Vegetarian feedback submitted successfully');
       // Navigate to home page after successful submission
       navigate('/');
      setFormData({
        categories: [],
        rise:[],
        mutton:[],
        chicken:[],
        egg:[],
        hospitalityOptions:[],
        mainDish: [],
        sideDish: [],
        cleanlinessOptions:[],
        additionalComments: ''
      });
    } catch (error) {
      console.error('Error submitting feedback', error);
      alert('There was an error submitting your feedback.');
    }
  };

  // Options for Non-Veg Feedback
  const categories = ['COMPANY STAFF', 'GUEST', 'ERECTOR/SERVICE ENGINEER', 'AUDITOR', 'OTHERS'];
  const hospitalityOptions = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];
  const rise = ['THE RICE WAS GOOD- சாதம் நன்றாக இருந்தது', 'NOT COOKED PROPERLY-சரியாக வேகவில்லை', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'THE RICE IS SPOILED - சாதம் குலைந்துவிட்டது'];
  const mutton = ['IT WAS AVERAGE- சுமாராக இருந்தது', 'TOO SPICY-காரம் அதிகம்', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'GOOD - நன்றாக இருந்தது'];
  const chicken = ['IT WAS AVERAGE- சுமாராக இருந்தது', 'TOO SPICY-காரம் அதிகம்', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'GOOD - நன்றாக இருந்தது'];
  const egg = ['IT WAS AVERAGE- சுமாராக இருந்தது', 'TOO SPICY-காரம் அதிகம்', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'GOOD - நன்றாக இருந்தது'];
  // const mainDishes = ['Chicken Curry', 'Grilled Fish', 'Mutton Biryani']; // Non-Veg main dishes
  // const sideDishes = ['French Fries', 'Coleslaw', 'Garlic Bread']; // Non-Veg side dishes
  const cleanlinessOptions = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];

  return (
    <div className="container my-4">
      <div className="card">
        
        <div className="card-header bg-danger text-white">
          <h6 className="card-title mb-0 text-center fw-bold">NON-VEGETARIAN FEEDBACK FORM</h6>
        </div>
        <div className="card-body">
          {/* Display Current Date and Time in the desired format */}
          <h6 className="text-center fw-bold bg-light text-dark">{currentDateTime}</h6>
          <form onSubmit={handleSubmit}>

            
            {/* Category */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
              <img src="/images/non-veg/non-category.jpg" alt="mutton" className="card-img-top mb-2" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>VISTORS CATEGORY </strong>  
             
                </label>
               
                {categories.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`categories-${dish}`}
                      name="categories"
                      value={dish}
                      checked={formData.categories.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }}htmlFor={`categories-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>


            {/* Hospitality Ratings */}
            <div className="card mb-2 " >
              
              <div className="card-body ">
              <img src="/images/non-veg/non-veg-service.jpg" alt="Hospitality" className="card-img-top mb-2" style={{ border: "1px solid #e9f1f7 " }} />
              <label className="form-label " style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }}><strong>HOW WAS THE SERVICE OF THE CATERERS? </strong>  
                <p className='mt-1' style={{ fontSize: '0.8rem' }}>உணவு பரிமாறுபவர்களின் விருந்தோம்பல் எவ்வாறு இருந்தது?</p> 
                </label>
                
                {hospitalityOptions.map((option, index) => (
                  <div key={index} className="form-check" >
                    <input
                      type="radio"
                      className="form-check-input "
                      id={`hospitalityOptions-${option}`}
                      name="hospitalityOptions"
                      value={option}
                      checked={formData.hospitalityOptions === option}
                      onChange={handleChange} 
                    />
                    <label className="form-check-label "style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }} htmlFor={`hospitalityOptions-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rising */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
              <img src="/images/non-veg/non-veg-meal.jpg" alt="rise" className="card-img-top mb-2" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the rice ? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>அரிசி சாதம் எவ்வாறு இருந்தது?</p> 
                </label>
               
                {rise.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`rise-${dish}`}
                      name="rise"
                      value={dish}
                      checked={formData.rise.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }}htmlFor={`rise-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Mutton Gravey */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
              <img src="/images/non-veg/non-veg-mutton1.jpg" alt="mutton" className="card-img-top mb-2" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How did the Non-Veg gravy (mutton, Chicken, egg) taste ? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>அசைவ குழம்பின் (மட்டன், சிக்கன், முட்டை) சுவை எவ்வாறு இருந்தது ?</p> 
                </label>
               
                {mutton.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`mutton-${dish}`}
                      name="mutton"
                      value={dish}
                      checked={formData.mutton.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }}htmlFor={`mutton-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Chicken Gravey */}
            {/* <div className="card mb-3 border-secondary">
              <div className="card-body">
              <img src="/images/non-veg/non-veg-chicken1.jpg" alt="chicken" className="card-img-top mb-2" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How did the chicken gravey taste? ? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>கோழி இறைச்சி குழம்பின் சுவை எவ்வாறு இருந்தது?</p> 
                </label>
               
                {chicken.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`chicken-${dish}`}
                      name="chicken"
                      value={dish}
                      checked={formData.chicken.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }}htmlFor={`chicken-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Egg Gravey */}
            {/* <div className="card mb-3 border-secondary">
              <div className="card-body">
              <img src="/images/non-veg/non-veg-egg1.jpg" alt="egg" className="card-img-top mb-2" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How did the egg gravey taste ?  </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}> முட்டை குழம்பின் சுவை எவ்வாறு இருந்தது??</p> 
                </label>
               
                {egg.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`egg-${dish}`}
                      name="egg"
                      value={dish}
                      checked={formData.egg.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }}htmlFor={`egg-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}


            {/* Main Dishes Ratings */}
            {/* <div className="card mb-3 border-secondary">
              <div className="card-body">
                <label className="form-label"><strong>3. Please rate the main dish:</strong></label>
                {mainDishes.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`mainDish-${dish}`}
                      name="mainDish"
                      value={dish}
                      checked={formData.mainDish.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`mainDish-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Side Dishes Ratings */}
            {/* <div className="card mb-3 border-secondary">
              <div className="card-body">
                <label className="form-label"><strong>4. Please rate the side dish:</strong></label>
                {sideDishes.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`sideDish-${dish}`}
                      name="sideDish"
                      value={dish}
                      checked={formData.sideDish.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`sideDish-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}


             {/* Cleanliness Ratings */}
             <div className="card mb-2 " >
              
              <div className="card-body ">
              <img src="/images/non-veg/non-veg-clean.jpg" alt="Cleanliness" className="card-img-top mb-2 " style={{ border: "1px solid #e9f1f7 " }} />
              <label className="form-label " style={{ fontSize: '0.8rem',marginBottom: '0.01rem' }}><strong>HOW WAS THE CLEANLINESS OF THE EATING AREA? </strong>  
                <p className='mt-1' style={{ fontSize: '0.8rem' }}>உணவு உண்ணும் இடத்தில் சுத்தம் எவ்வாறு இருந்தது?</p> 
                </label>
                
                {cleanlinessOptions.map((option, index) => (
                  <div key={index} className="form-check" >
                    <input
                      type="radio"
                      className="form-check-input "
                      id={`cleanlinessOptions-${option}`}
                      name="cleanlinessOptions"
                      value={option}
                      checked={formData.cleanlinessOptions === option}
                      onChange={handleChange} 
                    />
                    <label className="form-check-label "style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }} htmlFor={`cleanlinessOptions-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Comments */}
            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/non-feedback.jpg" alt="Cleanliness" className="card-img-top mb-2 " />
               
                <label htmlFor="additionalComments" className="form-label " style={{ fontSize: '0.9rem',marginBottom: '0.01rem',textTransform: "uppercase" }}><strong>Please let us know your other improvement ideas and suggestions ? </strong>  
                <p className='mt-1' style={{ fontSize: '0.8rem' }}>உங்களின் மற்ற மேம்பாட்டு யோசனைகள் மற்றும் பரிந்துரைகளை எங்களுக்குத் தெரிவிக்கவும்</p> 
                </label>
                <textarea
                  className="form-control"
                  id="additionalComments"
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-danger mt-3">Submit Feedback</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NonVegFeedback;
