import createProduct from "@/actions/products/create";
import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Input } from "@nextui-org/react";
import { LuDollarSign, LuPackagePlus } from "react-icons/lu";
import SelectProvider from "./_components/SelectProvider";

const ProductsPage = async () => {
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
    <div className="mx-auto max-w-2xl px-6 py-10">
      <form
        className="flex flex-col gap-5 rounded-2xl border border-orange-200 bg-white p-8 shadow-[0_16px_40px_rgba(124,45,18,0.08)]"
        action={createProduct}
      >
        <div className="flex items-center gap-3 border-b border-orange-100 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white">
            <LuPackagePlus size={20} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Crear Producto</h1>
            <p className="text-sm text-slate-500">
              Registra un nuevo producto y asígnalo a un proveedor
            </p>
          </div>
        </div>
        <Input label="Nombre" placeholder="Ej. Refresco 600ml" name="productName" isRequired />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Precio"
            type="number"
            step="0.01"
            min={0}
            placeholder="0.00"
            endContent={<LuDollarSign className="text-slate-400" />}
            name="price"
            isRequired
          />
          <Input
            label="Num. de Sellos"
            type="number"
            min={0}
            placeholder="0"
            name="countSeal"
            isRequired
          />
        </div>
        <SelectProvider providers={providers} />
        <Button color="primary" type="submit" size="lg" className="mt-2 font-semibold">
          Crear Producto
        </Button>
      </form>
    </div>
  );
};
export default ProductsPage;
