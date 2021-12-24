export const determineType = (id) => {
  const type = id.slice(0, 2);
  switch (type) {
    case "C1": return "scenicspots";
    case "C2": return "activities";
    case "C3": return "restaurants";
    case "C4": return "hotels";
    default: return null;
  }
}

export const concatAndAddType = (dataArray) => {
  return dataArray.reduce(
    (collection, res) => {
      res.data.map((data) => data.Type = determineType(data.ID));
      return collection.concat(res.data);
    }, []
  )
}