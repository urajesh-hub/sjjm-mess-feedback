import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './StarRating.css';


const BreakfastFeedbackForm = () => {
 
  const [formData, setFormData] = useState({
    mealType: 'BREAKFAST',
    date: '',
    categories: '',
    hospitality: '',
    mainDish: [],
    mainDishRating: 1,
    sideDish: [],
    sideDishRating: 1,
    cleanliness: 1,
    sideDishComment: '',
    additionalComments: ''
  });

  const [currentDateTime, setCurrentDateTime] = useState('');
const navigate=useNavigate()

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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'categories') {
  //     setFormData({ ...formData, categories: [value] });
  //   } else if (name === 'mainDish' || name === 'sideDish') {
  //     const updatedDishes = formData[name].includes(value)
  //       ? formData[name].filter(dish => dish !== value)
  //       : [...formData[name], value];
  //     setFormData({ ...formData, [name]: updatedDishes });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleStarRating = (dishType, rating) => {
    if (dishType === 'main') {
      setFormData({ ...formData, mainDishRating: rating });
    } else if (dishType === 'side') {
      setFormData({ ...formData, sideDishRating: rating });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      await addDoc(collection(db, 'breakfastFeedback'), { ...formData, date: currentDate });
      alert('Breakfast feedback submitted successfully');
navigate('/')
      setFormData({

        date: '',
        categories: '',
        hospitality: '',
        mainDish: [],
        mainDishRating: 1,
        sideDish: [],
        sideDishRating: 1,
        cleanliness: 1,
        sideDishComment: '',
        additionalComments: ''
      });
      
    } catch (error) {
      console.error('Error submitting feedback', error);
      alert('There was an error submitting your feedback.');
    }
  };



  // Options
  const mainDishes = ['APPAM- ஆப்பம்', 'PURI- பூரி', 'DOSA- தோசை', 'WHEAT DOSA- கோதுமை தோசை', 'IDLY- இட்லி', 'WHITE PONGAL- வெண் பொங்கல்'];
  const sideDishes = ['COCONUT MILK- தேங்காய் பால்', 'SAMBAR- சாம்பார்', 'KURUMA- குருமா', 'TOMATO CHUTNEY- தக்காளி சட்னி', 'COCONUT CHUTNEY- தேங்காய் சட்னி', 'VADAI- வடை'];
  const categories = ['SJJ STAFF', 'GUEST', 'ERECTOR/SERVICE ENGINEER', 'AUDITOR', 'OTHERS'];
  const hospitalityOptions = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];
  const cleanlinessOptions = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];


  return (
    <div className="container my-4 ">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h6 className="card-title mb-0 text-center fw-bold">BREAKFAST FEEDBACK FORM</h6>
        </div>
        <div className="card-body">
          {/* Display Current Date and Time in the desired format */}
          <h6 className="text-center fw-bold bg-light text-dark">{currentDateTime}</h6>
          <form onSubmit={handleSubmit}>

            {/*Category*/}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="/images/category.jpg" alt="Category" className="card-img-top" />
                <label className="form-label " style={{ fontSize: '0.9rem', marginBottom: '0.01rem', textTransform: "uppercase" }}><strong>VISTORS CATEGORY  </strong>   </label>
                {categories.map((category, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`category-${index}`}
                      name="categories"
                      value={category}
                      checked={formData.categories.includes(category)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`category-${index}`}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/*Hospility*/}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="/images/hospitality.jpg" alt="Hospitality" className="card-img-top" />
                <label className="form-label " style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }}><strong>HOW WAS THE SERVICE OF THE CATERERS? </strong>
                  <p className='mt-1' style={{ fontSize: '0.8rem' }}>உணவு பரிமாறுபவர்களின் விருந்தோம்பல் எவ்வாறு இருந்தது?</p>
                </label>

                {hospitalityOptions.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`hospitality-${option}`}
                      name="hospitality"
                      value={option}
                      checked={formData.hospitality === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`hospitality-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/*mainfood*/}
            <div className="card mb-3 border-secondary">

              <div className="card-body">
                <img src="/images/main_dish.jpg" alt="Main Dish" className="card-img-top" />
                <label className="form-label " style={{ fontSize: '0.9rem', marginBottom: '0.01rem', textTransform: "uppercase" }}><strong>What breakfast did you eat? ? </strong>
                  <p className='mt-1' style={{ fontSize: '0.9rem' }}>நீங்கள் சாப்பிட்ட காலை உணவு ?</p>
                </label>

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
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`mainDish-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/*mainfood RATING*/}
            <div className="card mb-3 border-secondary">

              <div className="card-body">
                <img src="/images/rating.jpg" alt="Side Dish Rating" className="card-img-top " />
                <label className="form-label " style={{ fontSize: '0.9rem', marginBottom: '0.01rem', textTransform: "uppercase" }}><strong>How was the taste of breakfast ? </strong>
                  <p className='mt-1' style={{ fontSize: '0.9rem' }}>காலை உணவின்  சுவை ( ஆப்பம்,  பூரி, தோசை,கோதுமை தோசை, இட்லி, வெண் பொங்கல்) எவ்வாறு இருந்தது? ?</p>
                </label>


                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${formData.mainDishRating >= star ? 'filled' : ''}`}
                      onClick={() => handleStarRating('main', star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/*sidedish */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="/images/side_dish.jpg" alt="Side Dish" className="card-img-top" />
                <label className="form-label " style={{ fontSize: '0.9rem', marginBottom: '0.01rem', textTransform: "uppercase" }}><strong>A side dish for breakfast? ? </strong>
                  <p className='mt-1' style={{ fontSize: '0.9rem' }}>காலை உணவின் பக்க உணவு ??</p>
                </label>

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
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`sideDish-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/*sidedish Taste */}
            <div className="card mb-3 border-secondary">
              <img src="/images/rating.jpg" alt="Side Dish Rating" className="card-img-top" />
              <div className="card-body">
                <label className="form-label " style={{ fontSize: '0.9rem', marginBottom: '0.01rem', textTransform: "uppercase" }}><strong>How was the taste of SIDE DISH ? </strong>
                  <p className='mt-1' style={{ fontSize: '0.9rem' }}>பக்க  உணவின்  சுவை (தேங்காய் பால், சாம்பார், குருமா, தக்காளி சட்னி, தேங்காய் சட்னி) எவ்வாறு இருந்தது?</p>
                </label>

                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${formData.sideDishRating >= star ? 'filled' : ''}`}
                      onClick={() => handleStarRating('side', star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/*Clean */}
            <div className="card mb-3 border-secondary">

              <div className="card-body">
                <img src="/images/cleanliness.jpg" alt="Cleanliness" className="card-img-top" />
                <label className="form-label " style={{ fontSize: '0.8rem', marginBottom: '0.01rem' }}><strong>HOW WAS THE CLEANLINESS OF THE EATING AREA? </strong>
                  <p className='mt-1' style={{ fontSize: '0.8rem' }}>உணவு உண்ணும் இடத்தில் சுத்தம் எவ்வாறு இருந்தது?</p>
                </label>

                {cleanlinessOptions.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`cleanliness-${option}`}
                      name="cleanliness"
                      value={option}
                      checked={formData.cleanliness === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`cleanliness-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/*Side Dish Commands */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <label htmlFor="sidedishComments" className="form-label " style={{ fontSize: '0.9rem', marginBottom: '0.01rem', textTransform: "uppercase" }}><strong>Side Dish Comment - Any specific feedback on the taste of the side dish ? </strong>
                  <p className='mt-1' style={{ fontSize: '0.8rem' }}>பக்க உணவின்  சுவையைப் பற்றி  (தேங்காய் பால், சாம்பார், குருமா, தக்காளி சட்னி, தேங்காய் சட்னி)  ஏதேனும் குறிப்பிட்ட கருத்து உள்ளதா?</p>
                </label>

                <textarea
                  className="form-control"
                  id="sideDishComment"
                  name="sideDishComment"
                  value={formData.sideDishComment}
                  onChange={handleChange}
                />
              </div>
            </div>
            

            {/*additinal Commands */}
            <div className="card mb-3 border-secondary">

              <div className="card-body">
                <img src="/images/additional_comments.jpg " alt="Additional Comments" className="card-img-top" />
                <label htmlFor="additionalComments" className="form-label " style={{ fontSize: '0.9rem', marginBottom: '0.01rem', textTransform: "uppercase" }}><strong>Please let us know your other improvement ideas and suggestions  </strong>
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
              <button type="submit" className="btn btn-success mt-3">Submit Feedback</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default BreakfastFeedbackForm;
