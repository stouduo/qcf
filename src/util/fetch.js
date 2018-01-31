import axios from '../config/axios'


export default async (url = '', data = {}, type = 'get', config) => {
  let params;
  if (!config || !config.onUploadProgress) {
    params = new URLSearchParams();
    for (let key in data) {
      params.append(key, data[key]);
    }
  } else {
    params = new FormData();
    params.append('pic', data);
  }
  switch (type) {
    case 'post':
      return await axios.post(url, params, config);
      break;
    case 'put':
      return await axios.put(url, {params:params});
      break;
    case 'delete':
      return await axios.delete(url, {params:params});
      break;
    default:
      return await axios.get(url, {params:params});
  }
};
