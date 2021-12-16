import axios from 'axios';
import jsSHA from "jssha";

const API_DOMAIN = "https://ptx.transportdata.tw/MOTC/v2/";
const APP_ID = process.env.VUE_APP_APP_ID;
const APP_KEY = process.env.VUE_APP_APP_KEY;

// APP 授權認證 header
export const authorizationHeader = () => {
  const GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(APP_KEY, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = 'hmac username="' + APP_ID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';

  return { 'Authorization': Authorization, 'X-Date': GMTString };
}

// 參數字串
const createNearByStr = ({ latitude, longitude }, limit = 1000) => (latitude && longitude) ? `&$spatialFilter=nearby(${latitude},${longitude}, ${limit})` : "";
const createSelectByStr = (select) => select.reduce((acc, cur, index) => acc + (index === 0 ? `${cur}` : `, ${cur}`), "&$select=");

// 呼叫 API 的最終 URL
export const urlQueryStr = (dataType, query = { top: null, position: null, select: null, routeName: null }) => {
  let queryStr = "";

  // 總筆數
  if (query.top) queryStr += `&$top=${query.top}`;
  if (!query.top) queryStr += `&$top=30`;           // 安全機制
  
  // 距離過濾
  if (query.position) queryStr += createNearByStr(query.position);

  // 欄位選擇
  if (query.select) queryStr += createSelectByStr(query.select);

  // 針對關鍵字過濾
  // if (query.keyword) queryStr += `&$filter=contains(RouteName/Zh_tw, '${query.keyword}')`;
  
  // 指定路線要全部符合
  // if (query.routeName) queryStr += `&$filter=RouteName/Zh_tw eq '${query.routeName}'`;

  return encodeURI(`${API_DOMAIN}${dataType}?$format=JSON${queryStr}`);
}

// 景觀列表
export const AJAX_getScenicSpot = () => {
  const path = "Tourism/ScenicSpot";
  return axios({
    method: 'get',
    url: urlQueryStr(path),
    headers: authorizationHeader()
  })
}

// 餐廳列表
export const AJAX_getRestaurant = () => {
  const path = "Tourism/Restaurant";
  return axios({
    method: 'get',
    url: urlQueryStr(path),
    headers: authorizationHeader()
  })
}

// 住宿列表
export const AJAX_getHotel = () => {
  const path = "Tourism/Hotel";
  return axios({
    method: 'get',
    url: urlQueryStr(path),
    headers: authorizationHeader()
  })
}

// 活動列表
export const AJAX_getActivity = () => {
  const path = "Tourism/Activity";
  return axios({
    method: 'get',
    url: urlQueryStr(path),
    headers: authorizationHeader()
  })
}