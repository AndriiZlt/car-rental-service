const filterCars = (cars, filteredModels, brand, priceNum, fromNum, toNum) => {
  //   console.log(cars, filteredModels, brand, priceNum, fromNum, toNum);
  let modelFiltered = [];

  if (filteredModels.indexOf(brand) > -1) {
    modelFiltered = cars.filter(car => car.make === brand);
  } else {
    modelFiltered = cars.filter(car => filteredModels.includes(car.make));
  }

  const priceFiltered = modelFiltered.filter(car => {
    if (priceNum >= 30) {
      return Number(car.rentalPrice.slice(1)) <= priceNum;
    } else {
      return true;
    }
  });
  const mileageFiltered = priceFiltered.filter(car => {
    if (
      (fromNum === 0 && toNum === 0) ||
      (fromNum === '' && toNum === 0) ||
      (fromNum === 0 && toNum === '') ||
      (fromNum === '' && toNum === '')
    ) {
      return true;
    } else if (toNum === 0 || toNum === '') {
      return car.mileage >= fromNum;
    } else if (fromNum === '') {
      return car.mileage >= 0 && car.mileage <= toNum;
    } else {
      return car.mileage >= fromNum && car.mileage <= toNum;
    }
  });
  //   console.log('return filter', mileageFiltered);
  return mileageFiltered;
};

export default filterCars;
