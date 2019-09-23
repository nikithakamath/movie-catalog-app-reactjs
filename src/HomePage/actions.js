import ApiServices from '../_services/ApiServices';

const HomeActions = {
    getMovieList: ()=>{
        return ApiServices.get('/movie');
    },
}

export default HomeActions;
