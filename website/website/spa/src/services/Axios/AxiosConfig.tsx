import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '/api';

const AxiosConfig = (contentType: string = 'application/json') => {
    let Axios = axios.create({baseURL});

    const token = localStorage.getItem('token');

    if (token) {
        Axios = axios.create({
            baseURL,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': contentType,
            },
        });
    }

    return Axios;
};

export default AxiosConfig;
