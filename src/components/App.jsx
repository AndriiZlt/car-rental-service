import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from 'pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import Cart from 'pages/Cart/Cart';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import carsOperations from 'redux/cars-operations';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(carsOperations.fetchCars());
  }, [dispatch]); // eslint-disable-line

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="favorites" element={<Cart />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
