import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <p className='portfolio__title'>Портфолио</p>
            <ul className='portfolio__links'>
                <li className='portfolio__links_item'>
                    <a className='portfolio__link' href='https://gavrilovamilena.github.io/how-to-learn/' target='_blank' rel="noreferrer">Статичный сайт</a>
                </li>
                <li className='portfolio__links_item'>
                    <a className='portfolio__link' href='https://gavrilovamilena.github.io/russian-travel/index.html' target='_blank' rel="noreferrer">Адаптивный сайт</a>
                </li>
                <li className='portfolio__links_item'>
                    <a className='portfolio__link' href='https://mlngvr.nomoredomains.club/' target='_blank' rel="noreferrer">Одностраничное приложение</a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;