import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Adjust path as necessary
import { collection, getDocs } from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx'; // Import the xlsx library

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const mealTypes = {
    Breakfast: {
      label: 'Breakfast',
      collectionName: 'breakfastFeedback',
      columns: ['date', 'mealType', 'categories', 'hospitality', 'mainDish', 'mainDishRating', 'sideDish', 'sideDishRating', 'cleanliness', 'sideDishComment', 'additionalComments'],
      customColumnNames: ['DATE', 'MEALTYPE', 'CATEGORIES', 'CATERER SERVICE', 'MAIN DISH', 'MAIN DISH RATING', 'SIDE DISH', 'SIDE DISH RATING', 'CLEAN RATING', 'SIDE DISH COMMENT', 'ADDITIONAL FEEDBACK']
    },
    Lunch: {
      label: 'Lunch',
      collectionName: 'lunchFeedback',
      columns: ['date', 'mealType', 'categories', 'hospitality', 'rice', 'gravy', 'kuttu', 'poriyal', 'rasam', 'more', 'payasam', 'appalam', 'lunch', 'cleanlinessOptions',  'additionalComments'],
      customColumnNames: ['Date', 'MEALTYPE', 'CATEGORIES', 'CATERER SERVICE', 'RICE','GRAVY', 'KUTTU', 'PORIYAL', 'RASAM', 'MOOR', 'PAYASAM', 'APPALAM', 'OVERALL LUNCH', 'CLEAN RATING',  'ADDITIONAL FEEDBACK']
    },
    Dinner: {
      label: 'Dinner',
      collectionName: 'dinnerFeedback',
      columns: ['date', 'mealType', 'categories', 'hospitality', 'mainDish', 'mainDishRating', 'sideDish', 'sideDishRating',  'cleanliness', 'sideDishComment', 'additionalComments'],
      customColumnNames: ['DATE', 'MEALTYPE', 'CATEGORIES', 'CATERER SERVICE', 'DINNER', 'DINNER RATING', 'SIDE DISH', 'SIDE DISH RATING', 'CLEAN RATING', 'SIDE DISH COMMENT', 'ADDITIONAL FEEDBACK']
    },
    NonVegFeedback: {
      label: 'Non-Veg',
      collectionName: 'nonVegFeedback',
      columns: ['date','mealType', 'categories', 'hospitalityOptions', 'mutton', 'rice', 'cleanlinessOptions', 'additionalComments'],
      customColumnNames: ['DATE','MEALTYPE', 'CATEGORIES', 'CATERER SERVICE', 'NON-VEG GRAVY', 'RICE', 'CLEAN RATING', 'ADDITIONAL FEEDBACK']
    },
    LunchSatFeedbackForm: {
      label: 'Variety-Rice',
      collectionName: 'LunchSatFeedbackForm',
      columns: ['date', 'mealType', 'categories', 'hospitalityOptions', 'brinji', 'rice', 'rating', 'KURUMA', 'cleanlinessOptions', 'additionalComments'],
      customColumnNames: ['DATE', 'MEALTYPE', 'CATEGORIES', 'CATERER SERVICE', 'BRINJI', 'RICE', 'RATING', 'KURUMA', 'CLEAN RATING', 'ADDITIONAL FEEDBACK']
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const selectedMealType = mealTypes[selectedMeal];
        if (!selectedMealType) return; // Exit if selectedMeal is invalid

        const feedbackCollection = collection(db, selectedMealType.collectionName);
        const feedbackSnapshot = await getDocs(feedbackCollection);

        const feedbackData = feedbackSnapshot.docs.map(doc => {
          const data = doc.data();
          // Format date fields for display
          if (data.date && data.date.seconds) {
            data.date = new Date(data.date.seconds * 1000).toLocaleDateString();
          }
          return { id: doc.id, ...data };
        });

        setFeedbacks(feedbackData);
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    };

    fetchFeedbacks();
  }, [selectedMeal]);

  const offset = currentPage * itemsPerPage;
  const currentPageData = feedbacks.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(feedbacks.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const downloadExcel = () => {
    // Map the current page data to include all necessary fields
    const worksheetData = currentPageData.map(feedback => {
      const mappedFeedback = {};
      mealTypes[selectedMeal]?.columns.forEach((col, index) => {
        // Check if the category exists in the feedback
        const value = feedback[col] !== undefined ? feedback[col] : 'N/A';
        mappedFeedback[mealTypes[selectedMeal].customColumnNames[index]] = value;
  
        // Debugging: Log to check if categories are being fetched
        console.log(`Mapping column ${col}:`, value);
      });
      return mappedFeedback;
    });
  
    // Check the worksheet data
    console.log('Worksheet Data for Excel:', worksheetData);
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${selectedMeal} Feedbacks`);
  
    // Set print settings for A3 landscape
    worksheet['!print'] = {
      orientation: 'landscape',
      size: 'A3'
    };
  
    // Download the Excel file
    XLSX.writeFile(workbook, `${selectedMeal}_Feedbacks.xlsx`);
  };
  
  return (
    <div className="feedback-list container">
      <h4 className='text-center'>{`${selectedMeal} Feedbacks`}</h4>

      <div className="mb-3 d-flex gap-2">
        {Object.keys(mealTypes).map((meal) => (
          <button 
            key={meal} 
            className={`btn btn-sm ${selectedMeal === meal ? 'btn-primary' : 'btn-outline-primary'}`} 
            onClick={() => setSelectedMeal(meal)}
          >
            {mealTypes[meal].label}
          </button>
        ))}
      </div>

      {/* Download Button */}
      <button className="btn btn-success mb-3" onClick={downloadExcel}>
        Download as Excel
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            {mealTypes[selectedMeal]?.customColumnNames.map((colName, index) => (
              <th key={index}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(feedback => (
            <tr key={feedback.id}>
              {mealTypes[selectedMeal]?.columns.map(col => (
                <td key={col}>
                  {col === 'date' 
                    ? feedback.date || 'N/A'
                    : feedback[col] !== undefined ? feedback[col] : 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default FeedbackList;
