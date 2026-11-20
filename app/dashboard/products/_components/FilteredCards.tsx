"use client";

import { Product, Provider } from "@/entities";
import { Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function FilteredCards({
  products,
  providers,
}: {
  products: Product[];
  providers: Provider[];
}) {
  const [filtered, setFiltered] = useState<string>("");
  const [provider, setProvider] = useState<string>("");
  const [productsList, setProductsList] = useState<Product[]>(products);
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const matchesName = product.productName
        .toLowerCase()
        .includes(filtered.toLowerCase());
      const matchesProvider =
        !provider || product.provider?.providerId === provider;
      return matchesName && matchesProvider;
    });
    setProductsList(filteredProducts);
  }, [filtered, provider, products]);
  return (
    <div className="flex h-full min-h-[90vh] flex-col gap-4 overflow-y-auto border-r-2 border-orange-200 bg-orange-50/30 px-5 py-6 md:px-6">
      <Select
        label="Proveedor"
        placeholder="Todos los proveedores"
        selectedKeys={provider ? [provider] : []}
        onChange={(e) => {
          setProvider(e.target.value);
        }}
      >
        {providers.map((prov) => (
          <SelectItem key={prov.providerId}>{prov.providerName}</SelectItem>
        ))}
      </Select>
      <Input
        value={filtered}
        onValueChange={setFiltered}
        label="Nombre del producto"
        placeholder="Buscar producto"
        isClearable
      />
      <p className="text-xs font-medium text-slate-500">
        {productsList.length} {productsList.length === 1 ? "producto" : "productos"}
      </p>
      {productsList.length > 0 ? (
        <div className="flex flex-col gap-3">
          {productsList.map((product) => (
            <Link
              className="block transition-transform hover:-translate-y-0.5"
              key={product.productId}
              href={`/dashboard/products/${product.productId}`}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-slate-500">
          No se encontraron productos.
        </p>
      )}
    </div>
  );
}
