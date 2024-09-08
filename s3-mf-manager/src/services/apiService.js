// src/services/apiService.js

const API_URL = 'https://cxdt2lrhdb.execute-api.us-east-2.amazonaws.com/desarrollo/typeproduct/locations';

export const fetchSedes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sedes:', error);
    throw error;
  }
};
