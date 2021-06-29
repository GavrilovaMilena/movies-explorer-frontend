import './NotFound.css';
import { Link, useHistory } from 'react-router-dom';

function NotFound() {

    const history = useHistory();

    function handleLink() {
        history.goBack()
    }

    return (
        <section className='error'>
            <h2 className='error__title'>404</h2>
            <p className='error__subtitle'>Страница не найдена</p>
            <Link 
            to='' 
            className='error__link'
            onClick={handleLink}
            >Назад</Link>
        </section>
    )
}

export default NotFound;
