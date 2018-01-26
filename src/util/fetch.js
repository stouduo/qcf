import axios from '../config/axios'


export default async (url = '', data = {}, type = 'get', progress) => {
  let params;
  if (!progress) {
    params = new URLSearchParams();
    for (let key in data) {
      params.append(key, data[key]);
    }
  } else
    params = data;
  switch (type) {
    case 'post':
      return await axios.post(url, params, {onUploadProgress: progress});
      break;
    case 'put':
      return await axios.put(url, params);
      break;
    case 'delete':
      return await axios.delete(url, params);
      break;
    default:
      return await axios.get(url, params);
  }
};
