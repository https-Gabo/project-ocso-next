import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";

export default async function LocationCard({
  store,
}: {
  store: string | undefined;
}) {
  if (!store) return null;
  const response = await fetch(`${API_URL}/locations/${store}`, {
    headers: authHeaders(),
    next: { tags: ["dashboard:locations", `dashboard:locations:${store}`] },
  });
  if (!response.ok) return null;
  const location: Location = await response.json();

  if (!location) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        No se encontró la tienda seleccionada
      </p>
    );
  }

  return (
    <Card className="overflow-hidden border border-orange-200 bg-gradient-to-br from-white via-orange-50 to-white shadow-[0_24px_50px_rgba(251,146,60,0.12)]">
      <CardHeader className="border-b border-orange-100 bg-orange-50/80 px-6 py-5">
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Tienda activa
            </p>
            <b className="mt-2 block text-2xl text-slate-800">
              {location.locationName}
            </b>
          </div>
          <div className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            En línea
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex w-full flex-col items-center gap-4 p-5">
        <div className="grid w-full gap-3 text-base text-slate-700">
          <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Manager
            </span>
            <p className="mt-1 font-medium text-slate-800">
              {location.manager ? (
                <Link
                  href={`/dashboard/managers/${location.manager.managerId}`}
                  className="text-orange-600 underline-offset-2 hover:underline"
                >
                  {location.manager.managerFullName}
                </Link>
              ) : (
                <span>Sin manager</span>
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Dirección
            </span>
            <p className="mt-1 font-medium text-slate-800">
              {location.locationAddress}
            </p>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-orange-200 bg-orange-50 p-2 shadow-inner">
          <iframe
            className="h-[220px] w-full rounded-xl border-0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0Y6dhhUVleZmt7-H4P01QQWCSEz3LBg&q=${location.locationLatLng[0]},${location.locationLatLng[1]}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </CardBody>
    </Card>
  );
}
