import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

function Profile(props) {
    const [form, setForm] = React.useState(true);

    function handleEditProfileClick(e) {
        e.preventDefault();
        setForm(false);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <section className='profile'>
                <h2 className='profile__title'>Привет, Милена!</h2>
                <form className='profile__form' >
                    <fieldset className='profile__fields'>
                        <div className='profile__form_input'>
                            <p className='profile__form_input-name'>Имя</p>
                            <input className='profile__form_input-field' type='text' placeholder='Милена' disabled={form} />
                        </div>
                        <div className='profile__form_input'>
                            <p className='profile__form_input-name'>Email</p>
                            <input className='profile__form_input-field' type='text' placeholder='email@mail.ru' disabled={form} />
                        </div>
                    </fieldset>
                    <span className={form ? 'profile__form_error no' : 'profile__form_error'}>Произошла ошибка.</span>
                    {form ? <button className='profile__button profile__button_edit' onClick={handleEditProfileClick}>Редактировать</button> :
                        <button className='profile__button profile__button_save'>Сохранить</button>}
                </form>
                <Link to='/' className={form ? 'profile__signout_link' : 'profile__signout_link no'}>Выйти из аккаунта</Link>
            </section>
        </>
    )
}

export default Profile;