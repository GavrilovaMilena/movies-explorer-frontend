import './Register.css';
import Logo from '../Logo/Logo.js';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <>
            <section className='register'>
                <Logo />
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form auth__form'>
                    <fieldset className='register__fields auth__fields'>
                        <p className='register__input_name auth__input_name'>Имя</p>
                        <input className='register__input auth__input' type='text' required />
                        <span className='register__error auth__error'></span>
                        <p className='register__input_name auth__input_name'>E-mail</p>
                        <input className='register__input auth__input' type='email' required />
                        <span className='register__error auth__error'></span>
                        <p className='register__input_name auth__input_name'>Пароль</p>
                        <input className='register__input auth__input' type='password' required minLength='8' />
                        <span className='register__error auth__error'>Что-то пошло не так...</span>
                    </fieldset>
                    <button className='register__button auth__button'>Зарегистрироваться</button>
                </form>
                <h3 className='register__subtitle auth__subtitle'>Уже зарегистрированы?
                    <Link className='register__link auth__link' to='/signin'>Войти</Link>
                </h3>
            </section>
        </>
    )
}

export default Register;