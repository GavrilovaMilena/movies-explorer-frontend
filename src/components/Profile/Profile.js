import './Profile.css';
import React from 'react';
import { Validator } from '../../utils/Validator';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Profile(props) {

    const { values, setValues, handleChange, errors, isValid } = Validator();
    const [formDisabled, setFormDisabled] = React.useState(true);

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);


    function handleEditProfile(e) {
        e.preventDefault();

        setFormDisabled(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onChangeUser(values.name, values.email);
    }

    React.useEffect(() => {
        setFormDisabled(props.isUpdateSuccess);
    }, [props.isUpdateSuccess, props.onChangeUser])

    React.useEffect(() => {
        if (props.isSaving) {
            setFormDisabled(true);
        }
    }, [props.isSaving])

    return (
        <>
            <Header loggedIn={props.loggedIn} main={false} />
            <section className='profile'>
                <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                <form className='profile__form' onSubmit={handleSubmit}>
                    <fieldset className='profile__fields'>
                        <div className='profile__form_input'>
                            <p className='profile__form_input-name'>Имя</p>
                            <input
                                className='profile__form_input-field'
                                type='text'
                                name='name'
                                value={values.name || currentUser.name}
                                onChange={handleChange}
                                disabled={formDisabled}
                            />
                        </div>
                        <span className='profile__input_error'>{errors.name}</span>

                        <div className='profile__form_input'>
                            <p className='profile__form_input-name'>Email</p>
                            <input
                                className='profile__form_input-field'
                                type='email'
                                name='email'
                                value={values.email || currentUser.email}
                                onChange={handleChange}
                                disabled={formDisabled}
                                required
                            />
                        </div>
                        <span className='profile__input_error'>{errors.email}</span>
                    </fieldset>
                    <span
                        className={`profile__form-message ${props.isUpdateSuccess ? 'profile__form-message_success' : 'profile__form-message_error'}`}>
                        {props.message}
                    </span>
                    {formDisabled ? <button className='profile__button profile__button_edit' onClick={handleEditProfile}>Редактировать</button> :
                        <button
                            className={`profile__button profile__button_save 
                        ${isValid ? '' : 'profile__button_save-disabled'}`}
                            type='submit'
                            disabled={!isValid}
                        >Сохранить</button>}
                </form>
                <button className={formDisabled ? 'profile__signout_link' : 'profile__signout_link no'}
                    onClick={props.onSignOut}>Выйти из аккаунта</button>
            </section>
        </>
    )
}

export default Profile;
