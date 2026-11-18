import updateProvider from "@/actions/providers/update";
import { Provider } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import DeleteProviderButton from "./DeleteButton";
import DeleteProvider from "./DeleteProvider";
export default function FormUpdateProvider({
  provider,
}: {
  provider: Provider;
}) {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-slate-800">
        Actualizar datos
      </h1>
      <form
        action={updateProvider}
        className="grid h-full gap-5 rounded-2xl border border-orange-200 bg-white p-6 shadow-[0_16px_40px_rgba(124,45,18,0.08)] md:grid-cols-2"
      >
        <input type="hidden" name="providerId" value={provider.providerId} />
        <Input
          className="w-full"
          defaultValue={provider.providerName}
          label="Nombre"
          placeholder="Pecsi"
          name="providerName"
        />
        <Input
          className="w-full"
          defaultValue={provider.providerEmail}
          label="Correo"
          placeholder="business@pecsi.com"
          name="providerEmail"
        />
        <Input
          className="w-full"
          defaultValue={provider.providerPhoneNumber}
          label="Número"
          placeholder="444XXXXX"
          name="providerPhoneNumber"
        />

        <div className="flex md:col-span-2 md:justify-end">
          <Button className="min-w-36" color="primary" type="submit">
            Actualizar
          </Button>
          <DeleteProvider>
            <h1 className="text-white text-4xl text-center">
              {" "}
              Estás seguro de eliminar al proveedor
              <b>{provider.providerName}</b>?
            </h1>
            <DeleteProviderButton providerId={provider.providerId} />
          </DeleteProvider>
        </div>
      </form>
    </>
  );
}
