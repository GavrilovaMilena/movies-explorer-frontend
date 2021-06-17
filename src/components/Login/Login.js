import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo.js';

function Login() {
    return (
        <section className='login'>
            <Logo />
            <h2 className='login__title'>Рады видеть!</h2>
            <form className='login__form auth__form'>
                <fieldset className='login__fields auth__fields'>
                    <p className='login__input_text auth__input_text'>E-mail</p>
                    <input className='login__input auth__input' type='email' required />
                    <p className='login__input_text auth__input_text'>Пароль</p>
                    <input className='login__input auth__input' type='password' required minLength='8' />
                </fieldset>
                <button className='login__button auth__button'>Войти</button>
            </form>
            <p className='login__subtitle auth__subtitle'>Ещё не зарегистрированы?
            <Link className='login__link auth__link' to='/signup'>Регистрация</Link>
            </p>
        </section>
    )
}

export default Login; 