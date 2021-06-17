import './AboutMe.css';
import Me from '../../images/Me.jpg';

function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__description'>
                <div className='about-me__description_text'>
                    <h2 className='about-me__description_name'>Милена</h2>
                    <h3 className='about-me__description_subtitle'>Фронтенд-разработчик, 21 год</h3>
                    <p className='about-me__description_aboute'>Я родилась и живу во Владимире. Яндекс.Практикум - моё первое знакомство с веб-разработкой.</p>
                    <a className='about-me__description_link' href='https://www.instagram.com/mlngvr/' target='_blank' rel="noreferrer">Instagram</a>
                    <a className='about-me__description_link' href='https://github.com/GavrilovaMilena' target='_blank' rel="noreferrer">Github</a>
                </div>
                <img className='about-me__description_photo' src={Me} alt='Фото студента'/>
            </div>
        </section>
    )
}

export default AboutMe;