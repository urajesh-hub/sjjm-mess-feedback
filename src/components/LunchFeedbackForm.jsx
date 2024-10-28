import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './StarRating.css';

const LunchFeedbackForm = () => {
  const [formData, setFormData] = useState({
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
      await addDoc(collection(db, 'lunchFeedback'), { ...formData, date: new Date(formData.date) });
      alert('lunchFeedback feedback submitted successfully');
      setFormData({
        name: '',
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
  const categories = ['SJJ- Staff', 'Guest', 'Erector/Service Engineer', 'Auditor', 'Others'];
  const hospitalityOptions = ['சுமார்', 'மோசம்', 'நன்று', 'அருமை'];
  const rice = ['சாதம் நன்றாக இருந்தது', 'சரியாக வேகவில்லை', 'உப்பு அதிகம்/குறைவு', 'சாதம் குலைந்துவிட்டது'];
  const gravy = ['சுமாராக இருந்தது', 'காரம் அதிகம்', 'உப்பு அதிகம்/குறைவு', 'நன்றாக இருந்தது'];
  const kuttu = ['சுமாராக இருந்தது', 'மசால் வாசம் வந்தது/ காரம் அதிகம்', 'உப்பு அதிகம்/குறைவு', 'நன்றாக இருந்தது'];
  const poriyal = ['சுமாராக இருந்தது', 'உப்பு அதிகம்/குறைவு', 'தேங்காய் கலவை அதிகம்', 'நன்றாக இருந்தது']
  const rasam = ['சுமாராக இருந்தது', 'உப்பு அதிகம்/குறைவு', 'காரம் அதிகம்', 'நன்றாக இருந்தது']
  const more = ['சுமாராக இருந்தது', 'உப்பு அதிகம்/குறைவு', 'காரம் அதிகம்', 'நன்றாக இருந்தது'];

  const payasam = ['நன்றாக இருந்தது', 'சுமாராக இருந்தது', 'இன்று பாயசம் கேன்டீனில் வைக்கவில்லை']
  const appalam = ['எண்ணெய் அதிகம்', 'நன்றாக வறுக்கவில்லை', 'நன்றாக இருந்தது', 'சுமாராக இருந்தது']
  const lunch = ['சுமார்', 'மோசம்', 'நன்று', 'அருமை'];
  const cleanlinessOptions = ['சுமார்', 'மோசம்', 'நன்று', 'அருமை'];

  return (
    <div className="container my-4 ">
      <div className="card">
        <div className="card-header bg-primary text-white">
        <h6 className="card-title mb-0 text-center fw-bold">LUNCH FEEDBACK FORM</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="card mb-3 border-secondary">
              <div className="card-body">

                <label className="form-label"><strong>1. Name</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
            </div>

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
              <img src="/images/rice.jpg" alt="rice" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>5. அரிசி சாதம்  எவ்வாறு இருந்தது?  </strong></label>
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
                    <label className="form-check-label" htmlFor={`rice-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-3 border-secondary">
              <img src="/images/gravy.jpg" alt="rice" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>6. குழம்பின் சுவை எவ்வாறு இருந்தது?  </strong></label>
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

            <div className="card mb-3 border-secondary">
              <img src="/images/kuttu.jpg" alt="rice" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>7. காய்கறி கூட்டின் சுவை எவ்வாறு இருந்தது?  </strong></label>
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

            <div className="card mb-3 border-secondary">
              <img src="/images/poriyal.jpg" alt="rice" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>8.காய்கறி  பொரியலின்  சுவை எவ்வாறு இருந்தது? </strong></label>
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

            <div className="card mb-3 border-secondary">
              <img src="/images/rasam.jpg" alt="rice" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>9.ரசத்தின் சுவை எவ்வாறு இருந்தது? </strong></label>
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

            <div className="card mb-3 border-secondary">
              <img src="/images/more.jpg" alt="more" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>10.மோர் / மோர்க்குழம்பின் சுவை எவ்வாறு இருந்தது? </strong></label>
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

            <div className="card mb-3 border-secondary">
              <img src="/images/payasam.jpg" alt="payasam" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>11. பாயாசத்தின் சுவை எவ்வாறு இருந்தது? </strong></label>
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

            <div className="card mb-3 border-secondary">
              <img src="/images/appalam.jpg" alt="appalam" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>12. அப்பளம் எவ்வாறு இருந்தது? </strong></label>
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

            <div className="card mb-3 border-secondary">
              <img src="/images/lunch.jpg" alt="lunch" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>13. மதிய உணவின் ஒட்டுமொத்த சுவை எவ்வாறு இருந்தது? </strong></label>
                {lunch.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`lunch-${option}`}
                      name="lunch"
                      value={option}
                      checked={formData.payasam === option}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`lunch-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>





            <div className="card mb-3 border-secondary">
              <img src="/images/cleanliness.jpg" alt="Cleanliness" className="card-img-top" />
              <div className="card-body">
                <label className="form-label"><strong>15. உணவு உண்ணும் இடத்தில் சுத்தம் எவ்வாறு இருந்தது?</strong></label>
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



            <div className="card mb-3 border-secondary">
              <img src="/images/additional_comments.jpg " alt="Additional Comments" className="card-img-top" />
              <div className="card-body">
                <label htmlFor="additionalComments" className="form-label"><strong>15. Please let us know your other improvement ideas and suggestions </strong></label>
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

export default LunchFeedbackForm;
