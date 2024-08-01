import axios from "axios";
import { locationStore } from "../store";

export const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  async function showPosition(position: {
    coords: { longitude: number; latitude: number };
  }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${
      import.meta.env.VITE_GEOCODING_API
    }`;
    const locationApi = await axios.get(url);
    if (locationApi) {
      locationStore.dispatch({
        type: "STORE",
        payload: locationApi.data.address.tourism,
      });
    }
  }
};
