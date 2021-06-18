import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Acc from '../../images/Acc.svg';

function Navigation(props) {

    const [menuShown, setMenuShown] = React.useState(false);

    function handleCloseMenuClick() {
        setMenuShown(false);
    }

    function handleOpenMenuClick() {
        setMenuShown(true);
    }

    return (
        <div className={props.loggedIn ? 'header__navigation' : 'header__navigation header__navigation_right'}>
            <div className={props.loggedIn ? 'header__navigation_movies' : 'header__navigation_movies no'}>
                <Link to="/movies" className="header__link header__link_movies">Фильмы</Link>
                <Link to="/saved-movies" className="header__link header__link_movies">Сохранённые фильмы</Link>
            </div>
            <div className="header__navigation_login">
                <Link to="/signup" className={props.loggedIn ? 'header__link header__link_register no' :
                    'header__link header__link_register'}>Регистрация</Link>
                {props.loggedIn ? <Link to='/profile' className='header__link header__link_account'>
                    <img className='header__link_account' src={Acc} alt='Человечек' />
                </Link> :
                    <Link to="/signin" className="header__link header__link_login">Войти</Link>}
            </div>
            <button className={props.loggedIn ? 'header__burger' : 'header__burger no'} onClick={handleOpenMenuClick}></button>
            <div className={menuShown ? 'header__burger_menu visible' : 'header__burger_menu'}>
                <button className="header__burger_close" onClick={handleCloseMenuClick}></button>
                <div className={menuShown ? 'header__burger_container visible' : 'header__burger_container'}>
                    <div className="header__burger_links">
                        <Link to="/" className="header__burger_link">Главная</Link>
                        <Link to="/movies" className="header__burger_link">Фильмы</Link>
                        <Link to="/saved-movies" className="header__burger_link">Сохранённые фильмы</Link>
                        <Link to='/profile' className='header__burger_link burger__link_account'>
                            <img className='burger__link_account' src={Acc} alt='Человечек' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
