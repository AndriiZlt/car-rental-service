import React from 'react';
import css from 'pages/Catalog/Catalog.module.css';
import { nanoid } from 'nanoid';

const prices = [];

for (let i = 30; i <= 500; i += 10) {
  prices.push(i);
}

const PriceModal = ({ clickHandler }) => {
  return (
    <div className={css.modalBody} id="priceModalBody">
      <ul>
        {prices.map(price => (
          <li onClick={clickHandler} key={nanoid()}>
            {price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceModal;
