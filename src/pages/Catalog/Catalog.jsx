import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import carsOperations from 'redux/cars-operations';
import carsSelectors from 'redux/cars-selectors';
import css from './Catalog.module.css';
import capitalize from 'helpers/capitalize';
import BrandsModal from 'components/BrandModal/BrandsModal';
import PriceModal from 'components/PriceModal/PriceModal';
import arrowDown from 'assets/chevron-down.svg';
import arrowUp from 'assets/chevron-up.svg';
import filterCars from 'helpers/filterCars';
import {
  addFavorite,
  clearFilter,
  setActivePage,
  setFilter,
  setFilteredCars,
  setModal,
  setModalCar,
} from 'redux/cars-slice';
import Notiflix from 'notiflix';
import CloseButton from 'components/CloseButton/CloseButton';
import models from 'helpers/models';
import CarCard from 'components/CarCard/CarCard';
import noResults from 'assets/no-results.png';
import Modal from 'components/Modal/Modal';

const Catalog = () => {
  const FROM_MAX_MILEAGE = process.env.REACT_APP_FROM_MAX_MILEAGE;
  const TO_MAX_MILEAGE = process.env.REACT_APP_TO_MAX_MILEAGE;
  const MAX_PRICE = process.env.REACT_APP_MAX_PRICE;
  const { brandStore, priceStore, fromStore, toStore } = useSelector(
    carsSelectors.getFilter
  );
  const [page, setPage] = useState(1);
  const [brand, setBrand] = useState(brandStore || '');
  const [priceNum, setPriceNum] = useState(priceStore);
  const [price, setPrice] = useState(`To ${priceStore}$` || '');
  const [from, setFrom] = useState(
    `From ${fromStore.toLocaleString('en-US')}` || ''
  );
  const [fromNum, setFromNum] = useState(fromStore || '');
  const [to, setTo] = useState(`To ${toStore.toLocaleString('en-US')}` || '');
  const [toNum, setToNum] = useState(toStore || '');
  const [brandArrow, setBrandArrow] = useState(arrowDown);
  const [priceArrow, setPriceArrow] = useState(arrowDown);
  const [brandModalOn, setBrandModalOn] = useState(false);
  const [priceModalOn, setPriceModalOn] = useState(false);
  const [filteredModels, setFilteredModels] = useState([
    ...models.filter(model =>
      model.toLowerCase().includes(brand.toLowerCase())
    ),
  ]);
  const { cars } = useSelector(carsSelectors.getCars);
  const isModalOn = useSelector(carsSelectors.getModalOn);
  // const [car, setCar] = useState(null);
  const dispatch = useDispatch();

  const galleryCars = useSelector(carsSelectors.getFilteredCars);

  useEffect(() => {
    (async () => {
      dispatch(carsOperations.fetchCars()).then(() =>
        dispatch(
          setFilteredCars(
            filterCars(cars, filteredModels, brand, priceNum, fromNum, toNum)
          )
        )
      );
    })();
    dispatch(setActivePage('catalog'));
  }, [dispatch]); // eslint-disable-line

  const modalOpenHandler = e => {
    switch (e.target.id) {
      case 'brandArrow':
        if (brandModalOn) {
          setBrandModalOn(false);
          setBrandArrow(arrowDown);
        } else {
          setBrandModalOn(true);
          setBrandArrow(arrowUp);
        }
        break;
      case 'priceArrow':
        if (priceModalOn) {
          setPriceModalOn(false);
          setPriceArrow(arrowDown);
        } else {
          setPriceModalOn(true);
          setPriceArrow(arrowUp);
        }
        break;
      default:
        console.log('no such a case');
    }
  };

  const clickBrandHandler = e => {
    setBrand(e.target.innerHTML);
    setBrandModalOn(false);
    setBrandArrow(arrowDown);
    setFilteredModels([...models]);
  };

  const clickPriceHandler = e => {
    setPriceNum(Number(e.target.innerHTML));
    setPrice(`To ${Number(e.target.innerHTML)}$`);
    setPriceModalOn(false);
    setPriceArrow(arrowDown);
  };

  const brandChangeHandler = e => {
    setBrand(capitalize(e.target.value));
    setBrandModalOn(true);
    setBrandArrow(arrowUp);
    setFilteredModels([
      ...models.filter(model =>
        model.toLowerCase().includes(e.target.value.toLowerCase())
      ),
    ]);
  };

  const priceChangeHandler = e => {
    let key = Number(e.key);
    if (isNaN(key) || e.key === null || e.key === ' ') {
      if (e.key === 'Backspace' && priceNum > 10) {
        setPriceNum(Math.floor(priceNum / 10));
        setPrice(`To ${Math.floor(priceNum / 10)}$`);
        setPriceModalOn(true);
        setPriceArrow(arrowUp);
      } else if (e.key === 'Backspace' && priceNum <= 10) {
        setPriceNum('');
        setPrice(`To $`);
        setPriceModalOn(true);
        setPriceArrow(arrowUp);
      }
    } else {
      setPriceNum(Math.min(MAX_PRICE, priceNum + e.key));
      setPrice(`To ${Math.min(MAX_PRICE, priceNum + e.key)}$`);
      setPriceModalOn(true);
      setPriceArrow(arrowUp);
    }
  };

  const mileageChangeHandler = e => {
    let key = Number(e.key);
    if (e.target.id === 'fromInput') {
      if (isNaN(key) || e.key === null || e.key === ' ') {
        if (e.key === 'Backspace' && fromNum > 10) {
          setFromNum(Math.floor(fromNum / 10));
          setFrom(`From ${Math.floor(fromNum / 10).toLocaleString('en-US')}`);
        } else if (e.key === 'Backspace' && fromNum <= 10) {
          setFromNum(0);
          setFrom('From');
        }
      } else {
        setFromNum(Math.min(FROM_MAX_MILEAGE, fromNum + e.key));
        setFrom(
          `From ${Math.min(FROM_MAX_MILEAGE, fromNum + e.key).toLocaleString(
            'en-US'
          )}`
        );
      }
    } else {
      if (isNaN(key) || e.key === null || e.key === ' ') {
        if (e.key === 'Backspace' && toNum > 10) {
          setToNum(Math.floor(toNum / 10));
          setTo(`To ${Math.floor(toNum / 10).toLocaleString('en-US')}`);
        } else if (e.key === 'Backspace' && toNum <= 10) {
          setToNum(0);
          setTo('To');
        }
      } else {
        setToNum(Math.min(TO_MAX_MILEAGE, toNum + e.key));
        setTo(
          `To ${Math.min(TO_MAX_MILEAGE, toNum + e.key).toLocaleString(
            'en-US'
          )}`
        );
      }
    }
  };

  const focusChangeHandler = e => {
    switch (e.target.id) {
      case 'brandInput':
        setPriceModalOn(false);
        setPriceArrow(arrowDown);
        break;
      case 'priceInput':
        setBrandModalOn(false);
        setBrandArrow(arrowDown);
        break;
      case 'fromInput':
        setPriceModalOn(false);
        setPriceArrow(arrowDown);
        setBrandModalOn(false);
        setBrandArrow(arrowDown);
        break;
      case 'toInput':
        setPriceModalOn(false);
        setPriceArrow(arrowDown);
        setBrandModalOn(false);
        setBrandArrow(arrowDown);
        break;
      default:
        console.log('no such a case');
    }
  };

  const submitHandler = () => {
    setPriceModalOn(false);
    setPriceArrow(arrowDown);
    setBrandModalOn(false);
    setBrandArrow(arrowDown);
    if (toNum < fromNum) {
      setToNum('');
      setTo(`To`);
      Notiflix.Notify.warning('Enter valid mileage!');
      return;
    }
    setPage(1);
    dispatch(
      setFilter({
        brandStore: brand,
        priceStore: priceNum,
        fromStore: fromNum,
        toStore: toNum,
      })
    );
    dispatch(
      setFilteredCars(
        filterCars(cars, filteredModels, brand, priceNum, fromNum, toNum)
      )
    );
    Notiflix.Notify.success('Filtered!');
  };

  const clearFilterHandler = () => {
    dispatch(setFilteredCars(filterCars(cars, models, '', '', '', '')));
    dispatch(clearFilter());
    setPage(1);
    setBrand('');
    setPriceNum('');
    setPrice('To $');
    setFromNum('');
    setFrom('From ');
    setTo('To ');
    setToNum('');
  };

  const addFavoriteHandler = e => {
    dispatch(addFavorite(e.target.id));
  };

  const LoadMoreHandler = () => {
    setPage(page + 1);

    const { height } = document
      .getElementById('carsList')
      .firstElementChild.getBoundingClientRect();

    setTimeout(() => {
      window.scrollBy({
        top: height * 2.5,
        behavior: 'smooth',
      });
    }, 200);
  };

  /* MODAL HANDLERS*/
  const openModalHandler = e => {
    dispatch(setModalCar(e.target.id));
    dispatch(setModal(true));

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', escHandler);
  };

  const closeModalHandler = e => {
    if (e.target.id === 'overlay' || e.currentTarget.id === 'closeModal') {
      dispatch(setModal(false));
      window.removeEventListener('keydown', escHandler);
    }
    document.body.style.overflow = 'unset';
  };

  const escHandler = e => {
    if (e.code === 'Escape') {
      dispatch(setModal(false));
      window.removeEventListener('keydown', escHandler);
    }
  };

  const rentalCarHandler = () => {
    // dispatch(setModal(false));
    Notiflix.Notify.init({
      zindex: 9999999,
    });
    Notiflix.Notify.success('Contact us!');
  };

  return (
    <section className={css.pageWrapper}>
      {isModalOn && (
        <Modal
          // car={car}
          closeModalHandler={closeModalHandler}
          rentalCarHandler={rentalCarHandler}
        />
      )}
      <div className={css.filter}>
        <div className={css.filterItem} id="brand">
          <p className={css.label}>Car brand</p>
          <input
            className={css.input}
            type="text"
            placeholder="Enter the text"
            value={brand}
            onChange={brandChangeHandler}
            onFocus={focusChangeHandler}
            onBlur={() => setBrandModalOn(false)}
            id="brandInput"
          />
          <div className={css.arrowDown} onClick={modalOpenHandler}>
            <img src={brandArrow} alt="arrow" id="brandArrow" />
          </div>
          {brandModalOn && (
            <div className={css.brandModal}>
              <BrandsModal
                models={filteredModels}
                clickHandler={clickBrandHandler}
              />
            </div>
          )}
        </div>
        <div className={css.filterItem} id="price">
          <p className={css.label}>Price/ 1 hour</p>
          <input
            className={css.input}
            placeholder="To $"
            onFocus={focusChangeHandler}
            value={price}
            onChange={e => e}
            onKeyDown={priceChangeHandler}
            id="priceInput"
          />
          <div className={css.arrowDown} onClick={modalOpenHandler}>
            <img src={priceArrow} alt="arrow" id="priceArrow" />
          </div>
          {priceModalOn && (
            <div className={css.brandModal}>
              <PriceModal
                clickHandler={clickPriceHandler}
                maxPrice={priceNum}
              />
            </div>
          )}
        </div>
        <div className={css.filterItem} id="mileage">
          <p className={css.label}>Car mileage / km</p>
          <div className={css.mileage}>
            <input
              className={css.input}
              placeholder="From"
              onFocus={focusChangeHandler}
              id="fromInput"
              value={from}
              onChange={e => e}
              onKeyDown={mileageChangeHandler}
            />
            <input
              className={css.input}
              placeholder="To"
              id="toInput"
              value={to}
              onFocus={focusChangeHandler}
              onChange={e => e}
              onKeyDown={mileageChangeHandler}
            />
          </div>
        </div>
        <button
          type="button"
          className={css.searchButton}
          onClick={submitHandler}
        >
          Search
        </button>
        <div className={css.clearButton} onClick={clearFilterHandler}>
          <CloseButton />
        </div>
      </div>

      {galleryCars.length > 0 ? (
        <div className={css.gallery} id="gallery">
          <ul className={css.carsList} id="carsList">
            {galleryCars.slice(0, 8 * page).map(car => {
              return (
                <li className={css.carCard} key={car.id}>
                  <CarCard
                    id={car.id}
                    img={car.img}
                    make={car.make}
                    model={car.model}
                    year={car.year}
                    rentalPrice={car.rentalPrice}
                    address={car.address}
                    type={car.type}
                    functionalities={car.functionalities}
                    mileage={car.mileage}
                    rentalCompany={car.rentalCompany}
                    addFavoriteHandler={addFavoriteHandler}
                    openModalHandler={openModalHandler}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div
          style={{
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            src={noResults}
            alt="No_results"
            style={{ width: 100, height: 100 }}
          />
          <h2>No results</h2>
        </div>
      )}
      {galleryCars.length > page * 8 ? (
        <button className={css.loadMoreBtn} onClick={LoadMoreHandler}>
          Load more
        </button>
      ) : (
        <div className={css.noMoreResults}>No more results</div>
      )}
    </section>
  );
};

export default Catalog;
