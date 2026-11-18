"use client";

import { Product } from "@/entities";
import { Input, Link } from "@nextui-org/react";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function FilteredCards({ products }: { products: Product[] }) {
  const [filtered, setFiltered] = useState<string>("");
  const productsList = products.filter((product) =>
    product.productName.toLowerCase().includes(filtered.trim().toLowerCase()),
  );

  return (
    <div className="flex h-full min-h-[90vh] flex-col gap-5 overflow-y-auto border-r-2 border-orange-200 px-5 py-6 md:px-8">
      <Input
        value={filtered}
        onValueChange={setFiltered}
        label="Nombre del producto"
        placeholder="Buscar producto"
        isClearable
      />
      {productsList.length > 0 ? (
        productsList.map((product) => (
          <Link
            className="block transition-transform hover:-translate-y-0.5"
            key={product.productId}
            href={`/dashboard/products/${product.productId}`}
          >
            <ProductCard product={product} />
          </Link>
        ))
      ) : (
        <p className="py-8 text-center text-sm text-slate-500">
          No se encontraron productos.
        </p>
      )}
    </div>
  );
}
