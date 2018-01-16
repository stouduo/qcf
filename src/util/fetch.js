import axios from '../config/axios'


export default async (url = '', data = {}, type = 'get', method = 'fetch') => {
    type = type||'get';
    return await axios({
        type: type,
        url: url,
        data: data
    });
};