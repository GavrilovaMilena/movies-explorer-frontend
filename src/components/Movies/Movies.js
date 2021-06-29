import Header from '../Header/Header';
import { useLocation, useHistory } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import React from 'react';
import * as moviesApi from '../../utils/MoviesApi';
import * as filterUtility from '../../utils/FilterUtility';
import mainApi from '../../utils/MainApi';

function Movies(props) {
    const [isSearching, setIsSearching] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [isErrorActive, setIsErrorActive] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const location = useLocation();
    const history = useHistory();
    // поиск фильмов 
    function handleSearchMovies(search, searchCheckbox) {

        setIsErrorActive(false);
        setNotFound(false);
        setMovies([]);
        setIsSearching(true);
        if(props.saved) {
            var filterd = filterUtility.filterMovies(savedMovies, search, searchCheckbox);
            setNotFound(filterd.length == 0);
            setMovies(filterd);
            setIsSearching(false);
        }
        else {
            moviesApi.getMovies()
            .then((result) => {
                var filterd = filterUtility.filterMovies(result, search, searchCheckbox);
                setNotFound(filterd.length == 0);
                setMovies(filterd);
                setIsSearching(false);
            }).catch((e) => {
                setIsErrorActive(true);
                setIsSearching(false);
            });
        } 
    }

    function handleMovieSave(movie) {
        mainApi.createMovie(movie)
        .then(()=>{

        }).catch((e) => {
            setIsErrorActive(true);
        });
    }

    function handleDeleteMovie(id) {
        mainApi.deleteMovieById(id)
        .then(()=>{
            mainApi.getSavedMovies()
            .then((result) => {
                setSavedMovies(result);
                setMovies(result);
            }).catch((e) => {
                setIsErrorActive(true);
            });
        }).catch((e) => {
            setIsErrorActive(true);
        });
    }

    React.useEffect(() => {
        setIsSearching(true);
        setIsSearching(false);
        setMovies([]);
        setSavedMovies([]);
        if(props.saved) {
            mainApi.getSavedMovies()
            .then((result) => {
                setSavedMovies(result);
                setMovies(result);
                setIsSearching(false);
            }).catch((e) => {
                setIsErrorActive(true);
                setIsSearching(false);
            });
        } 
        else {
            moviesApi.getMovies()
            .then((result) => {
                setNotFound(result.length == 0);
                setMovies(result);
                setIsSearching(false);
            }).catch((e) => {
                setIsErrorActive(true);
                setIsSearching(false);
            });
        }
    }, [location, history]);

    return (
        <>
            <Header loggedIn={props.loggedIn} main={false} />
            <SearchForm saved={props.saved} onSearchMovies={handleSearchMovies}/>
            <MoviesCardList saved={props.saved} 
            movies={movies} isSearching={isSearching} notFound={notFound} isErrorActive={isErrorActive}
            onMovieSave={handleMovieSave} onDeleteMovie={handleDeleteMovie}/>
            <Footer />
        </>
    )
}
export default Movies;

