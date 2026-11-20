import updateProduct from "@/actions/products/update";
import { Product, Provider } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { LuCheck } from "react-icons/lu";
import SelectProvider from "../../_components/SelectProvider";

export default function UpdateProduct({
  product,
  providers,
}: {
  product: Product;
  providers: Provider[];
}) {
  const { productId } = product;
  return (
    <form
      action={updateProduct}
      className="flex flex-col gap-5 rounded-2xl border border-orange-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-800">
        Actualizar Producto
      </h2>
      <input type="hidden" name="productId" value={productId} />
      <Input
        name="productName"
        label="Nombre"
        defaultValue={product.productName}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          name="countSeal"
          type="number"
          min={0}
          label="Num. de Sellos"
          defaultValue={String(product.countSeal)}
        />
        <Input
          name="price"
          type="number"
          step="0.01"
          min={0}
          label="Precio"
          defaultValue={String(product.price)}
        />
      </div>
      <SelectProvider
        providers={providers}
        defaultProvider={product.provider?.providerId}
      />
      <div className="flex justify-end">
        <Button type="submit" color="primary" startContent={<LuCheck size={18} />}>
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}
