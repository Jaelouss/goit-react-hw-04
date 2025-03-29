import React from 'react';
import s from './PageOf.module.css';

const PageOf = ({ currentPage, maxPage }) => {
  return (
    <span className={s.page}>
      Page {currentPage} of {maxPage}
    </span>
  );
};

export default PageOf;
