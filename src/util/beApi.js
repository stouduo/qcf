import fetch from './fetch'

export const getUser = (username) => fetch('/user/userinfo', {username: username})


export const login = (user) => fetch('/login', user, 'post');
export const logout = () => fetch('/logout');


export const getImgs = (pageSize, curPage) => fetch('/pic/getPics', {
  pageSize: pageSize,
  curPage: curPage,
});

export const delImgs = (ids) => fetch('/pic/delPic', {ids: ids}, 'delete');


export const uploadPic = (data, progress) => fetch('/pic/uploadPic', data, 'post', {
  headers:{'Content-Type':'multipart/form-data'},
  onUploadProgress: progress,
});




