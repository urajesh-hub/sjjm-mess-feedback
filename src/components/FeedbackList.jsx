import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Adjust path as necessary
import { collection, getDocs } from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const mealTypes = {
    Breakfast: {
      label: 'Breakfast',
      collectionName: 'breakfastFeedback',
      columns: ['name', 'date', 'mealType', 'categories', 'hospitality', 'mainDish', 'mainDishRating', 'sideDish', 'sideDishRating', 'rice', 'gravy', 'kuttu', 'poriyal', 'rasam', 'more', 'payasam', 'appalam', 'cleanliness', 'sideDishComment', 'additionalComments', 'mutton']
    },
    Lunch: {
      label: 'Lunch',
      collectionName: 'lunchFeedback',
      columns: ['name', 'date', 'mealType', 'categories', 'hospitality', 'mainDish', 'mainDishRating', 'sideDish', 'sideDishRating', 'rice', 'gravy', 'kuttu', 'poriyal', 'rasam', 'more', 'payasam', 'appalam', 'cleanliness', 'sideDishComment', 'additionalComments', 'mutton']
    },
    Dinner: {
      label: 'Dinner',
      collectionName: 'dinnerFeedback',
      columns: ['name', 'date', 'mealType', 'categories', 'hospitality', 'mainDish', 'mainDishRating', 'sideDish', 'sideDishRating', 'rice', 'gravy', 'kuttu', 'poriyal', 'rasam', 'more', 'payasam', 'appalam', 'cleanliness', 'sideDishComment', 'additionalComments', 'mutton']
    },
    NonVegFeedback: {
      label: 'Non-Veg',
      collectionName: 'nonVegFeedback',
      columns: [ 'date', 'mealType', 'categories', 'hospitalityOptions', 'mutton','egg','chicken','rice',  'cleanlinessOptions',  'additionalComments' ]
    },
    LunchSatFeedbackForm: {
      label: 'Variety-Rise',
      collectionName: 'LunchSatFeedbackForm',
      columns: [ 'date', 'mealType', 'categories', 'hospitalityOptions', 'mutton','egg','chicken','rice',  'cleanlinessOptions',  'additionalComments' ]
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackCollection = collection(db, mealTypes[selectedMeal].collectionName);
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

  const handleDownloadExcel = () => {
    // Format data for Excel with dates as strings
    const feedbackData = feedbacks.map(feedback => {
      const formattedFeedback = { ...feedback };
      if (formattedFeedback.date && formattedFeedback.date.seconds) {
        formattedFeedback.date = new Date(formattedFeedback.date.seconds * 1000).toLocaleDateString();
      }
      return formattedFeedback;
    });

    const worksheet = XLSX.utils.json_to_sheet(feedbackData);
    const workbook = XLSX.utils.book_new();

    // Custom column width
    const columnWidths = mealTypes[selectedMeal].columns.map(() => ({ wch: 20 }));
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedbacks');
    XLSX.writeFile(workbook, `${selectedMeal}_Feedbacks.xlsx`);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = feedbacks.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(feedbacks.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="feedback-list container">
      <h3>{`${selectedMeal} Feedbacks`}</h3>

      <div className="mb-3">
        <label>Select Meal Type:</label>
        <select className="form-select" value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="NonVegFeedback">Non-Veg</option>
          <option value="LunchSatFeedbackForm">Variety-Rise</option>
        </select>
      </div>

      <button onClick={handleDownloadExcel} className="btn btn-success mb-3">Download to Excel</button>

      <table className="table table-bordered">
        <thead>
          <tr>
            {mealTypes[selectedMeal].columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(feedback => (
            <tr key={feedback.id}>
              {mealTypes[selectedMeal].columns.map(col => (
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



// // src/components/FeedbackList.js

// import React, { useEffect, useState } from 'react';
// import { db } from './firebaseConfig'; // Adjust path as necessary
// import { collection, getDocs } from 'firebase/firestore';
// import ReactPaginate from 'react-paginate';
// import * as XLSX from 'xlsx';

// const FeedbackList = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [selectedMeal, setSelectedMeal] = useState('All');
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 10;

//   // Mapping of meal types to Firebase collection names
//   const mealTypes = {
//     Breakfast: { label: 'Breakfast', collectionName: 'breakfastFeedback' },
//     Lunch: { label: 'Lunch', collectionName: 'lunchFeedback' },
//     Dinner: { label: 'Dinner', collectionName: 'dinnerFeedback' },
//     NonVegFeedback: { label: 'Non-Veg', collectionName: 'nonVegFeedback' }
    
//   };

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       let allFeedbacks = [];
  
//       if (selectedMeal === 'All') {
//         for (const mealKey in mealTypes) {
//           const feedbackCollection = collection(db, mealTypes[mealKey].collectionName);
//           const feedbackSnapshot = await getDocs(feedbackCollection);
//           allFeedbacks = allFeedbacks.concat(
//             feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), mealType: mealTypes[mealKey].label }))
//           );
//         }
//       } else {
//         const feedbackCollection = collection(db, mealTypes[selectedMeal].collectionName);
//         const feedbackSnapshot = await getDocs(feedbackCollection);
//         allFeedbacks = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), mealType: mealTypes[selectedMeal].label }));
//       }
//       setFeedbacks(allFeedbacks);
//     };
  
//     fetchFeedbacks();
//   }, [selectedMeal]);


//   // Function to handle Excel export
//   const handleDownloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(feedbacks);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedbacks');
//     XLSX.writeFile(workbook, `${selectedMeal}_Feedbacks.xlsx`);
//   };

//   // Pagination logic
//   const offset = currentPage * itemsPerPage;
//   const currentPageData = feedbacks.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(feedbacks.length / itemsPerPage);

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected);
//   };

//   return (
//     <div className="feedback-list container">
//       <h3>{selectedMeal === 'All' ? 'All Feedbacks' : `${selectedMeal} Feedbacks`}</h3>

//       {/* Meal Type Selector */}
//       <div className="mb-3">
//         <label>Select Meal Type:</label>
//         <select className="form-select" value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
//           <option value="All">All</option>
//           <option value="Breakfast">Breakfast</option>
//           <option value="Lunch">Lunch</option>
//           <option value="Dinner">Dinner</option>
//           <option value="NonVegFeedback">Non-Veg</option>          
//         </select>
//       </div>

//       {/* Excel Download Button */}
//       <button onClick={handleDownloadExcel} className="btn btn-success mb-3">Download to Excel</button>

//       {/* Feedback Table */}
//       <table className="table table-bordered ">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Meal Type</th>
//             <th>Category</th>
//             <th>Hospitality</th>
//             <th>Main Dish</th>
//             <th>Main Dish Rating</th>
//             <th>Side Dish</th>
//             <th>Side Dish Rating</th>
//             <th>Rice</th>
//             <th>Gravy</th>
//             <th>Kuttu</th>
//             <th>Poriyal</th>
//             <th>Rasam</th>
//             <th>More</th>
//             <th>Payasam</th>
//             <th>Appalam</th>
//             <th>Cleanliness</th>
//             <th>Side Dish Comments</th>
//             <th>Additional Comments</th>
//             <th>MUTTON</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentPageData.map(feedback => (
//             <tr key={feedback.id}>
//               <td>{feedback.name}</td>
//               <td style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//               <span>{feedback.date?.toDate().toLocaleDateString()}</span> {/* Displays date */}
//               <span>{feedback.date?.toDate().toLocaleTimeString()}</span> {/* Displays time */}
//             </td>
//               <td>{feedback.mealType}</td>
//               <td>{feedback.categories}</td>
//               <td>{feedback.hospitality}</td>
//               <td>{feedback.mainDish.join(', ')}</td>
//               <td>{feedback.mainDishRating}</td>
//               <td>{feedback.sideDish.join(', ')}</td>
//               <td>{feedback.sideDishRating}</td>
//               <td>{feedback.rice}</td>
//               <td>{feedback.gravy}</td>
//               <td>{feedback.kuttu}</td>
//               <td>{feedback.poriyal}</td>
//               <td>{feedback.rasam}</td>
//               <td>{feedback.more}</td>
//               <td>{feedback.payasam}</td>
//               <td>{feedback.appalam}</td>
//               <td>{feedback.cleanliness}</td>
//               <td>{feedback.sideDishComment}</td>
//               <td>{feedback.additionalComments}</td>
//               <td>{feedback.mutton}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <ReactPaginate
//         previousLabel={'Previous'}
//         nextLabel={'Next'}
//         breakLabel={'...'}
//         breakClassName={'break-me'}
//         pageCount={pageCount}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageClick}
//         containerClassName={'pagination justify-content-center'}
//         activeClassName={'active'}
//         pageClassName={'page-item'}
//         pageLinkClassName={'page-link'}
//         previousClassName={'page-item'}
//         previousLinkClassName={'page-link'}
//         nextClassName={'page-item'}
//         nextLinkClassName={'page-link'}
//       />
//     </div>
//   );
// };

// export default FeedbackList;
