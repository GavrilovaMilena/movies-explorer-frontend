
import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo.js';
import React from "react";
import { Validator } from '../../utils/Validator'

function Login(props) {

    const { values, handleChange, errors, isValid } = Validator();

    function handleLogin(e) {
        e.preventDefault();
        props.onLogin(values.email, values.password);
    }

    return (
        <section className='login'>
            <Logo />
            <h2 className='login__title'>Рады видеть!</h2>
            <form className='login__form auth__form' onSubmit={handleLogin}>
                <fieldset className='login__fields auth__fields'>
                    <p className='login__input_text auth__input_text'>E-mail</p>
                    <input 
                    className='login__input auth__input' 
                    type='email' 
                    name='email'
                    value={values.email || ''}
                    onChange={handleChange}
                    required />
                    <span className="login__error auth__error">{errors.email}</span>

                    <p className='login__input_text auth__input_text'>Пароль</p>
                    <input 
                    className='login__input auth__input' 
                    type='password' 
                    name='password'
                    value={values.password || ''}
                    onChange={handleChange}
                    required 
                    minLength='8' />
                </fieldset>
                <span className="login__error auth__error">{props.errorMessage}</span>
                <button 
                className={`login__button auth__button ${isValid ? '' : 'auth__button_disabled'}`}
                disabled={!isValid}
                >Войти</button>
            </form>
            <p className='login__subtitle auth__subtitle'>Ещё не зарегистрированы?
                <Link className='login__link auth__link' to='/signup'>Регистрация</Link>
            </p>
        </section>
    )
}

export default Login;
