import './Promo.css';
import Earth from '../../images/Earth.svg';

function Promo() {
    return (
        <section className='promo'>
            <div className='promo__description'>
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <button className='promo__button'>
                    <a href="#description" className='promo__button-text'>Узнать больше</a>
                </button>
            </div>
            <img className='promo__image rotation' src={Earth} alt='Планета Земля' />
        </section>
    )
}

export default Promo;