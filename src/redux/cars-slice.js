import { createSlice } from '@reduxjs/toolkit';
import carsOperations from './cars-operations';

const initialState = {
  cars: [],
  filter: {
    brandStore: '',
    priceStore: '',
    fromStore: '',
    toStore: '',
  },
  filteredCars: [],
  favoriteCars: [],
  activePage: 'home',
  isModalOn: false,
  modalCar: '',
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilteredCars(state, action) {
      state.filteredCars = [...action.payload];
    },
    clearFilter(state, _) {
      state.filter = initialState.filter;
    },
    addFavorite(state, action) {
      const favorites = [...state.favoriteCars];
      if (favorites.indexOf(action.payload) > -1) {
        favorites.splice(favorites.indexOf(action.payload), 1);
        state.favoriteCars = [...favorites];
      } else {
        state.favoriteCars = [...state.favoriteCars, action.payload];
      }
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    setModal(state, action) {
      state.isModalOn = action.payload;
    },
    setModalCar(state, action) {
      state.modalCar = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(carsOperations.fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload;
    });
  },
});

export const {
  setFilter,
  setFilteredCars,
  clearFilter,
  addFavorite,
  setActivePage,
  setModal,
  setModalCar,
} = carsSlice.actions;
