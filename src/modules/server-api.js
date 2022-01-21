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

// 取得一列表內每項目的評分
export const AJAX_S_getScoreByDataList = (idsStr) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/local_items/average_scores`,
    header: { "Content-Type": "application/json" },
    data: idsStr,
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
    url: `${getServerPrefixUrl}/user/sign_in`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 會員註冊
export const AJAX_S_userSignUp = (userParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/user/sign_up`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 會員登出
export const AJAX_S_userSignOut = (userParams) => {
  return axios({
    method: 'delete',
    url: `${getServerPrefixUrl}/user/sign_out`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 檢查會員
export const AJAX_S_userCheck = (userParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/user/check`,
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

// 確認廠商
export const AJAX_S_checkSupplierLogin = (supplierParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/supplier/check`,
    header: { "Content-Type": "application/json" },
    data: supplierParams,
  })
}

// 廠商登入
export const AJAX_S_supplierSignIn = (supplierParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/supplier/sign_in`,
    header: { "Content-Type": "application/json" },
    data: supplierParams,
  });
}

// 廠商登出
export const AJAX_S_supplierSignOut = (supplierParams) => {
  return axios({
    method: 'delete',
    url: `${getServerPrefixUrl}/supplier/sign_out`,
    header: { "Content-Type": "application/json" },
    data: supplierParams,
  });
}

// 確認管理者是否登入
export const AJAX_S_checkAdminLogin = (adminParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/admin/check`,
    header: { "Content-Type": "application/json" },
    data: adminParams,
  })
}

// 管理者登入
export const AJAX_S_adminSignIn = (adminParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/admin/sign_in`,
    header: { "Content-Type": "application/json" },
    data: adminParams,
  });
}

// 主題修改
export const AJAX_S_patchTheme = (themeId, themeParams) => {
  return axios({
    method: 'patch',
    url: `${getServerPrefixUrl}/admin/themes/${themeId}`,
    header: { "Content-Type": "application/json" },
    data: themeParams,
  });
}

// 主題新增
export const AJAX_S_addTheme = (themeParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/admin/themes`,
    header: { "Content-Type": "application/json" },
    data: themeParams,
  });
}

// 主題刪除
export const AJAX_S_deleteTheme = (themeParams) => {
  return axios({
    method: 'delete',
    url: `${getServerPrefixUrl}/admin/themes/${themeParams.id}`,
    header: { "Content-Type": "application/json" },
    data: themeParams,
  });
}

// 使用者列表
export const AJAX_S_getUsers = (userParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/admin/userslist`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 取得設定參數列表
export const AJAX_S_getSetting = (userParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/admin/setting`,
    header: { "Content-Type": "application/json" },
    data: userParams,
  });
}

// 修改設定參數
export const AJAX_S_patchSetting = (settingParams) => {
  return axios({
    method: 'patch',
    url: `${getServerPrefixUrl}/admin/setting/${settingParams.settingId}`,
    header: { "Content-Type": "application/json" },
    data: settingParams,
  });
}

// 取得廠商資料
export const AJAX_S_getSupppliers = (supplierParams) => {
  return axios({
    method: 'post',
    url: `${getServerPrefixUrl}/admin/supplierlist`,
    header: { "Content-Type": "application/json" },
    data: supplierParams,
  });
}