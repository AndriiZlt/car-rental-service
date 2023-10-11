import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from 'pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import Cart from 'pages/Cart/Cart';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="favorites" element={<Cart />} />
      </Route>
      <Route exact path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
