// src/components/FormInputs.js

import React from 'react';
import { formOptions } from './mealConfigs';

const FormInputs = ({ formData, setFormData, options }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select className="form-select" id="category" name="category" value={formData.category} onChange={handleInputChange} required>
          <option value="">Select Category</option>
          {formOptions.categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="hospitality" className="form-label">Hospitality Rating</label>
        <input type="number" className="form-control" id="hospitality" name="hospitality" value={formData.hospitality} onChange={handleInputChange} min="1" max="5" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Main Dish</label>
        <select multiple className="form-select" name="mainDish" value={formData.mainDish} onChange={(e) => handleInputChange({ target: { name: 'mainDish', value: Array.from(e.target.selectedOptions, option => option.value) } })}>
          {options.mainDishes.map((dish, index) => (
            <option key={index} value={dish}>{dish}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="mainDishRating" className="form-label">Main Dish Rating</label>
        <input type="number" className="form-control" id="mainDishRating" name="mainDishRating" value={formData.mainDishRating} onChange={handleInputChange} min="1" max="5" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Side Dish</label>
        <select multiple className="form-select" name="sideDish" value={formData.sideDish} onChange={(e) => handleInputChange({ target: { name: 'sideDish', value: Array.from(e.target.selectedOptions, option => option.value) } })}>
          {options.sideDishes.map((dish, index) => (
            <option key={index} value={dish}>{dish}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="sideDishRating" className="form-label">Side Dish Rating</label>
        <input type="number" className="form-control" id="sideDishRating" name="sideDishRating" value={formData.sideDishRating} onChange={handleInputChange} min="1" max="5" required />
      </div>
      <div className="mb-3">
        <label htmlFor="cleanliness" className="form-label">Cleanliness Rating</label>
        <input type="number" className="form-control" id="cleanliness" name="cleanliness" value={formData.cleanliness} onChange={handleInputChange} min="1" max="5" required />
      </div>
      <div className="mb-3">
        <label htmlFor="sideDishComment" className="form-label">Side Dish Comment</label>
        <textarea className="form-control" id="sideDishComment" name="sideDishComment" value={formData.sideDishComment} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="additionalComments" className="form-label">Additional Comments</label>
        <textarea className="form-control" id="additionalComments" name="additionalComments" value={formData.additionalComments} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default FormInputs;
