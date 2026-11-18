import { Product } from "@/entities";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full min-w-0 border border-orange-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b border-orange-100 bg-orange-50/70 px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
            Producto
          </p>
          <h2 className="mt-1 truncate text-lg font-bold text-slate-800">
            {product.productName}
          </h2>
        </div>
      </CardHeader>
      <CardBody className="gap-4 px-5 pb-5 pt-1">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Precio
            </p>
            <p className="mt-1 font-semibold text-slate-700">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Existencias
            </p>
            <p className="mt-1 font-semibold text-slate-700">
              {product.countSeal}
            </p>
          </div>
        </div>
        <p className="truncate border-t border-orange-100 pt-3 text-sm text-slate-500">
          Proveedor: {product.provider?.providerName ?? "Sin proveedor"}
        </p>
      </CardBody>
    </Card>
  );
}
