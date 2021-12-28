import L from 'leaflet';
import scenicspotIcon from "@/assets/images/icon/spot-marker.svg";
import foodIcon from "@/assets/images/icon/food-marker.svg";
import hotelIcon from "@/assets/images/icon/hotel-marker.svg";
import noImage from "@/assets/images/empty-img.png";

import { determineTypeByID } from "./data-support";

export const determineIcon = (id) => {
  const type = determineTypeByID(id);
  const icon = (type) => {
    switch (type) {
      case "ScenicSpot": return scenicspotIcon;
      case "Activity": return scenicspotIcon;
      case "Restaurant": return foodIcon;
      case "Hotel": return hotelIcon;
      default: return null;
    }
  }
  return L.icon({
    iconUrl: icon(type),
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });
}

export const createMarkerPopupObj = (data) => {
  return `
  <div class="card-img">
    <img
      style="width: 100%;"
      src="${(data.Picture && data.Picture.PictureUrl1) ? data.Picture.PictureUrl1 : noImage}"
      alt="${(data.Picture && data.Picture.PictureDescription1) ? data.Picture.PictureDescription1 : 'no-image'}">
    <h5 class="card-content-title">${data.Name}</h5>
  </div>
  `
};