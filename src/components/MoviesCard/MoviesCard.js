import './MoviesCard.css';
import React from 'react';
import Poster from '../../images/Poster.jpg'

function MoviesCard(props) {

    const [deleteButtonVisible, setDeleteButtonVisible] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    const movie = {
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
        _id: props.movie._id
    }

    const duration = `${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`;

    function handleMouseOnCard() {
        setDeleteButtonVisible(true);
    }

    function handleMouseOutCard() {
        setDeleteButtonVisible(false);
    }

    function handleLikeButtonClick() {
        props.onMovieSave(movie);
        setSaved(true);
    }

    function handleDeleteMovie() {
        props.onDeleteMovie(movie._id);
        setSaved(false);
    }
    
    function handleMovieClick() {
        return saved ? handleDeleteMovie() : handleLikeButtonClick();
      }

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
                {props.saved ?
                    <button className={`movies__list-delete-button ${deleteButtonVisible ? 'movies__list-delete-button_visible' : ''}`}
                        onClick={handleDeleteMovie}></button> :
                    <button
                        className={`movies__list-like-button ${saved ? 'movies__list-like-button_clicked' : ''}`}
                        onClick={handleMovieClick}>
                    </button>}
            </div>
        </li>
    )
}

export default MoviesCard;

