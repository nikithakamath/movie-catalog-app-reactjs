import ApiServices from '../../_services/ApiServices';

const AuthActions = {
    userLogin: (credentials, token) => {
        return ApiServices.post('/auth/login', credentials, token);
    },
    userSignUp: (credentials, token) => {
        return ApiServices.post('/auth/signup', credentials, token);
    },
}

export default AuthActions;
