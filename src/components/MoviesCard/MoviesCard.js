import './MoviesCard.css';
import React from 'react';
import Poster from '../../images/Poster.svg'

function MoviesCard(props) {

    const [deleteButton, setDeleteButton] = React.useState(false);
    const [liked, setLiked] = React.useState(false);

    function handleMouseOnCard() {
        setDeleteButton(true);
    }

    function handleMouseOutCard() {
        setDeleteButton(false);
    }

    function handleLikeButtonCLick() {
        setLiked(!liked);
    }

    return (
        <li className='movies__list-item'>
            <div className='movies__list_description' onMouseEnter={handleMouseOnCard} onMouseLeave={handleMouseOutCard}>
                <div className='movies__list_text'>
                    <h3 className='movies__list_title'>В погоне за Бенкси</h3>
                    <p className='movies__list_duration'>27 минут</p>
                </div>
                <img className='movies__list_poster' src={Poster} alt='Постер фильма' />
                {props.saved ?
                    <button className={`movies__list-delete-button ${deleteButton ? 'movies__list-delete-button_visible' : ''}`}></button> :
                    <button className={`movies__list-like-button ${liked ? 'movies__list-like-button_clicked' : ''}`} onClick={handleLikeButtonCLick}></button>}
            </div>
        </li>
    )
}

export default MoviesCard;