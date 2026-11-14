import updateProvider from "@/actions/providers/update";
import { Provider } from "@/entities";
import { Button, Input } from "@nextui-org/react";
export default function FormUpdateProvider({
  provider,
}: {
  provider: Provider;
}) {
  const { providerId } = provider;
  const updateProviderWithId = updateProvider.bind(null, providerId);
  return (
    <>
      <h1 className="text-2xl px-2">Actualizar Datos </h1>
      <form
        action={updateProviderWithId}
        className="flex flex-wrap gap-10 flex-grow-0 bg-orange-200 py-10 mr-20 rounded-md px-10 items-center justify-center"
      >
        <Input
          className="max-w-[250px]"
          defaultValue={provider.providerName}
          label="Nombre"
          placeholder="Pecsi"
          name="providerName"
        />
        <Input
          className="max-w-[250px]"
          defaultValue={provider.providerEmail}
          label="Correo"
          placeholder="business@pecsi.com"
          name="providerEmail"
        />
        <Input
          className="max-w-[250px]"
          defaultValue={provider.providerPhoneNumber}
          label="Número"
          placeholder="444XXXXX"
          name="providerPhoneNumber"
        />

        <Button color="primary" type="submit">
          Actualizar
        </Button>
      </form>
    </>
  );
}
