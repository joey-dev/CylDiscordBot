import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://10.0.0.2/api' : '/api';

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
