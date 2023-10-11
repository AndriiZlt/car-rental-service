import React, { useEffect } from 'react';
import css from './Modal.module.css';
import x from 'assets/x.svg';
import { useSelector } from 'react-redux';
import carsSelectors from 'redux/cars-selectors';

const Modal = ({ closeModalHandler, rentalCarHandler }) => {
  const TEL_NUMBER = process.env.REACT_APP_TEL;
  const carId = useSelector(carsSelectors.getModalCar);
  const { cars } = useSelector(carsSelectors.getCars);
  const car = cars.filter(car => car.id.toString() === carId)[0];

  useEffect(() => {
    window.addEventListener('click', e => closeModalHandler(e));
    return window.removeEventListener('click', e => closeModalHandler(e));
  });

  return (
    <div className={css.overlay} id="overlay">
      <div className={css.modal}>
        <div
          className={css.closeBtn}
          onClick={closeModalHandler}
          id="closeModal"
        >
          <img src={x} alt="x" />
        </div>
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
          onClick={() => window.open(`tel:+${TEL_NUMBER}`)}
          id={car.id}
        >
          Rental car
        </button>
      </div>
    </div>
  );
};

export default Modal;
