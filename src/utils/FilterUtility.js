export const filterMovies = (movies, filterString, shortsCheckbox) => {
    return movies.filter((movie) => {
        if(shortsCheckbox && movie.duration > 40) 
            return false;
        
        return movie.nameRU != 'Не указано' && movie.nameRU?.toLowerCase().trim().indexOf(filterString.toLowerCase().trim()) > -1 ||
        movie.nameEN != 'Не указано' && movie.nameEN?.toLowerCase().trim().indexOf(filterString.toLowerCase().trim()) > -1 ||
        movie.country != 'Не указано' && movie.country?.toLowerCase().trim().indexOf(filterString.toLowerCase().trim()) > -1 ||
        movie.director != 'Не указано' && movie.director?.toLowerCase().trim().indexOf(filterString.toLowerCase().trim()) > -1 ||
        movie.year != 'Не указано' && movie.year?.toLowerCase().trim().indexOf(filterString.toLowerCase().trim()) > -1
    });
}