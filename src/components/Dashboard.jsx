// src/components/Dashboard.js

import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    breakfastCount: 0,
    lunchCount: 0,
    dinnerCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const mealTypes = {
        Breakfast: "breakfastFeedback",
        Lunch: "lunchFeedback",
        Dinner: "dinnerFeedback",
      };
      const updatedSummary = {
        breakfastCount: 0,
        lunchCount: 0,
        dinnerCount: 0,
      };

      for (const [mealType, collectionName] of Object.entries(mealTypes)) {
        const feedbackCollection = collection(db, collectionName);
        const feedbackSnapshot = await getDocs(feedbackCollection);

        // Set the count based on the length of fetched documents
        updatedSummary[`${mealType.toLowerCase()}Count`] =
          feedbackSnapshot.docs.length;
      }

      setSummary(updatedSummary);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard container my-4">
      <div className="card bg-light">
        <h6 className="text-center fw-bold bg-secondary text-white">
          DASHBOARD
        </h6>
        <p className="text-center text-success fw-bold">
          OVER VIEWS OF FEEDBACK ENTRIES
        </p>

        <div className="dashboard-cards d-flex justify-content-around flex-wrap">
          {/* Breakfast Summary */}
          <div className="m-2" style={{ width: "18rem" }}>
            <Link
              to="/feedback-list"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="card text-center"
                style={{ borderRadius: 10, overflow: "hidden" }}
              >
                <div className="card-body bg-danger text-white">
                  <h6 className="card-title">BREAKFAST</h6>
                  <p className="card-text fw-bold">
                    TOTAL FEEDBACKS: {summary.breakfastCount}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Lunch Summary */}
          <div className="m-2" style={{ width: "18rem" }}>
            <Link
              to="/feedback-list"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="card text-center"
                style={{ borderRadius: 10, overflow: "hidden" }}
              >
                <div className="card-body bg-success text-white">
                  <h6 className="card-title">LUNCH</h6>
                  <p className="card-text fw-bold">
                    TOTAL FEEDBACKS: {summary.lunchCount}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Dinner Summary */}
          <div className="m-2" style={{ width: "18rem" }}>
            <Link
              to="/feedback-list"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="card text-center"
                style={{ borderRadius: 10, overflow: "hidden" }}
              >
                <div className="card-body bg-primary text-white">
                  <h6 className="card-title">DINNER</h6>
                  <p className="card-text fw-bold">
                    TOTAL FEEDBACKS: {summary.dinnerCount}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <Link to="/feedback-form">
            <button className="btn btn-warning fw-bold me-2 mt-2 mb-2">
              GO TO FEEDBACK FORM
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
