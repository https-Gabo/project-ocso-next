"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";

export default async function deleteLocation(formData: FormData) {
  const locationId = formData.get("deleteValue");

  if (typeof locationId !== "string" || !locationId) return;

  const response = await fetch(
    `${API_URL}/locations/${encodeURIComponent(locationId)}`,
    {
      method: "DELETE",
      headers: {
        ...authHeaders(),
      },
    },
  );
}
