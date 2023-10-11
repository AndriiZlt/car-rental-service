const getCars = state => state.cars;
const getFilter = state => state.cars.filter;
const getFilteredCars = state => state.cars.filteredCars;
const getFavoriteCars = state => state.cars.favoriteCars;
const getActivePage = state => state.cars.activePage;
const getModalOn = state => state.cars.isModalOn;
const getModalCar = state => state.cars.modalCar;

const carsSelectors = {
  getCars,
  getFilter,
  getFilteredCars,
  getFavoriteCars,
  getActivePage,
  getModalOn,
  getModalCar,
};

export default carsSelectors;
