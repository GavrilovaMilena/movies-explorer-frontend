// BASE_URL;
const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

// getMovies
export function getMovies() {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}