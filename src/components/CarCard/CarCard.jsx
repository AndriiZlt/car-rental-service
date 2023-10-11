import React from 'react';
import css from 'pages/Catalog/Catalog.module.css';
import heart from 'assets/heart.svg';
import heartRed from 'assets/active.svg';
import { useSelector } from 'react-redux';
import carsSelectors from 'redux/cars-selectors';

const CarCard = ({
  id,
  img,
  make,
  model,
  year,
  rentalPrice,
  address,
  type,
  mileage,
  rentalCompany,
  addFavoriteHandler,
  openModalHandler,
}) => {
  const favoriteCars = useSelector(carsSelectors.getFavoriteCars);
  const isFavorite = favoriteCars.includes(id.toString());

  return (
    <>
      <div className={css.imageWrapper}>
        <img src={img} alt="car_image" className={css.carImage} />
        <img
          src={isFavorite ? heartRed : heart}
          alt="heart"
          className={css.addFavorite}
          id={id}
          onClick={addFavoriteHandler}
        />
      </div>

      <div className={css.title}>
        <p>
          {make}
          <span className={css.model}>{model},</span>
          <span className={css.year}>{year}</span>
        </p>
        <p className={css.price}>{rentalPrice}</p>
      </div>
      <div className={css.tags}>
        <p>
          {address.split(',')[1]} <span> | </span>
          {address.split(',')[2]}
          <span> | </span>
          {rentalCompany}
          <span> | </span>
          {type}
          <span> | </span>
          {model}
          <span> | </span>
          {id}
          <span> | </span>
          {mileage}
        </p>
      </div>
      <button
        type="button"
        className={css.learnMoreBtn}
        onClick={openModalHandler}
        id={id}
      >
        Learn more
      </button>
    </>
  );
};

export default CarCard;
