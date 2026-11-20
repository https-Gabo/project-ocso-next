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
        tags: ["dashboard:providers", `dashboard:providers:${params.id}`],
      },
    })
  ).json();
  return (
    <main className="h-[calc(100vh-104px)] w-full overflow-y-auto px-5 py-7 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(280px,360px)_minmax(420px,1fr)]">
        <ProviderCard provider={provider} />
        <FormUpdateProvider provider={provider} />
        </div>
      <div className="h-px w-full bg-orange-200" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {(provider.products ?? []).map((product: Product) => (
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
    </main>
  );
}
