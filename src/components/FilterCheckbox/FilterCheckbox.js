import './FilterCheckbox.css';

function FilterCheckbox(props) {
    function handleFilterCheckboxChange(e) {
        e.preventDefault();
        props.onChangeFilterCheckbox(e.target.value);
    }

    return (
        <label htmlFor="short-films" className="search__toggle-label">
            <input
                className="search__toggle"
                id="short-films"
                type="checkbox"
                onChange={handleFilterCheckboxChange}
            />
            <span className="search__toggle_visible"></span>
        </label>
    )
}

export default FilterCheckbox;