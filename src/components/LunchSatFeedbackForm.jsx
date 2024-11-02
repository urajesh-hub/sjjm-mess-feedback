import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './StarRating.css';

const LunchSatFeedbackForm = () => {
  const [formData, setFormData] = useState({
    mealType: 'Variety-Rice' ,
    categories: '',
    brinji: [],
    rice: [],
    KURUMA: [],
    rating: [],
    hospitalityOptions:[], 
    cleanlinessOptions: '',
    additionalComments: ''
  });

  const [currentDateTime, setCurrentDateTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const formatDateTime = () => {
      const date = new Date();
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const day = dayNames[date.getDay()];
      const dayFormatted = String(date.getDate()).padStart(2, '0');
      const monthFormatted = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hoursFormatted = String(date.getHours()).padStart(2, '0');
      const minutesFormatted = String(date.getMinutes()).padStart(2, '0');
      const secondsFormatted = String(date.getSeconds()).padStart(2, '0');

      return `${dayFormatted}-${monthFormatted}-${year} ${hoursFormatted}:${minutesFormatted}:${secondsFormatted} ${day}`;
    };

    setCurrentDateTime(formatDateTime());
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'brinji' || name === 'rice' || name === 'KURUMA' || name === 'rating') {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       [name]: prevState[name].includes(value)
  //         ? prevState[name].filter(item => item !== value)
  //         : [...prevState[name], value]
  //     }));
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      await addDoc(collection(db, 'LunchSatFeedbackForm'), { ...formData, date: currentDate });
      alert('Thank You- Feedback Fubmitted Successfully');
      setFormData({
        categories: '',
        brinji: [],
        rice: [],
        KURUMA: [],
        rating: [],
        hospitalityOptions: '',
        cleanlinessOptions: '',
        additionalComments: ''
      });
      navigate('/');
    } catch (error) {
      console.error('Error submitting feedback', error);
      alert('There was an error submitting your feedback.');
    }
  };

  const categories = ['SJJ STAFF', 'GUEST', 'ERECTOR/SERVICE ENGINEER', 'AUDITOR', 'OTHERS'];
  const hospitalityOptions = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];
  const brinji = ['IT WAS AVERAGE- சுமாராக இருந்தது', 'TOO SPICY-காரம் அதிகம்', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'GOOD - நன்றாக இருந்தது'];
  const rice = ['VEGETABLE BRIYANI- காய்கறி பிரியாணி', 'TAMARIND- புளியோதரை', 'LEMON RICE- லெமன் சாதம்', 'TOMATO RICE- தக்காளி சாதம்', 'CURD RICE- தயிர் சாதம்'];
  const rating = ['THE RICE WAS GOOD- சாதம் நன்றாக இருந்தது', 'NOT COOKED PROPERLY-சரியாக வேகவில்லை', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'TOO SPICY-காரம் அதிகம்'];
  const KURUMA = ['IT WAS AVERAGE- சுமாராக இருந்தது', 'TOO SPICY-காரம் அதிகம்', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'GOOD - நன்றாக இருந்தது'];
  const cleanlinessOptions = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header bg-primary bg-opacity-25">
          <h6 className="card-title mb-0 text-center fw-bold">SATURDAY LUNCH FEEDBACK FORM</h6>
        </div>
        <div className="card-body">
          <h6 className="text-center fw-bold text-primary">{currentDateTime}</h6>
          <form onSubmit={handleSubmit}>
            {/* Category */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="/images/non-veg/non-category.jpg" alt="category" className="card-img-top mb-2" />
                <label className="form-label" style={{ textTransform: "uppercase" }}><strong>VISITORS CATEGORY</strong></label>
                {categories.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`categories-${dish}`}
                      name="categories"
                      value={dish}
                      checked={formData.categories === dish}
                      onChange={handleChange} required
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`categories-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospitality Ratings */}
            <div className="card mb-2">
              <div className="card-body">
                <img src="/images/non-veg/non-veg-service.jpg" alt="Hospitality" className="card-img-top mb-2" style={{ border: "1px solid #e9f1f7" }} />
                <label className="form-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }}><strong>HOW WAS THE SERVICE OF THE CATERERS?</strong></label>
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>உணவு வழங்குபவர்களின் சேவை எப்படி இருந்தது?</p> 
                {hospitalityOptions.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`hospitalityOptions-${option}`}
                      name="hospitalityOptions"
                      value={option}
                      checked={formData.hospitalityOptions === option}
                      onChange={handleChange} required
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`hospitalityOptions-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* brinji */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="images/prince.jpg" alt="prince" className="card-img-top mb-2" />
                <label className="form-label" style={{ textTransform: "uppercase" }}><strong>How did BRINJI FOOD taste?</strong></label>
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>பிரின்ஸ் உணவு சுவை எப்படி இருந்தது?</p> 
                {brinji.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`brinji-${dish}`}
                      name="brinji"
                      value={dish}
                      checked={formData.brinji.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`brinji-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rising */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="/images/satlunch.jpg" alt="Rising" className="card-img-top mb-2" />
                <label className="form-label" style={{ textTransform: "uppercase" }}><strong>What additional lunch did you eat?</strong></label>
                <p className='' style={{ fontSize: '0.9rem' }}>நீங்கள் சாப்பிட்ட கூடுதல் மதிய உணவு?</p> 
                {rice.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`rice-${dish}`}
                      name="rice"
                      value={dish}
                      checked={formData.rice.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`rice-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="/images/sat-feedback.jpg" alt="Rating" className="card-img-top mb-2" />
                <label className="form-label" style={{ textTransform: "uppercase" }}><strong>How did the additional food  taste?</strong></label>
                <p className='' style={{ fontSize: '0.9rem' }}>கூடுதல் மதிய  உணவின் சுவை எவ்வாறு இருந்தது?</p> 
                {rating.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`rating-${dish}`}
                      name="rating"
                      value={dish}
                      checked={formData.rating.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`rating-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Kuruma */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="/images/kuruma.jpg" alt="Kuruma" className="card-img-top mb-2" />
                <label className="form-label" style={{ textTransform: "uppercase" }}><strong>how was the (kuruma ,chutney) you eat? </strong></label>
                <p className='' style={{ fontSize: '0.9rem' }}>நீங்கள் சாப்பிட்ட (குருமா, சட்னி) சுவை எப்படி இருந்தது?</p> 
                {KURUMA.map((dish, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`KURUMA-${dish}`}
                      name="KURUMA"
                      value={dish}
                      checked={formData.KURUMA.includes(dish)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`KURUMA-${dish}`}>
                      {dish}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            

            {/* Cleanliness */}
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <img src="/images/cleanliness.jpg" alt="Cleanliness" className="card-img-top mb-2" />
                <label className="form-label" style={{ textTransform: "uppercase" }}><strong>HOW WAS THE CLEANLINESS OF THE EATING AREA?</strong></label>
                <p className='' style={{ fontSize: '0.9rem' }}>உணவு உண்ணும் இடத்தில் சுத்தம் எவ்வாறு இருந்தது?</p> 
                {cleanlinessOptions.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`cleanlinessOptions-${option}`}
                      name="cleanlinessOptions"
                      value={option}
                      checked={formData.cleanlinessOptions === option}
                      onChange={handleChange} required
                    />
                    <label className="form-check-label" style={{ fontSize: '0.9rem', marginBottom: '0.01rem' }} htmlFor={`cleanlinessOptions-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
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
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LunchSatFeedbackForm;
