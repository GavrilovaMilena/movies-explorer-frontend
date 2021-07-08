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
    const [moviesCache, setMoviesCache] = React.useState([]);
    const location = useLocation();
    const history = useHistory();

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    // поиск фильмов 
    function handleSearchMovies(search, searchCheckbox) {
        setIsErrorActive(false);
        setNotFound(false);
        setMovies([]);
        setIsSearching(true);
        if (props.saved) {
            var filterd = filterUtility.filterMovies(savedMovies, search, searchCheckbox);
            setNotFound(filterd.length == 0);
            setMovies(filterd);
            setIsSearching(false);
        }
        else {
            if(moviesCache.length == 0) {
                moviesApi.getMovies()
                .then((result) => {
                    var filterd = filterUtility.filterMovies(result, search, searchCheckbox);
                    setNotFound(filterd.length == 0);
                    setMoviesCache(filterd);
                    setMovies(filterd);
                    setIsSearching(false);
                }).catch((e) => {
                    setIsErrorActive(true);
                    setIsSearching(false);
                });
            }
            else {
                var filterd = filterUtility.filterMovies(moviesCache, search, searchCheckbox);
                setNotFound(filterd.length == 0);
                setMovies(filterd);
                setIsSearching(false);
            }
        }
    }

    function handleMovieSave(movie) {
        moviesCache.forEach(m => {
            if(m.id == movie.movieId) {
                m.saveInProgress = true;
            }
        });
        movies.forEach(m => {
            if(m.id == movie.movieId) {
                m.saveInProgress = true;
            }   
        });
        setMoviesCache(moviesCache);
        setMovies(movies);
        forceUpdate();

        mainApi.createMovie(movie)
            .then((result) => {
                updateCard(movie, result._id);
            }).catch((e) => {
                setIsErrorActive(true);
            });
    }

    function updateCard(movie, id) {
        moviesCache.forEach(m => {
            if(m.id == movie.movieId) {
                m._id = id;
                m.saved = true;
                m.saveInProgress = false;
            }
        });
        movies.forEach(m => {
            if(m.id == movie.movieId) {
                m._id = id;
                m.saved = true;
                m.saveInProgress = false;
            }   
        });
        setMoviesCache(moviesCache);
        setMovies(movies);
        forceUpdate();
    }

    function handleDeleteMovie(id) {
        forceUpdate();
        mainApi.deleteMovieById(id)
            .then(() => {
                if (props.saved)
                    mainApi.getSavedMovies()
                        .then((result) => {
                            setSavedMovies(result);
                            setMovies(result);
                        }).catch((e) => {
                            setIsErrorActive(true);
                        });
                else {
                    moviesCache.forEach(m => {
                        if(m._id == id) {
                            m.saveInProgress = false;
                            m.saved = false;
                            m._id = null;
                        }
                    });
                    movies.forEach(m => {
                        if(m._id == id) {
                            m.saveInProgress = false;
                            m.saved = false;
                            m._id = null;
                        }   
                    });
                    setMoviesCache(moviesCache);
                    setMovies(movies);
                    forceUpdate();
                }
                    
            }).catch((e) => {
                setIsErrorActive(true);
            });
    }

    React.useEffect(() => {
        setIsSearching(true);
        setMovies([]);
        setMoviesCache([]);
        setSavedMovies([]);
        if (props.saved) {
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
            setIsSearching(false);
        }
    }, [location, history]);

    return (
        <>
            <Header loggedIn={props.loggedIn} main={false} />
            <SearchForm saved={props.saved} onSearchMovies={handleSearchMovies} />
            <MoviesCardList
                saved={props.saved}
                movies={movies}
                isSearching={isSearching}
                notFound={notFound}
                isErrorActive={isErrorActive}
                onMovieSave={handleMovieSave}
                onDeleteMovie={handleDeleteMovie}
            />
            <Footer />
        </>
    )
}
export default Movies;

