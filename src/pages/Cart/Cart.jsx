import React, { useState } from 'react';
import css from './Cart.module.css';
import CartItem from 'components/CartCard/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import carsSelectors from 'redux/cars-selectors';
import emptyCart from 'assets/empty-cart.png';
import { addFavorite } from 'redux/cars-slice';
import carRental from 'assets/Car-Rental.jpg';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  const TEL_NUMBER = process.env.REACT_APP_TEL;
  const { cars } = useSelector(carsSelectors.getCars);
  const favoriteCars = useSelector(carsSelectors.getFavoriteCars);

  const galleryCars = cars.filter(car =>
    favoriteCars.includes(car.id.toString())
  );
  const dispatch = useDispatch();

  const [active, setActive] = useState(0);

  const [car, setCar] = useState(
    galleryCars.filter(car => galleryCars.indexOf(car) === active)[0]
  );

  const chooseHandler = e => {
    if (e.target.name === 'heart') {
      return;
    }
    const index = galleryCars.indexOf(
      galleryCars.filter(car => car.id === Number(e.currentTarget.id))[0]
    );
    setActive(index);
    setCar(galleryCars[index]);
  };

  const addFavoriteHandler = e => {
    const index = galleryCars.indexOf(
      galleryCars.filter(car => car.id === Number(e.target.id))[0]
    );
    if (index === active) {
      if (index > 0) {
        setActive(0);
        setCar(galleryCars[0]);
      } else {
        setCar(galleryCars[1]);
      }
      const el = document.getElementById('leftUl');
      el.scrollTo(0, 0);
    } else if (index < active) {
      setActive(active - 1);
    }
    dispatch(addFavorite(e.target.id));
  };

  return (
    <section className={css.pageWrapper}>
      <aside className={css.leftAside}>
        <h2 className={css.leftTitle}>Favorite Cars</h2>
        {galleryCars.length > 0 ? (
          <ul className={css.leftUl} id="leftUl">
            {galleryCars.map(car => {
              return (
                <li
                  key={car.id}
                  className={css.carCard}
                  style={{
                    border:
                      Number(galleryCars.indexOf(car)) === active
                        ? '2px solid rgba(52, 112, 255, 1)'
                        : '2px solid rgb(245, 241, 241)',
                  }}
                >
                  <CartItem
                    id={car.id}
                    img={car.img}
                    make={car.make}
                    model={car.model}
                    year={car.year}
                    rentalPrice={car.rentalPrice}
                    chooseHandler={chooseHandler}
                    addFavoriteHandler={addFavoriteHandler}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={css.noItems}>
            <img
              src={emptyCart}
              alt="empty_cart"
              className={css.noItemsImage}
            />
          </div>
        )}
      </aside>
      <div className={css.rightAside}>
        {galleryCars.length > 0 ? (
          <div className={css.modal}>
            <img src={car.img} alt="car_image" className={css.carImage} />
            <div className={css.text}>
              <h2 className={css.title}>
                {car.make}
                <span className={css.model}>{car.model},</span>
                <span className={css.year}>{car.year}</span>
              </h2>
              <p className={css.tags} id="tags1">
                {car.address.split(',')[1]} <span> | </span>
                {car.address.split(',')[2]}
                <span> | </span>
                Id: {car.id}
                <span> | </span>
                Year: {car.year}
                <span> | </span>
                Type: {car.type}
                <br />
                Fuel Consumption: {car.fuelConsumption}
                <span> | </span>
                Engine Size: {car.engineSize}
              </p>

              <p className={css.description}>{car.description}</p>
              <div className={css.functionalities}>
                <h3 className={css.h3}>Accessories and functionalities:</h3>

                <p className={css.tags} id="tags2">
                  {car.accessories[0]}
                  <span> | </span>
                  {car.accessories[1]}
                  <span> | </span>
                  {car.accessories[2]}
                  <br />
                  {car.functionalities[0]}
                  <span> | </span>
                  {car.functionalities[1]}
                  <span> | </span>
                  {car.functionalities[2]}
                </p>
              </div>
            </div>

            <div className={css.rentalConditions}>
              <h3 className={css.h3}>Rental Conditions:</h3>
              <ul className={css.conditionsUl}>
                <li className={css.conditionsLi}>
                  <p id="montserrat">
                    {car.rentalConditions.split('\n')[0].slice(0, -2)}
                    <span>{car.rentalConditions.split('\n')[0].slice(-2)}</span>
                  </p>
                </li>
                <li className={css.conditionsLi}>
                  <p id="manrope">{car.rentalConditions.split('\n')[1]}</p>
                </li>
                <li className={css.conditionsLi}>
                  <p id="manrope">{car.rentalConditions.split('\n')[2]}</p>
                </li>
                <li className={css.conditionsLi}>
                  <p id="montserrat">
                    Mileage: <span>{car.mileage}</span>
                  </p>
                </li>
                <li className={css.conditionsLi}>
                  <p id="montserrat">
                    Price: <span>{car.rentalPrice.slice(1)}$</span>
                  </p>
                </li>
              </ul>
            </div>
            <button
              type="button"
              className={css.rentalCarBtn}
              id={car.id}
              onClick={() => window.open(`tel:+${TEL_NUMBER}`)}
            >
              Rental car
            </button>
          </div>
        ) : (
          <div className={css.noItemsRight}>
            <img
              src={carRental}
              alt="empty_cart"
              className={css.noItemsRightImage}
            />
            <NavLink className={css.nothingText} to="/catalog">
              To the Catalog
            </NavLink>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
