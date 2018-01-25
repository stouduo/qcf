import fetch from './fetch'

export const getUser = (username) => fetch('/user/userinfo', {username: username})


export const login = (user) => fetch('/login', user, 'post');
export const logout = () => fetch('/logout');


export const getImgs = (pageSize, currentPage, type) => fetch('/img/getImgs', {
  pageSize: pageSize,
  currentPage: currentPage,
}, type);

export const delImgs = (ids) => fetch('/img/delImgs', {ids: ids}, 'delete');

export const captcha = () => fetch('/user/captcha')

export const uploadPic = (data,progress) => fetch('/img/uploadPic', {data: data}, 'post',progress);




