import './Register.css';
import React from 'react';
import Logo from '../Logo/Logo.js';
import { Link, withRouter } from 'react-router-dom';
import { Validator } from '../../utils/Validator';

function Register(props) {

    const { values, handleChange, errors, isValid } = Validator();

    function handleRegister(e) {
        e.preventDefault();

        props.onRegister(values.name, values.email, values.password);

    }

    return (
        <>
            <section className='register'>
                <Logo />
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form auth__form' onSubmit={handleRegister}>
                    <fieldset className='register__fields auth__fields'>
                        <p className='register__input_name auth__input_name'>Имя</p>
                        <input
                            className='register__input auth__input'
                            type='text'
                            name='name'
                            value={values.name || ''}
                            onChange={handleChange}
                            minLength='2'
                            maxLength='30'
                            required
                        />
                        <span className='register__error auth__error'>{errors.name}</span>

                        <p className='register__input_name auth__input_name'>E-mail</p>
                        <input
                            className='register__input auth__input'
                            type='email'
                            name='email'
                            value={values.email || ''}
                            onChange={handleChange}
                            required
                        />
                        <span className='register__error auth__error'>{errors.email}</span>

                        <p className='register__input_name auth__input_name'>Пароль</p>
                        <input
                            className='register__input auth__input'
                            type='password'
                            name='password'
                            value={values.password || ''}
                            onChange={handleChange}
                            required
                            minLength='8' />
                        <span className='register__error auth__error'>{errors.password}</span>
                    </fieldset>
                    <span className='register__error auth__error'>{props.errorMessage}</span>
                    <button className={`register__button auth__button ${isValid ? '' : 'auth__button_disabled'}`}
                        disabled={!isValid} type='submit'>Зарегистрироваться</button>
                </form>
                <h3 className='register__subtitle auth__subtitle'>Уже зарегистрированы?
                    <Link className='register__link auth__link' to='/signin'>Войти</Link>
                </h3>
            </section>
        </>
    )
}

export default withRouter(Register);