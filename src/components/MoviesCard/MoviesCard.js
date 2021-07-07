import './MoviesCard.css';
import React from 'react';
import Poster from '../../images/Poster.jpg'

function MoviesCard(props) {

    const [deleteButtonVisible, setDeleteButtonVisible] = React.useState(false);

    let movie = {
        country: props.movie.country || 'Не указано',
        director: props.movie.director || 'Не указано',
        duration: props.movie.duration || 0,
        year: props.movie.year || 'Не указано',
        description: props.movie.description || 'Не указано',
        image: props.movie.image === null || !props.saved && !props.movie.image.url ?
            `${Poster}` :
            (props.saved ? props.movie.image : 'https://api.nomoreparties.co' + props.movie.image?.url),
        trailer: props.saved ? props.movie.trailer : props.movie.trailerLink,
        nameRU: props.movie.nameRU || 'Не указано',
        nameEN: props.movie.nameEN || 'Не указано',
        thumbnail: props.saved && props.movie.thumbnail === null || !props.saved && props.movie.image === null ?
            `${Poster}` :
            (props.saved ? props.movie.thumbnail : 'https://api.nomoreparties.co' + props.movie.image?.formats?.thumbnail?.url),
        movieId: props.saved ? props.movie.movieId : props.movie.id,
        _id: props.movie._id,
        saved: props.movie.saved,
        saveInProgress: props.movie.saveInProgress
    }

    const duration = `${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`;

    function handleMouseOnCard() {
        setDeleteButtonVisible(true);
    }

    function handleMouseOutCard() {
        setDeleteButtonVisible(false);
    }

    function handleLikeButtonClick() {
        movie.saveInProgress = true;
        props.onMovieSave(movie);
    }

    function handleDeleteMovie() {
        props.onDeleteMovie(movie._id);
        movie.saveInProgress = false;
        movie.saved = false;
    }

    function handleMovieClick() {
        return movie.saved ? handleDeleteMovie() : handleLikeButtonClick();
    }


    let buttons = movie.saveInProgress ?
        (<button
            disabled={`true`}
            className={`movies__list-like-button movies__list-like-button_in-progress`}>
                Сохранение
        </button>)
        :
        (props.saved ?
            <button className={`movies__list-delete-button ${deleteButtonVisible ? 'movies__list-delete-button_visible' : ''}`}
                onClick={handleDeleteMovie}></button> :
            <button
                className={`movies__list-like-button ${movie.saved ? 'movies__list-like-button_clicked' : ''}`}
                onClick={handleMovieClick}>
            </button>);

    return (

        <li className='movies__list-item'>
            <div
                className='movies__list_description'
                onMouseEnter={handleMouseOnCard}
                onMouseLeave={handleMouseOutCard}>
                <div className='movies__list_text'>
                    <h3 className='movies__list_title'>{movie.nameRU}</h3>
                    <p className='movies__list_duration'>{duration}</p>
                </div>
                <a href={movie.trailer} target="_blank" className="movies__trailer_link">
                    <img alt={movie.nameRU} src={movie.image} className="movies__list_poster" />
                </a>
                {buttons}
            </div>
        </li>
    )
}

export default MoviesCard;

