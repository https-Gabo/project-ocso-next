"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import axios from "axios";
import { revalidatePath } from "next/cache";

export default async function deleteLocation(formData: FormData) {
  const locationId = formData.get("deleteValue");

  if (typeof locationId !== "string" || !locationId) return;

  await axios.delete(`${API_URL}/locations/${encodeURIComponent(locationId)}`, {
    headers: authHeaders(),
  });

  revalidatePath("/dashboard");
}
