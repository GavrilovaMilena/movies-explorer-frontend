import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from "../Preloader/Preloader";
import React from "react";

function MoviesCardList(props) {

    const [сardsNumber, setCardsNumber] = React.useState(() => {
        const windowSize = window.innerWidth;
        if (windowSize < 720) {
            return 5
        } else if (windowSize < 920) {
            return 8
        } else if (windowSize < 1279) {
            return 12
        }
        else {
            return 12
        }
    });

    const [moreCards, setMoreCards] = React.useState(() => {
        const windowSize = window.innerWidth;
        if (windowSize < 720) {
            return 2;
        } else if (windowSize < 920) {
            return 2
        } else if (windowSize < 1279) {
            return 3
        }
        else {
            return 3;
        }
    });

    function handleWidthScreen() {
        const windowSize = window.innerWidth;
        if (windowSize < 720) {
            setCardsNumber(5)
        } else if (windowSize < 920) {
            setCardsNumber(8)
        } else if (windowSize < 1279) {
            setCardsNumber(12)
        }
    }

    const displayed = props.saved ? props.movies : props.movies?.slice(0, сardsNumber);

    function handleMoviesMore() {
        let more = moreCards;
        setCardsNumber(prevState => { 
            return prevState + more;
        });
    }

    function handleMovieSave(movie) {
        props.onMovieSave(movie);
    }

    function handleDeleteMovie(id) {
        props.onDeleteMovie(id);
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleWidthScreen);
    }, []);

    return (
        <section className='movies'>
            <Preloader isSearching={props.isSearching} />

            <span className={`movies__error ${props.isErrorActive ? ''
                : 'no'}`}>
                Упс... произошла ошибка. Проблема с соединением или сервером. Пожалуйста, попробуйте ещё раз.
            </span>
            <span className={`movies__not-found ${props.notFound ? ''
                : 'no'}`}>
                Ой! Ничего не найдено.
            </span>
            <span className={`movies__no-saved ${(props.saved && props.movies?.length === 0) ? ''
                : 'no'}`}>
                Вам еще ничего не понравилось :(
            </span>

            <ul className='movies__list'>
                {displayed?.map((movie) => {
                    return (
                        <MoviesCard
                            onMovieSave={handleMovieSave}
                            onDeleteMovie={handleDeleteMovie}
                            movie={movie}
                            saved={props.saved}
                        />
                    )
                })
                }
            </ul>
            <button
                className={props.saved ? 'movies__more-button movies__more-button_invisible' :
                    `movies__more-button ${props.movies?.length === displayed?.length ? 'movies__more-button_invisible' : ''}`}
                onClick={handleMoviesMore}
            >Еще</button>
        </section>
    )
}

export default MoviesCardList;
