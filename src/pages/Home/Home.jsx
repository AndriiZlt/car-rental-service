import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Home.module.css';
import hero1 from 'assets/hero1.svg';
import hero2 from 'assets/hero2.svg';
import hero3 from 'assets/hero3.svg';
import { useDispatch } from 'react-redux';
import { setActivePage } from 'redux/cars-slice';

var images = [hero1, hero2, hero3];

const Home = () => {
  const TEL_NUMBER = process.env.REACT_APP_TEL;
  const [image, setImage] = useState(images[0]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActivePage('home'));
    const heroFun = () => {
      images.push(images.shift());
      setImage(images[0]);
    };
    let intervalId = setInterval(() => heroFun(), 5000);
    return () => clearInterval(intervalId);
  });

  return (
    <section className={css.section}>
      <div className={css.hero}>
        <img src={image} alt="hero" className={css.heroImage}></img>
        <div className={css.info}>
          <h1>DriveEasy Rental</h1>
          <h2>The best car rental service in the world </h2>
          <p className={css.text}>
            Discover freedom on four wheels with DriveEasy Rental
          </p>
          <p className={css.text}>
            Whether you're planning a road trip, a business journey, or just
            need a reliable set of wheels, we've got you covered.
          </p>
          <p className={css.text}>
            Choose from our wide selection of quality vehicles, book with ease,
            and hit the road with confidence.
          </p>
          <p className={css.text}>
            Your journey, your way – start your adventure today!
          </p>
          <div className={css.buttons}>
            <button
              type="button"
              className={css.rentalCarBtn}
              onClick={() => window.open(`tel:+${TEL_NUMBER}`)}
            >
              Rental car
            </button>
            <NavLink to="/catalog" className={css.toCatalogLink}>
              <button type="button" className={css.toCatalogBtn}>
                Catalog
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
