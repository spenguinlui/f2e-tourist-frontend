export const determineType = (data) => {
  if (data.ScenicSpotID) {
    return "ScenicSpot";
  } else if (data.RestaurantID) {
    return "Restaurant";
  } else if (data.HotelID) {
    return "Hotel";
  } else if (data.ActivityID) {
    return "Activity";
  } else {
    return null;
  }
}

export const determineTypeByID = (id) => {
  const type = id.slice(0, 2);
  switch (type) {
    case "C1": return "ScenicSpot";
    case "C2": return "Activity";
    case "C3": return "Restaurant";
    case "C4": return "Hotel";
    default: return null;
  }
}

export const createCommonIDAndName = (data) => {
  const dataType = determineType(data);
  data.Type = dataType;
  data.ID = data[`${dataType}ID`];
  data.Name = data[`${dataType}Name`];
  return data;
}


export const concatAndAddType = (dataArray) => {
  return dataArray.reduce(
    (collection, res) => {
      res.data.map((data) => createCommonIDAndName(data));
      return collection.concat(res.data);
    }, []
  )
}