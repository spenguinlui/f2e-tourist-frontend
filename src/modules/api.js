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

const determineType = (id) => {
  const type = id.slice(0, 2);
  switch (type) {
    case "C1": return "Tourism/ScenicSpot";
    case "C2": return "Tourism/Activity";
    case "C3": return "Tourism/Restaurant";
    case "C4": return "Tourism/Hotel";
    default: return null;
  }
}

// 呼叫 API 的最終 URL
export const urlQueryStr = (
    dataType,
    query = {
      top: 30, select: null, position: null,                  // 一般過濾條件
      id: null, keyword: null, town: null, ids: [], tags: []  // 特殊過濾條件(只能取一)
    }
  ) => {
  // 只要沒給限制就是 30筆
  query.top = query.top || 30; 
  
  let queryStr = "";
  
  // 總筆數
  if (query.top) queryStr += `&$top=${query.top}`;
  
  // 距離過濾
  if (query.position) queryStr += createNearByStr(query.position);
  
  // 欄位選擇
  if (query.select) queryStr += createSelectByStr(query.select);

  // 指定資料過濾
  if (query.id) queryStr += `&$filter=ID eq '${query.id}'`;

  // 地區過濾
  if (query.town) queryStr += `&$filter=contains(Address, '${query.town}')`;
  
  // 針對關鍵字過濾
  if (query.keyword) queryStr += `&$filter=contains(Name, '${query.keyword}') or contains(Description, '${query.keyword}')`;

  // Tag 關鍵字過濾
  if (query.tags) {
    queryStr += query.tags.reduce(
      (tagsStr, cur, i) => {
        if (i !== 0) tagsStr += ' or ';
        tagsStr += `contains(Name, '${cur}') or contains(Description, '${cur}')`;
        return tagsStr;
      }, "&$filter="
    )
  }

  // 多 ID 搜尋
  if (query.ids) { 
    queryStr += query.ids.reduce(
      (idsStr, cur, i) => {
        if (i !== 0) idsStr += ' or ';
        idsStr += `contains(ID, '${cur}')`;
        return idsStr;
      }, "&$filter="
    )
  }

  return encodeURI(`${API_DOMAIN}${dataType}?$format=JSON${queryStr}`);
};

// 景觀列表
export const AJAX_getScenicSpot = ({ keyword, townName, ids, tags, position }) => {
  const path = "Tourism/ScenicSpot";
  return axios({
    method: 'get',
    url: urlQueryStr(path, { keyword, town: townName, ids, tags, position }),
    headers: authorizationHeader()
  })
}

// 餐廳列表
export const AJAX_getRestaurant = ({ keyword, townName, ids, tags, position }) => {
  const path = "Tourism/Restaurant";
  return axios({
    method: 'get',
    url: urlQueryStr(path, { keyword, town: townName, ids, tags, position }),
    headers: authorizationHeader()
  })
}

// 住宿列表
export const AJAX_getHotel = ({ keyword, townName, ids, tags, position }) => {
  const path = "Tourism/Hotel";
  return axios({
    method: 'get',
    url: urlQueryStr(path, { keyword, town: townName, ids, tags, position }),
    headers: authorizationHeader()
  })
}

// 活動列表
export const AJAX_getActivity = ({ keyword, townName, ids, tags, position }) => {
  const path = "Tourism/Activity";
  return axios({
    method: 'get',
    url: urlQueryStr(path, { keyword, town: townName , ids, tags, position }),
    headers: authorizationHeader()
  })
}

// 指定項目細節
export const AJAX_getDetail = ({ id }) => {
  const path = determineType(id);
  if (!determineType) console.log(`AJAX_getDetail 失敗, ID: ${id} 不正確`);
  return axios({
    method: 'get',
    url: urlQueryStr(path, { id: id }),
    headers: authorizationHeader()
  })
}