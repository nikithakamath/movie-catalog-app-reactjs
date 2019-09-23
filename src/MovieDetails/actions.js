import ApiServices from '../_services/ApiServices';

const MovieDetailsActions = {
    getMovieDetails: (id) =>{
        return ApiServices.get(`/movie/details?movie_id=${id}`);
    },
}

export default MovieDetailsActions;
