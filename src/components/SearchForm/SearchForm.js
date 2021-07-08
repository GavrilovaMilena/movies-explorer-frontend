import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import React from 'react';

function SearchForm(props) {

    const [search, setSearch] = React.useState('');
    const [searchCheckbox, setSearchCheckbox] = React.useState(false);
    const [searchValid, setSearchValid] = React.useState(true);

    function handleSearchChange(e) {
        setSearch(e.target.value);
        setSearchValid(e.target.checkValidity());
    }

    function handleSearchMovies(e) {
        e.preventDefault();
        props.onSearchMovies(search, searchCheckbox);
    }

    function handleCheckbox(isEnabled) {
        setSearchCheckbox(isEnabled);
    }

    return (
        <section className='search'>
            <form
                className='search__form'
                onSubmit={handleSearchMovies}
            >
                <fieldset className='search__form_fields'>
                    <input
                        className='search__form_input'
                        type='text'
                        name='search'
                        placeholder='Фильм'
                        required
                        value={search || ''}
                        onChange={handleSearchChange}
                    />
                    <span className={`search__form-error ${searchValid ? 'search__form-error_hidden' : ''}`}>
                        Введите ключевое слово
                    </span>
                    <button className='search__form_button' type='submit'>Найти</button>
                </fieldset>
                <div className='search__toggle_box'>
                    <FilterCheckbox onChangeFilterCheckbox={handleCheckbox}/>
                    <h3 className='search__toggle_text'>Короткометражки</h3>
                </div>

            </form>
        </section>
    )
}

export default SearchForm;
