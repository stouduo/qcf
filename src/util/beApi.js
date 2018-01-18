import fetch from './fetch'

export const getUser = (username) => fetch('/user/userinfo', {username: username})


export const login = (user) => fetch('/user/login', user, 'post');
export const logout = () => fetch('/user/logout');


export const getImgs = (pageSize, currentPage, type) => fetch('/img/getImgs', {
  pageSize: pageSize,
  currentPage: currentPage,
  type: type
})

export const delImgs = (ids) => fetch('/img/delImgs', {ids: ids}, 'delete');

export const captcha = () => fetch('/captcha')




