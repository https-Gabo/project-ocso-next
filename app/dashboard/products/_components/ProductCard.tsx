import { Product } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-full border border-orange-100 shadow-sm transition-shadow hover:border-orange-300 hover:shadow-md">
      <CardHeader className="flex items-center justify-between gap-2 pb-2">
        <span className="truncate font-semibold text-slate-800">
          {product.productName}
        </span>
        <span className="shrink-0 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
          ${product.price}
        </span>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-1 text-sm text-slate-600">
        <p>
          Sellos: <b className="text-slate-800">{product.countSeal}</b>
        </p>
        <p>
          Proveedor:{" "}
          <span className="font-semibold text-orange-700">
            {product.provider?.providerName ?? "Sin proveedor"}
          </span>
        </p>
      </CardBody>
    </Card>
  );
}
