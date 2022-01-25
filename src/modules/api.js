import axios from 'axios';
import jsSHA from "jssha";
import { determineTypeByID, createCommonIDAndName, determineType, addCommentScore, concatAndAddType } from "@/modules/data-support";
import { AJAX_S_getScoreByDataList } from "@/modules/server-api";

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
const createSelectByStr = (path, select) => {
  if (select.length !== 0) {
    let str = select.reduce((acc, cur, index) => acc + (index === 0 ? `${cur}` : `,${cur}`), "&$select=");
    str += `,${path}ID,${path}Name`;
    if (path === 'ScenicSpot') {
      str += ',Class1,Class2,Class3';
    } else if (path == 'Activity') {
      str += ',Class1, Class2';
    } else {
      str += ',Class';
    }
    return str;
  } else {
    return '';
  }
};


// 呼叫 API 的最終 URL
export const urlQueryStr = (
  path,
  {
    // 一般格式條件
    top = 30, select = [], position = null,
    skips = {
      scenicspots: 0,
      restaurants: 0,
      hotels: 0,
      activities: 0
    },
    dataType = "all",
    // 唯一過濾條件
    id = "", 
    // 特殊過濾條件
    keyword = "", townName = "", ids = [], tags = [], classType = ""
  } = {}
  ) => {
  
  let queryStr = "";
  
  // 總筆數
  if (top) queryStr += `&$top=${top}`;

  // 位移量
  if (typeof skips !== "undefined") {
    if (skips[dataType]) queryStr += `&$skip=${skips[dataType]}`;
  }
  
  // 欄位選擇
  if (select) queryStr += createSelectByStr(path, select);

  // 距離過濾
  if (position) queryStr += createNearByStr(position);

  // 指定資料過濾
  if (id) queryStr += `&$filter=${path}ID eq '${id}'`;

  // 是否有特殊條件
  if (keyword || townName || ids.length > 0 || tags.length > 0 || classType) {
    queryStr += "&$filter="
  }

  // 地區過濾
  if (townName) {
    if (queryStr.indexOf("$filter=(contains") > 0)
      queryStr += `and (contains(Address, '${townName}'))`;
    else
      queryStr += `(contains(Address, '${townName}'))`;
  }
  
  // 針對關鍵字過濾
  if (keyword) {
    if (queryStr.indexOf("$filter=(contains") > 0)
      queryStr += `and (contains(${path}Name, '${keyword}') or contains(Description, '${keyword}'))`;
    else
      queryStr += `(contains(${path}Name, '${keyword}') or contains(Description, '${keyword}'))`;
  }

  // Tag 關鍵字過濾
  if (tags) {
    if (tags.length !== 0) {
      let tagStr = "";
      if (queryStr.indexOf("$filter=(contains") > 0) {
        tagStr += "and ("
      } else {
        tagStr += "("
      }
      tagStr +=
        tags.reduce(
          (tagsStr, cur, i) => {
            if (i !== 0) tagsStr += ' or ';
            tagsStr += `contains(${path}Name, '${cur}') or contains(Description, '${cur}')`;
            return tagsStr;
          }, ""
        );
      tagStr += ")"
      queryStr += tagStr;
    }
  }

  // 多 ID 搜尋
  if (ids) { 
    if (ids.length !== 0) {
      let idsStr = "";
      if (queryStr.indexOf("$filter=(contains") > 0) {
        idsStr += "and ("
      } else {
        idsStr += "("
      }
      idsStr +=
        ids.reduce(
          (idsStr, cur, i) => {
            if (i !== 0) idsStr += ' or ';
            idsStr += `contains(${path}ID, '${cur}')`;
            return idsStr;
          }, ""
        );
      idsStr += ")"
      queryStr += idsStr;
    }
  }

  // Class 類型過濾
  if (classType) {
    let classStr = "";
    if (queryStr.indexOf("$filter=(contains") > 0) {
      classStr += "and ("
    } else {
      classStr += "("
    }
    if (dataType === "scenicspots") {
      classStr 
        += `contains(Class1, '${classType}')`
        +  ` or contains(Class2, '${classType}')`
        +  ` or contains(Class3, '${classType}')`;
    } else {
      classStr += `contains(Class, '${classType}')`;
    }
    classStr += ")"
    queryStr += classStr;
  }

  return encodeURI(`${API_DOMAIN}${path}?$format=JSON${queryStr}`);
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

// 指定項目精簡版
export const AJAX_getOneData = (id) => {
  const path = determineTypeByID(id);
  return axios({
    method: 'get',
    url: urlQueryStr(path, { id: id, select: ['Picture'] }),
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
    default: targetAjax = false;                  break;
  }
  return targetAjax;
}

// 決定 ajax 類型
const determineAjaxType = (query) => {
  const { dataType } = query;

  // 確認是要單一資料還是多類型
  if (dataType === "all") {
    return Promise.all([
      AJAX_getScenicSpot(query),
      AJAX_getRestaurant(query),
      AJAX_getHotel(query),
      AJAX_getActivity(query)
    ]);
  } else {
    let axiosFunc = getSingleType_AJAX(dataType);
    if (!axiosFunc) throw `dataType: ${dataType}, 不是列舉的值!`;
    return axiosFunc(query);
  }
}

// 啟用 ajax 要資料
export const triggerAjax = (query, _callbackFunc, _errorFunc) => {
  determineAjaxType(query)
  .then(res => {
    let resDataList = [];

    // 單類型與多類型資料要分別處理過
    if (res instanceof Array) {
      if (typeof query.skips !== "undefined") {
        query.skips["scenicspots"] += res[0].data.length;
        query.skips["restaurants"] += res[1].data.length;
        query.skips["hotels"] += res[2].data.length;
        query.skips["activities"] += res[3].data.length;
      }
      resDataList = concatAndAddType(res);
    } else {
      if (typeof query.skips !== "undefined") {
        query.skips[query.dataType] += res.data.length;
      }
      resDataList = res.data.map(data => createCommonIDAndName(data));
    }
    
    // 向後端 api 取得評分數據
    const ids = resDataList.map(data => data[`${determineType(data)}ID`]);
    AJAX_S_getScoreByDataList({ ids })
    .then(scoreRes => {
      const dataList = addCommentScore(resDataList, scoreRes.data.average_scores);
      _callbackFunc(dataList, query, ids);
    })
  })
  .catch(error => {
    _errorFunc(error);
  })
}