import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <section className='search'>
            <form className='search__form'>
                <fieldset className='search__form_fields'>
                    <input type='text' placeholder='Фильм' className='search__form_input' required />
                    <button className='search__form_button' type='submit'>Найти</button>
                </fieldset>
                <div className='search__toggle_box'>
                    <FilterCheckbox />
                    <h3 className='search__toggle_text'>Короткометражки</h3>
                </div>

            </form>
        </section>
    )
}

export default SearchForm;