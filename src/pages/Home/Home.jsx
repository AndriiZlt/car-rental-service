import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Home.module.css';
import hero1 from 'assets/hero1.svg';
import hero2 from 'assets/hero2.svg';
import hero3 from 'assets/hero3.svg';
import { useDispatch } from 'react-redux';
import { setActivePage } from 'redux/cars-slice';

const Home = () => {
  const TEL_NUMBER = process.env.REACT_APP_TEL;

  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(0);
  const [opacity3, setOpacity3] = useState(0);

  const [show, setShow] = useState(1);
  const [margin, setMargin] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const div = document.getElementById('image1');
    const { height } = div.getBoundingClientRect();
    setMargin(height - 127);

    dispatch(setActivePage('home'));

    const heroFun = () => {
      if (show === 1) {
        setOpacity1(0);
        setOpacity2(1);
        setShow(2);
      } else if (show === 2) {
        setOpacity2(0);
        setOpacity3(1);
        setShow(3);
      } else {
        setOpacity1(1);
        setOpacity3(0);
        setShow(1);
      }
    };
    let intervalId = setInterval(() => heroFun(), 5000);
    return () => clearInterval(intervalId);
  }, [dispatch, show, margin]);

  return (
    <>
      <section className={css.section}>
        <div className={css.hero}>
          <div className={css.imagesDiv}>
            <img
              src={hero1}
              alt="hero"
              className={css.heroImage}
              style={{ opacity: opacity1 }}
              id="image1"
            />
            <img
              src={hero2}
              alt="hero"
              className={css.heroImage}
              style={{ opacity: opacity2 }}
              id="image2"
            />
            <img
              src={hero3}
              alt="hero"
              className={css.heroImage}
              style={{ opacity: opacity3 }}
              id="image3"
            />
          </div>
        </div>
      </section>
      <div className={css.info} style={{ marginTop: margin }}>
        <h1>DriveEasy Rental</h1>
        <h2>The best car rental service in the world </h2>
        <p className={css.text} style={{ opacity: opacity1 }}>
          Discover freedom on four wheels with DriveEasy Rental Your journey,
          your way – start your adventure today!
        </p>
        <p className={css.text} style={{ opacity: opacity2 }}>
          Whether you're planning a road trip, a business journey, or just need
          a reliable set of wheels, we've got you covered.
        </p>
        <p className={css.text} style={{ opacity: opacity3 }}>
          Choose from our wide selection of quality vehicles, book with ease,
          and hit the road with confidence.
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
    </>
  );
};

export default Home;
