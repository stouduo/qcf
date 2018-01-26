import fetch from './fetch'

export const getUser = (username) => fetch('/user/userinfo', {username: username})


export const login = (user) => fetch('/login', user, 'post');
export const logout = () => fetch('/logout');


export const getImgs = (pageSize, currentPage) => fetch('/pic/getPics', {
  pageSize: pageSize,
  currentPage: currentPage,
});

export const delImgs = (ids) => fetch('/pic/delPic', {ids: ids}, 'delete');


export const uploadPic = (data,progress) => fetch('/pic/uploadPic', {data: data}, 'post',progress);




