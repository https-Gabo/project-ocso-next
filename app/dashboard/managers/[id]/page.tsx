import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ManagerCard from "./_components/ManagerCard";
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
    <div>
      <ManagerCard manager={data} />
    </div>
  );
}
