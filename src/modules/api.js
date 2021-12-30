import axios from 'axios';
import jsSHA from "jssha";
import { determineTypeByID } from "./data-support";

const API_DOMAIN = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
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
export const urlQueryStr = (
    dataType,
    query = {
      // 一般過濾條件
      top: 0, select: [], position: null, skip: 0,
      // 特殊過濾條件(只能取一)
      id: "", keyword: "", townName: "", ids: [], tags: [], classObject: null
    }
  ) => {
  // 只要沒給限制就是 30筆
  query.top = query.top || 30; 
  
  let queryStr = "";
  
  // 總筆數
  if (query.top) queryStr += `&$top=${query.top}`;

  // 位移量
  if (query.skip) queryStr += `&$skip=${query.skip}`;
  
  // 距離過濾
  if (query.position) queryStr += createNearByStr(query.position);
  
  // 欄位選擇
  if (query.select) queryStr += createSelectByStr(query.select);

  // 指定資料過濾
  if (query.id) queryStr += `&$filter=${dataType}ID eq '${query.id}'`;

  // 地區過濾
  if (query.townName) queryStr += `&$filter=contains(Address, '${query.townName}')`;
  
  // 針對關鍵字過濾
  if (query.keyword) queryStr += `&$filter=contains(${dataType}Name, '${query.keyword}') or contains(Description, '${query.keyword}')`;

  // Tag 關鍵字過濾
  if (query.tags) {
    queryStr += query.tags.reduce(
      (tagsStr, cur, i) => {
        if (i !== 0) tagsStr += ' or ';
        tagsStr += `contains(${dataType}Name, '${cur}') or contains(Description, '${cur}')`;
        return tagsStr;
      }, "&$filter="
    )
  }

  // 多 ID 搜尋
  if (query.ids) { 
    queryStr += query.ids.reduce(
      (idsStr, cur, i) => {
        if (i !== 0) idsStr += ' or ';
        idsStr += `contains(${dataType}ID, '${cur}')`;
        return idsStr;
      }, "&$filter="
    )
  }

  // Class 類型過濾
  if (query.classObject) {
    if (query.classObject.dataType === "scenicspots") {
      queryStr 
        += `&$filter=contains(Class1, '${query.classObject.classType}')`
        +  ` or contains(Class2, '${query.classObject.classType}')`
        +  ` or contains(Class3, '${query.classObject.classType}')`;
    } else {
      queryStr += `&$filter=contains(Class, '${query.classObject.classType}')`;
    }
  }

  return encodeURI(`${API_DOMAIN}${dataType}?$format=JSON${queryStr}`);
};

// 景觀列表
export const AJAX_getScenicSpot = (query) => {
  const path = "ScenicSpot";
  return axios({
    method: 'get',
    url: urlQueryStr(path, query),
    headers: authorizationHeader()
  })
}

// 餐廳列表
export const AJAX_getRestaurant = (query) => {
  const path = "Restaurant";
  return axios({
    method: 'get',
    url: urlQueryStr(path, query),
    headers: authorizationHeader()
  })
}

// 住宿列表
export const AJAX_getHotel = (query) => {
  const path = "Hotel";
  return axios({
    method: 'get',
    url: urlQueryStr(path, query),
    headers: authorizationHeader()
  })
}

// 活動列表
export const AJAX_getActivity = (query) => {
  const path = "Activity";
  return axios({
    method: 'get',
    url: urlQueryStr(path, query),
    headers: authorizationHeader()
  })
}

// 指定項目細節
export const AJAX_getDetail = ({ id }) => {
  const path = determineTypeByID(id);
  return axios({
    method: 'get',
    url: urlQueryStr(path, { id: id }),
    headers: authorizationHeader()
  })
}

// 根據類型決定指定 API
export const getSingleType_AJAX = (dataType) => {
  const ajaxList = [
    AJAX_getScenicSpot, AJAX_getRestaurant, AJAX_getHotel, AJAX_getActivity
  ];
  let targetAjax;
  switch (dataType) {
    case "scenicspots": targetAjax = ajaxList[0]; break;
    case "restaurants": targetAjax = ajaxList[1]; break;
    case "hotels": targetAjax = ajaxList[2];      break;
    case "activities": targetAjax = ajaxList[3];  break;
    default: targetAjax = ajaxList[0];            break;
  }
  return targetAjax;
}

// ---- 與後端 server 交流
export const getThemes_AJAX_S = () => {
  const domain = process.env.NODE_ENV === "development" ? 
    process.env.VUE_APP_BACKEND_DEV_DOMAIN : process.env.VUE_APP_BACKEND_DOMAIN;
  return axios({
    method: 'get',
    url: `${domain}/api/v1/themes`,
    // withCredentials: true
  })
}
