"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteLocation(locationId: string) {
  const response = await fetch(`${API_URL}/locations/${locationId}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

  if (response.status === 200) {
    revalidateTag("dashboard:locations");
    redirect("/dashboard");
  }
}
