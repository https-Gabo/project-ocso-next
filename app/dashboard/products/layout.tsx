import { API_URL } from "@/constants";
import { Product } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { ReactNode } from "react";
import FilteredCards from "./_components/FilteredCards";
export default async function LayoutProduct({
  children,
}: {
  children: ReactNode;
}) {
  const responseProducts = await fetch(`${API_URL}/products`, {
    headers: {
      ...authHeaders(),
    },
    next: {
      tags: ["dashboard:products"],
    },
  });
  const products: Product[] = await responseProducts.json();
  const responseProviders = await fetch(`${API_URL}/providers`, {
    headers: {
      ...authHeaders(),
    },
    next: {
      tags: ["dashboard:providers"],
    },
  });
  const providers = await responseProviders.json();
  return (
    <div className="flex h-[90vh] w-full flex-row">
      <div className="w-4/12 lg:w-3/12">
        <FilteredCards products={products} providers={providers} />
      </div>
      <div className="w-8/12 flex-1 overflow-y-auto lg:w-9/12">{children}</div>
    </div>
  );
}
