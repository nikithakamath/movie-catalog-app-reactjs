import { authHeader } from '../_helpers'
const API_URL = process.env.REACT_APP_API_URL;

const ApiServices = {
    get: function (url) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return this.fetch(url, requestOptions);
    },
    post: function (url,body, token=null ) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization':  token ? 'Bearer ' + token : authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        console.log(requestOptions);
        return this.fetch(url, requestOptions);
    },
    fetch: function (url, requestOptions) {
        return fetch(API_URL + url, requestOptions).then(this.handleResponse);
    },
    handleResponse: function (response) {
        return response.text().then((text) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    this.logout();
                    //location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    },
    logout: function() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }
}

export default ApiServices;
