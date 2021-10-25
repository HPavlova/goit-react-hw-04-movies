import { useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import styles from '../SearchForm/SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Введите название фильма');
      return;
    }
    onSubmit(query);
  };

  return (
    <>
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <input
            className={styles.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            name="query"
            value={query}
            onChange={handleNameChange}
          />
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__button__label}>Search</span>
          </button>
        </form>
      </header>
    </>
  );
}

SearchForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
};
