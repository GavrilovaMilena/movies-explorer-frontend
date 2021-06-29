import './App.css';
import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import { CurrentUserContext } from '../../context/CurrentUserContext';

import mainApi from '../../utils/MainApi';

function App() {

    const [loginError, setLoginError] = React.useState('');
    const [registerError, setRegisterError] = React.useState(false);
    const [profileMessage, setProfileMessage] = React.useState('');
    const [currentUser, setCurrentUser] = React.useState('');

    const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(true);
    const isLoggedIn = mainApi.loggedIn();

    const history = useHistory();

    //Обновление стейтов пользователя на основе токена
    React.useEffect(() => {
        if (isLoggedIn) {
            mainApi.getUser()
                .then((userData) => {
                    setLoginError('');
                    setCurrentUser(userData);
                })
                .catch(() => {
                    setLoginError('Что-то пошло не так...');
                })
        }
        else {
            history.push('/signin');
        }
    }, [history, isLoggedIn]);

    // обработчик регистрации 
    function handleRegister(name, password, email) {
        mainApi.register(name, password, email)
            .then((res) => {
                if (res._id) {
                    setRegisterError('')
                    history.push('/signin');
                } else if (res.error === 'Bad Request') {
                    setRegisterError('Данные некорректны');
                } else if (res.message) {
                    setRegisterError(res.message);
                }
            })
            .catch(() => {
                setRegisterError('Что-то пошло не так...');
            })
    }

    // обработчик входа
    function handleLogin(password, email) {
        mainApi.login(password, email)
            .then((data) => {
                if (data.token) {
                    mainApi.setToken(data.token);
                    mainApi.getUser().then((userData) => {
                        setLoginError('');
                        setCurrentUser(userData);
                        history.push('/');
                    })
                        .catch(() => {
                            setLoginError('Что-то пошло не так...');
                        })
                } else if (data.error === 'Bad Request') {
                    setLoginError('Данные некорректны');
                } else if (data.message) {
                    setLoginError(data.message);
                }
            })
            .catch(() => {
                setLoginError('Что-то пошло не так...');
            })
    }

    // обработчик редактирования профиля
    function handleEditUserInfo(name, email) {
        mainApi.updateUser(name, email)
            .then((newUser) => {
                if (newUser._id) {
                    setCurrentUser(newUser);
                    setIsUpdateSuccess(true);
                    setProfileMessage('Профиль обновлен успешно!');
                } else if (newUser.message) {
                    setProfileMessage(newUser.message);
                    setIsUpdateSuccess(false);
                }
                return
            })
            .catch(() => {
                setProfileMessage('Произошла ошибка');
                setIsUpdateSuccess(false);
            })
    }

    function clearErrorMessages() {
        setRegisterError('');
        setLoginError('');
        setProfileMessage('');
    }

    function handleSignOut() {
        mainApi.clearToken();
        history.push('/');
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>

            <div className='page'>
                <Switch>

                    <Route exact path='/'>
                        <Main loggedIn={isLoggedIn} />
                    </Route>

                    <Route exact path='/'>
                        {isLoggedIn ?
                            <Redirect to='/' /> :
                            <Redirect to='/signin' />}
                    </Route>
                    <Route exact path='/movies'>
                        <Movies saved={false} loggedIn={isLoggedIn} />
                    </Route>
                    <Route exact path='/saved-movies'>
                        <Movies saved={true} loggedIn={isLoggedIn} />
                    </Route>

                    <ProtectedRoute
                        exact
                        path='/profile'
                        loggedIn={isLoggedIn}
                        component={Profile}
                        onChangeUser={handleEditUserInfo}
                        isUpdateSuccess={isUpdateSuccess}
                        message={profileMessage}
                        onSignOut={handleSignOut}
                    />

                    <Route exact path='/signup' >
                        {isLoggedIn ?
                            <Redirect to='/' /> :
                            <Register
                                onRegister={handleRegister}
                                errorMessage={registerError}
                                onClear={clearErrorMessages}
                            />}
                    </Route>

                    <Route exact path='/signin' >
                        {isLoggedIn ?
                            <Redirect to='/' /> :
                            <Login
                                onLogin={handleLogin}
                                errorMessage={loginError}
                                onClear={clearErrorMessages}
                            />}
                    </Route>

                    <Route path='*' >
                        <NotFound />
                    </Route>

                </Switch>
            </div>

        </CurrentUserContext.Provider>

    )
}


export default App;


