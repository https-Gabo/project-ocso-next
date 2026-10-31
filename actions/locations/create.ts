"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import axios from "axios";

export async function createLocation(formData: FormData) {
  let location: any = {};
  let locationLatLng = [0, 0];
  for (const key of formData.keys()) {
    const value = formData.get(key);
    if (value) {
      if (key === "locationLat") {
        locationLatLng[0] = +value;
      } else if (key === "locationLng") {
        locationLatLng[1] = +value;
      } else {
        location[key] = formData.get(key);
      }
    }
  }
  location.locationLatLng = locationLatLng;
  await axios.post(
    `${API_URL}/locations`,
    {
      ...location,
    },
    {
      headers: authHeaders(),
    },
  );
}
