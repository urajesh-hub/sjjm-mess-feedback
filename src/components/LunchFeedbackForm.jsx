import React, { useState,useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './StarRating.css';

const LunchFeedbackForm = () => {
  const [formData, setFormData] = useState({
   
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
      await addDoc(collection(db, 'lunchFeedback'), { ...formData, date: currentDate });
      alert('lunchFeedback feedback submitted successfully');
      setFormData({
        
        date: '',
        categories: [],
        hospitality: '',
        rice: [],
        gravy: [],
        kuttu: [],
        poriyal: [],
        rasam: [],
        more: [],
        payasam: [],
        appalam: [],
        lunch: [],
        cleanliness: [],
        additionalComments: ''
      });
    } catch (error) {
      console.error('Error submitting feedback', error);
      alert('There was an error submitting your feedback.');
    }
  };

  // Options
  const categories = ['COMPANY STAFF', 'GUEST', 'ERECTOR/SERVICE ENGINEER', 'AUDITOR', 'OTHERS'];
  const hospitalityOptions = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];
  const rice = ['THE RICE WAS GOOD- சாதம் நன்றாக இருந்தது', 'NOT COOKED PROPERLY-சரியாக வேகவில்லை', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'THE RICE IS SPOILED - சாதம் குலைந்துவிட்டது'];
  const gravy = ['IT WAS AVERAGE- சுமாராக இருந்தது', 'TOO SPICY-காரம் அதிகம்', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'GOOD - நன்றாக இருந்தது'];
  const kuttu = ['AVERAGE- சுமாராக இருந்தது', 'SMELLED SPICY/TOO SPICY- மசால் வாசம் வந்தது/ காரம் அதிகம்', 'HIGH/LOW SALT- உப்பு அதிகம்/குறைவு', 'GOOD- நன்றாக இருந்தது'];
  const poriyal = ['AVERAGE- சுமாராக இருந்தது', 'HIGH/LOW SALT- உப்பு அதிகம்/குறைவு', 'EXCESS COCONUT -தேங்காய் கலவை அதிகம்', 'GOOD -நன்றாக இருந்தது']
  const rasam =  ['IT WAS AVERAGE- சுமாராக இருந்தது', 'TOO SPICY-காரம் அதிகம்', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'GOOD - நன்றாக இருந்தது']
  const more = ['IT WAS AVERAGE- சுமாராக இருந்தது', 'TOO SOUR-புளிப்பு  அதிகம் ', 'HIGH/LOW SALT - உப்பு அதிகம்/குறைவு', 'GOOD - நன்றாக இருந்தது'];

  const payasam = ['GOOD- நன்றாக இருந்தது', 'AVERAGE-சுமாராக இருந்தது', 'TODAY NIL- இன்று பாயசம் கேன்டீனில் வைக்கவில்லை']
  const appalam = ['LOT OF OIL- எண்ணெய் அதிகம்', 'NOT FRIED WELL- நன்றாக வறுக்கவில்லை', 'AVERAGE- சுமாராக இருந்தது ', 'GOOD- நன்றாக இருந்தது']
  const lunch = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];
  const cleanlinessOptions = ['AVERAGE - சுமார்', 'POOR - மோசம்', 'GOOD - நன்று', 'EXCELLENT - அருமை'];

  return (
    <div className="container my-4 ">
      <div className="card">
        <div className="card-header bg-primary text-white">
        <h6 className="card-title mb-0 text-center fw-bold">LUNCH FEEDBACK FORM</h6>
        </div>
        <div className="card-body">
          {/* Display Current Date and Time in the desired format */}
          <h6 className="text-center fw-bold bg-light text-dark">{currentDateTime}</h6>

          <form onSubmit={handleSubmit}>

            {/* Date */}
{/* 
            <div className="card mb-3 border-secondary">
              <div className="card-body">
                <label htmlFor="date" className="form-label"><strong>2. Date</strong></label>

                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div> */}

            {/* category */}
            <div className="card mb-3 border-secondary">
             
              <div className="card-body">
              <img src="/images/category.jpg" alt="Category" className="card-img-top" />
                
                <label className="form-label " style={{ fontSize: '0.9rem',marginBottom: '0.01rem',textTransform: "uppercase" }}><strong>VISTORS CATEGORY  </strong>   </label> 
              
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

            {/* Hospitality */}
            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/hospitality.jpg" alt="Hospitality" className="card-img-top" />
                <label className="form-label " style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }}><strong>HOW WAS THE SERVICE OF THE CATERERS? </strong>  
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

            {/* Rising */}
            <div className="card mb-3 border-secondary">
              <img src="/images/rice.jpg" alt="rice" className="card-img-top" />
              <div className="card-body">
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the rice ? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>அரிசி சாதம் எவ்வாறு இருந்தது?</p> 
                </label>
                
                {rice.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`rice-${option}`}
                      name="rice"
                      value={option}
                      checked={formData.rice === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label"style={{ fontSize: '0.9rem',marginBottom: '0.01rem' }} htmlFor={`rice-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
             {/*  Gravey */}
            <div className="card mb-3 border-secondary">
             
             <div className="card-body">
              <img src="/images/gravy.jpg" alt="rice" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the taste of the GRAVY? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>குழம்பின் சுவை எவ்வாறு இருந்தது?</p> 
                </label>
                
                {gravy.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`gravy-${option}`}
                      name="gravy"
                      value={option}
                      checked={formData.gravy === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`gravy-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/*  Kuttu */}
            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/kuttu.jpg" alt="rice" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How did the veggie combo taste ? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>காய்கறி கூட்டின் சுவை எவ்வாறு இருந்தது?</p> 
                </label>
                
                {kuttu.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`kuttu-${option}`}
                      name="kuttu"
                      value={option}
                      checked={formData.kuttu === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`kuttu-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
             {/*  Poriyal */}
            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/poriyal.jpg" alt="rice" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How did the veggie fries taste? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>காய்கறி  பொரியலின்  சுவை எவ்வாறு இருந்தது?</p> 
                </label>
                <label className="form-label"><strong> </strong></label>
                {poriyal.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`poriyal-${option}`}
                      name="poriyal"
                      value={option}
                      checked={formData.poriyal === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`poriyal-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/*  Rasam */}      
            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/rasam.jpg" alt="rice" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the taste of the gravy(rasam) </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>ரசத்தின் சுவை எவ்வாறு இருந்தது?</p> 
                </label>
                
                {rasam.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`rasam-${option}`}
                      name="rasam"
                      value={option}
                      checked={formData.rasam === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`rasam-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/*  More */}
            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/more.jpg" alt="more" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the taste of the buttermilk gravy </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>மோர் / மோர்க்குழம்பின் சுவை எவ்வாறு இருந்தது?</p> 
                </label>
                               
                {more.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`more-${option}`}
                      name="more"
                      value={option}
                      checked={formData.more === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`more-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/*  Payasam */}

            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/payasam.jpg" alt="payasam" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the taste of the payasam? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>பாயாசத்தின் சுவை எவ்வாறு இருந்தது?</p> 
                </label>
                
                {payasam.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`payasam-${option}`}
                      name="payasam"
                      value={option}
                      checked={formData.payasam === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`payasam-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/*  Appalam */}
            <div className="card mb-3 border-secondary">
                       
              <div className="card-body">
              <img src="/images/appalam.jpg" alt="appalam" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the waffle? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>அப்பளம் எவ்வாறு இருந்தது?</p> 
                </label>
                
                {appalam.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`appalam-${option}`}
                      name="appalam"
                      value={option}
                      checked={formData.appalam === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`appalam-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/*  lunch */}
            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/lunch.jpg" alt="lunch" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the overall taste of the lunch? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>மதிய உணவின் ஒட்டுமொத்த சுவை எவ்வாறு இருந்தது?</p> 
                </label>
               
                {lunch.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`lunch-${option}`}
                      name="lunch"
                      value={option}
                      checked={formData.lunch === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`lunch-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            

            {/*  Clean */}

            <div className="card mb-3 border-secondary">
             
              <div className="card-body">
              <img src="/images/cleanliness.jpg" alt="Cleanliness" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>How was the cleanliness of the eating area? </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>உணவு உண்ணும் இடத்தில் சுத்தம் எவ்வாறு இருந்தது?</p> 
                </label>
                
                {cleanlinessOptions.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`cleanlinessOptions-${option}`}
                      name="cleanlinessOptions"
                      value={option}
                      checked={formData.cleanlinessOptions === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`cleanlinessOptions-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-3 border-secondary">
              
              <div className="card-body">
              <img src="/images/additional_comments.jpg " alt="Additional Comments" className="card-img-top" />
              <label className="form-label " style={{ textTransform: "uppercase" }}><strong>Please let us know your other improvement ideas and suggestions </strong>  
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>உங்களது மற்ற முன்னேற்ற கருத்துக்கள் மற்றும் ஆலோசனைகளை எங்களுக்கு தெரியப்படுத்தவும்</p> 
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

export default LunchFeedbackForm;
