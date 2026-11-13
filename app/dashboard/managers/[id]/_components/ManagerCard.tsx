import { Manager } from "@/entities";
import { Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";

export default function ManagerCard({ manager }: { manager: Manager }) {
  return (
    <Card
      key={manager.managerId}
      className="mx-2 my-2 overflow-hidden border border-orange-200 bg-gradient-to-br from-white via-orange-50 to-white shadow-[0_24px_50px_rgba(251,146,60,0.12)]"
    >
      <CardHeader className="border-b border-orange-100 bg-orange-50/80 px-6 py-5">
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Perfil del gerente
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              {manager.managerFullName}
            </p>
          </div>
          <div className="rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm">
            {manager.location ? "Asignado" : "Sin tienda"}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 text-base text-slate-700">
          <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Email
            </span>
            <p className="mt-1 font-medium text-slate-800">
              {manager.managerEmail}
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Teléfono
            </span>
            <p className="mt-1 font-medium text-slate-800">
              {manager.managerPhoneNumber}
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Salario
            </span>
            <p className="mt-1 font-medium text-slate-800">
              ${manager.managerSalary}
            </p>
          </div>
          <div
            className={
              manager.location
                ? "rounded-2xl border border-orange-100 bg-white p-3 shadow-sm"
                : "hidden"
            }
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Tienda
            </span>
            <p className="mt-1 font-medium text-slate-800">
              <Link
                href={`/dashboard?store=${manager.location.locationId}`}
                className="text-orange-600 underline-offset-2 hover:underline"
              >
                {manager.location.locationName}
              </Link>
            </p>
          </div>
        </div>

        {manager.location ? (
          <div className="w-full max-w-[360px] overflow-hidden rounded-2xl border border-orange-200 bg-orange-50 p-2 shadow-inner">
            <iframe
              className="h-[220px] w-full rounded-xl border-0"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0Y6dhhUVleZmt7-H4P01QQWCSEz3LBg&q=${manager.location.locationLatLng[0]},${manager.location.locationLatLng[1]}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        ) : (
          <div className="flex w-full max-w-[360px] items-center justify-center rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-8 text-center text-lg font-medium text-orange-600">
            No tiene tienda asignada
          </div>
        )}
      </CardBody>
    </Card>
  );
}
