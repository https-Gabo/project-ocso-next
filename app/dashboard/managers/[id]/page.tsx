import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import DeleteManagerButton from "./_components/DeleteManagerButton";
import FormUpdateManager from "./_components/FormUpdateManager";
import ManagerCard from "./_components/ManagerCard";
import UpdateManager from "./_components/UpdateManger";
export default async function ManagerPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await fetch(`${API_URL}/managers/${params.id}`, {
    headers: {
      ...authHeaders(),
    },
    next: {
      tags: [`dashboard:managers:${params.id}`, "dashboard:managers"],
    },
  });

  if (!response.ok) {
    return (
      <p className="w-full px-2 text-center text-2xl">
        No se pudo cargar el manager
      </p>
    );
  }

  const data: Manager = await response.json();
  return (
    <main className="mx-auto flex h-[calc(100vh-104px)] w-full max-w-7xl flex-col justify-center gap-6 overflow-y-auto px-5 py-6">
      <ManagerCard manager={data} />
      <div className="flex flex-row flex-wrap items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-white px-6 py-4 shadow-[0_12px_30px_rgba(124,45,18,0.07)]">
        <UpdateManager>
          <FormUpdateManager manager={data} />
        </UpdateManager>
        <DeleteManagerButton managerId={data.managerId} />
      </div>
    </main>
  );
}
