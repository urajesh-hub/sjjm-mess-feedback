import React, { useState,useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './StarRating.css';

const DinnerFeedbackForm = () => {
  const [formData, setFormData] = useState({
    
    
    categories: [],
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
      await addDoc(collection(db, 'dinnerFeedback'), { ...formData, date: currentDate });
      alert('dinnerFeedback feedback submitted successfully');
      setFormData({
        name: '',
        date: '',
        categories: [],
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
  const mainDishes = ['சப்பாத்தி', 'அடை தோசை', 'தோசை', 'கோதுமை தோசை', 'இட்லி', ];
  const sideDishes = [ 'சாம்பார்', 'குருமா','தக்காளி சட்னி','தேங்காய் சட்னி'];
  const categories = ['SJJ- Staff', 'Guest', 'Erector/Service Engineer', 'Auditor', 'Others'];
  const hospitalityOptions = ['சுமார்', 'மோசம்', 'நன்று', 'அருமை'];
  const cleanlinessOptions = ['சுமார்', 'மோசம்', 'நன்று', 'அருமை'];

  return (
    <div className="container my-4 ">
      <div className="card">
        <div className="card-header bg-primary text-white">
        <h6 className="card-title mb-0 text-center fw-bold">DINNER FEEDBACK FORM</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Display Current Date and Time in the desired format */}
          <h6 className="text-center fw-bold bg-light text-dark">{currentDateTime}</h6>
            

           
            <div className="card mb-3 border-secondary">
            <img src="/images/category.jpg" alt="Category" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>3. Categories</strong></label>
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

            <div className="card mb-3 border-secondary">
            <img src="/images/hospitality.jpg" alt="Hospitality" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>4.  உணவு பரிமாறுபவர்களின் விருந்தோம்பல் எவ்வாறு இருந்தது? </strong></label>
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

            <div className="card mb-3 border-secondary">
            <img src="/images/main_dish.jpg" alt="Main Dish" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>5. நீங்கள் சாப்பிட்ட  இரவு  உணவு ?</strong> </label>
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
            </div>

            <div className="card mb-3 border-secondary">
            <img src="/images/rating.jpg" alt="Side Dish Rating" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>6. இரவு  உணவின்  சுவை ( சப்பாத்தி, தோசை,கோதுமை தோசை, அடை தோசை, இட்லி) எவ்வாறு இருந்தது?  </strong></label>
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

            <div className="card mb-3 border-secondary">
            <img src="/images/side_dish.jpg" alt="Side Dish" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>7. இரவு   உணவின் பக்க உணவு ?</strong></label>
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
            </div>

            <div className="card mb-3 border-secondary">
            <img src="/images/rating.jpg" alt="Side Dish Rating" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>8. பக்க  உணவின்  சுவை (சாம்பார், குருமா, தக்காளி சட்னி, தேங்காய் சட்னி) எவ்வாறு இருந்தது?</strong></label>
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

            <div className="card mb-3 border-secondary">
            <img src="/images/cleanliness.jpg" alt="Cleanliness" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>9. உணவு உண்ணும் இடத்தில் சுத்தம் எவ்வாறு இருந்தது?</strong></label>
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
                    <label className="form-check-label" htmlFor={`cleanliness-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <label htmlFor="sideDishComment" className="form-label"><strong>10. Side Dish Comment - Any specific feedback on the taste of the side dish (sambar, kuruma, tomato chutney, coconut chutney)?</strong></label>
                <p> பக்க உணவின்  சுவையைப் பற்றி   (சாம்பார், குருமா, தக்காளி சட்னி, தேங்காய் சட்னி)   ஏதேனும் குறிப்பிட்ட கருத்து உள்ளதா?</p>
                <textarea
                  className="form-control"
                  id="sideDishComment"
                  name="sideDishComment"
                  value={formData.sideDishComment}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="card mb-3 border-secondary">
            <img src="/images/additional_comments.jpg " alt="Additional Comments" className="card-img-top" />
              <div className="card-body">
                <label htmlFor="additionalComments" className="form-label"><strong>11. Please let us know your other improvement ideas and suggestions </strong></label>
                <p>உங்களது மற்ற முன்னேற்ற கருத்துக்கள் மற்றும் ஆலோசனைகளை எங்களுக்கு தெரியப்படுத்தவும்</p>
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

export default DinnerFeedbackForm;
