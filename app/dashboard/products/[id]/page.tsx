import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import DeleteProduct from "./_components/DeleteProduct";
import UpdateProduct from "./_components/UpdateProduct";

export default async function ProductPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const responseProduct = await fetch(`${API_URL}/products/${params.id}`, {
    headers: {
      ...authHeaders(),
    },
    next: {
      tags: ["dashboard:products", `dashboard:products:${params.id}`],
    },
  });
  const product: Product = await responseProduct.json();
  const responseProviders = await fetch(`${API_URL}/providers`, {
    headers: {
      ...authHeaders(),
    },
    next: {
      tags: ["dashboard:providers"],
    },
  });
  const providers: Provider[] = await responseProviders.json();
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-8">
      <div className="rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-white shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-100">
          Detalle del producto
        </p>
        <h1 className="mt-1 text-2xl font-bold">{product.productName}</h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <span className="rounded-lg bg-white/15 px-3 py-1.5">
            Precio: <b>${product.price}</b>
          </span>
          <span className="rounded-lg bg-white/15 px-3 py-1.5">
            Sellos: <b>{product.countSeal}</b>
          </span>
          {product.provider?.providerName && (
            <span className="rounded-lg bg-white/15 px-3 py-1.5">
              Proveedor: <b>{product.provider.providerName}</b>
            </span>
          )}
        </div>
      </div>
      <UpdateProduct product={product} providers={providers} />
      <div className="flex justify-end">
        <DeleteProduct productId={product.productId} />
      </div>
    </div>
  );
}
