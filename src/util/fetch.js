import axios from '../config/axios'


export default async (url = '', data = {}, type = 'get', progress) => {
  type = type || 'get';
  return await axios({
    type: type,
    url: url,
    data: data,
    onUploadProgress: progress
  });
};
