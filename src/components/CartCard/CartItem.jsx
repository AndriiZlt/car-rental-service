import React from 'react';
import css from './CartItem.module.css';
import heart from 'assets/heart.svg';
import heartRed from 'assets/active.svg';
import { useSelector } from 'react-redux';
import carsSelectors from 'redux/cars-selectors';

const CartItem = ({
  id,
  img,
  make,
  model,
  year,
  rentalPrice,
  chooseHandler,
  addFavoriteHandler,
}) => {
  const favoriteCars = useSelector(carsSelectors.getFavoriteCars);
  const isFavorite = favoriteCars.includes(id.toString());
  return (
    <div id={id} onClick={chooseHandler}>
      <div className={css.imageWrapper}>
        <img src={img} alt="car_image" className={css.carImage} />
        <img
          src={isFavorite ? heartRed : heart}
          alt="heart"
          className={css.addFavorite}
          id={id}
          name="heart"
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
    </div>
  );
};

export default CartItem;
