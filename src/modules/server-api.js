import axios from 'axios';

// ---- 與後端 server 交流
const getServerPrefixUrl = (() => {
  const domain = process.env.NODE_ENV === "development" ? 
    process.env.VUE_APP_BACKEND_DEV_DOMAIN : process.env.VUE_APP_BACKEND_DOMAIN;
  return `${domain}/api/v1`;
})();

// 取得本地版本資料
export const AJAX_S_getDetail = (id) => {
  return axios({
    method: 'get',
    url: `${getServerPrefixUrl}/local_item/${id}`,
  });
}

// 取得主題列表
export const AJAX_S_getThemes = () => {
  return axios({
    method: 'get',
    url: `${getServerPrefixUrl}/themes`,
  });
}

// 取得熱門列表
export const AJAX_S_getHots = () => {
  return axios({
    method: 'get',
    url: `${getServerPrefixUrl}/hots`,
  });
}

// 增加計數器 - [addSearch, addEnter, addFavorite, removeFavorite]
export const AJAX_S_postCount = (idsStr, type) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/count/${type}`,
    header: { "Content-Type": "application/json" },
    data: idsStr,
  });
}

// 會員登入
export const AJAX_S_userSignIn = (userParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/users/sign_in`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 會員註冊
export const AJAX_S_userSignUp = (userParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/users`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 會員登出
export const AJAX_S_userSignOut = (userParams) => {
  return axios({
    method: 'delete',
    url: `${getServerPrefixUrl}/users/sign_out`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 取得我的最愛
export const AJAX_S_getFavorites = (userParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/user/favorites`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 更新我的最愛   ps.注意不是 put, 會蓋掉 user, 但 favorites array 本身是整個蓋掉
export const AJAX_S_changeFavorite = (favoritesParams) => {
  return axios({
    method: 'patch',
    url: `${getServerPrefixUrl}/user/favorite/update`,
    header: { "Content-Type": "application/json" },
    data: favoritesParams,
  });
}

// 送出評論
export const AJAX_S_postComment = (commentParams, id) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/local_item/${id}/comment`,
    header: { "Content-Type": "application/json" },
    data: commentParams,
  });
}