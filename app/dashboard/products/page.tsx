import { API_URL } from "@/constants";
import { Product } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FilteredCards from "./_components/FilteredCards";
export default async function ProductsPage() {
  const response = await fetch(`${API_URL}/products`, {
    headers: {
      ...authHeaders(),
    },
    next: {
      tags: ["dashboard:products"],
    },
  });
  const products: Product[] = await response.json();
  return (
    <div className="h-[90vh] w-full">
      <div className="w-3/12">
        <FilteredCards products={products} />
      </div>
    </div>
  );
}
