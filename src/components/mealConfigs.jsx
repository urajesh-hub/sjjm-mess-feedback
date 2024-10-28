// src/components/mealConfigs.js

export const breakfastMealType = {
    label: 'Breakfast',
    collectionName: 'breakfastFeedback', // Firestore collection name
    options: {
      mainDishes: ['Pancakes', 'Omelette', 'Fruit Salad'], // Main dishes for breakfast
      sideDishes: ['Toast', 'Yogurt', 'Bacon'], // Side dishes for breakfast
    }
  };
  
  export const lunchMealType = {
    label: 'Lunch',
    collectionName: 'lunchFeedback', // Firestore collection name
    options: {
      mainDishes: ['Pasta', 'Chicken', 'Salad'], // Main dishes for lunch
      sideDishes: ['Fries', 'Rice', 'Vegetables'], // Side dishes for lunch
    }
  };
  
  export const dinnerMealType = {
    label: 'Dinner',
    collectionName: 'dinnerFeedback', // Firestore collection name
    options: {
      mainDishes: ['Steak', 'Fish', 'Vegetable Stir Fry'], // Main dishes for dinner
      sideDishes: ['Mashed Potatoes', 'Salad', 'Steamed Veggies'], // Side dishes for dinner
    }
  };
  
  export const formOptions = {
    categories: ['Appetizer', 'Main Course', 'Dessert'], // Add more categories as needed
  };
  