// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://6520f3caa4199548356ca9b5.mockapi.io';

const fetchCars = createAsyncThunk('cars/getCars', async () => {
  console.log('Fetching cars');
  try {
    const response = await fetch(
      'https://6520f3caa4199548356ca9b5.mockapi.io/advert',
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.log('Error in Register', error.response.data);
    throw error();
  }
});

const carsOperations = {
  fetchCars,
};

export default carsOperations;
