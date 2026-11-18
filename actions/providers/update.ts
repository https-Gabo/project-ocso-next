"use server";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProvider(formData: FormData) {
  const providerId = String(formData.get("providerId") ?? "");
  const provider: Record<string, FormDataEntryValue> = {
    providerName: formData.get("providerName") ?? "",
    providerEmail: formData.get("providerEmail") ?? "",
    providerPhoneNumber: formData.get("providerPhoneNumber") ?? "",
  };
  const response = await fetch(`${API_URL}/providers/${providerId}`, {
    method: "PATCH",
    body: JSON.stringify(provider),
    headers: {
      ...authHeaders(),
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("No se pudo actualizar el proveedor");
  }

  revalidateTag("dashboard:providers");
  revalidateTag(`dashboard:providers:${providerId}`);
  redirect(`/dashboard/providers/${providerId}`);
}
