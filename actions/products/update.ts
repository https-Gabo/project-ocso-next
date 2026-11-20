"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const FIELD_PARSERS: Record<string, (value: string) => unknown> = {
  productName: (v) => v,
  price: (v) => Number(v),
  countSeal: (v) => Number(v),
  provider: (v) => ({ providerId: v }),
};

export default async function updateProduct(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const product: Record<string, unknown> = {};

  for (const [key, parse] of Object.entries(FIELD_PARSERS)) {
    const value = formData.get(key);
    if (typeof value === "string" && value.trim() !== "") {
      product[key] = parse(value);
    }
  }

  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(product),
    headers: {
      ...authHeaders(),
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el producto");
  }

  revalidateTag("dashboard:products");
  revalidateTag(`dashboard:products:${productId}`);
  redirect(`/dashboard/products/${productId}`);
}
