import React from 'react';
import css from 'pages/Catalog/Catalog.module.css';
import { nanoid } from 'nanoid';

const BrandsModal = ({ models, clickHandler }) => {
  return (
    <div className={css.modalBody} id="brandModalBody">
      <ul>
        {models.map(model => (
          <li onClick={clickHandler} key={nanoid()}>
            {model}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandsModal;
