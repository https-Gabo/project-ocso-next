import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import Link from "next/link";
import ProviderCard from "../_components/ProviderCard";
import FormUpdateProvider from "./_components/FormUpdateProvider";
import ProductCard from "./_components/ProductCard";
export default async function ProviderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const provider: Provider = await (
    await fetch(`${API_URL}/providers/${params.id}`, {
      headers: {
        ...authHeaders(),
      },
      next: {
        tags: ["dashboard/providers:${params.id}"],
      },
    })
  ).json();
  return (
    <div className="flex h-[90vh] flex-grow-0 flex-col gap-10 pl-10 pt-10">
      <div className="flex flex-row items-center gap-6">
        <ProviderCard provider={provider} />
        <FormUpdateProvider provider={provider} />
      </div>
      <div className="h-1 w-[90vw] bg-orange-900 " />
      <div className="flex flex-wrap gap-10">
        {provider.products.map((product: Product) => (
          <Link
            href={{ pathname: `/dashboard/products/${product.productId}` }}
            key={product.productId}
            className="transition-all hover:scale-110"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
