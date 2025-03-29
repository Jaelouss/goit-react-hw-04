import React from 'react';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  return (
    <header className={s.header}>
      <form onSubmit={onSubmit}>
        <input
          className={s.input}
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          name='userQuery'
        />
        <button className={s.button} type='submit'>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
