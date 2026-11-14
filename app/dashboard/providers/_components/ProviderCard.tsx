import { Provider } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function ProviderCard({ provider }: { provider: Provider }) {
  const productCount = provider.products?.length ?? 0;

  return (
    <Card className="h-full min-w-0 border border-orange-200 bg-white/90 shadow-[0_12px_30px_rgba(124,45,18,0.07)] transition-shadow hover:shadow-[0_18px_38px_rgba(124,45,18,0.12)] max-w-[350px]:">
      <CardHeader className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
            Proveedor
          </p>
          <h2 className="mt-1 truncate text-lg font-bold text-slate-800">
            {provider.providerName}
          </h2>
        </div>
      </CardHeader>
      <Divider className="opacity-0" />
      <CardBody className="gap-4 px-5 pb-5 pt-1">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Correo electrónico
          </p>
          <p className="mt-1 break-all font-medium text-slate-700">
            {provider.providerEmail}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Número de teléfono
          </p>
          <p className="mt-1 font-medium text-slate-700">
            {provider.providerPhoneNumber}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-orange-100 pt-3">
          <span className="text-sm text-slate-500">Productos</span>
          {productCount > 0 ? (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800">
              Tiene {productCount} producto{productCount === 1 ? "" : "s"}
            </span>
          ) : (
            <span className="text-sm font-medium text-slate-500">
              No tiene productos
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
