import './Footer.css';

function Footer() {
    return (
        <section className='footer'>
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__nav'>
                <p className='footer__copyright'>{`@ 2020 - ${new Date().getFullYear()}`}</p>
                <ul className='footer__links'>
                    <li className='footer__links-item'>
                        <a className='footer__link' href='https://praktikum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className='footer__links-item'>
                        <a className='footer__link' href='https://github.com/yandex-praktikum' target='_blank' rel="noreferrer">Github</a>
                    </li>
                    <li className='footer__links-item'>
                        <a className='footer__link' href='https://www.facebook.com/yandex.praktikum/' target='_blank' rel="noreferrer">Facebook</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Footer;