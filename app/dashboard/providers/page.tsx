import { API_URL } from "@/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import Link from "next/link";
import CreateProvider from "./_components/CreateProvider";
import FormCreateProvider from "./_components/FormCreateProvider";
import ProviderCard from "./_components/ProviderCard";
const ProviderPage = async () => {
  const response = await fetch(`${API_URL}/providers`, {
    headers: {
      ...authHeaders(),
    },
    next:{
      tags: ["dashboard:providers"],
    }
  });
  const providers: Provider[] = await response.json();

  return (
    <main className="h-[90vh] w-full overflow-y-auto px-5 py-7 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 border-b border-orange-200 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
              Directorio
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
              Proveedores
            </h1>
          </div>
          <CreateProvider>
            <FormCreateProvider />
          </CreateProvider>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 py-7 sm:grid-cols-2 xl:grid-cols-3">
          {providers.map((provider: Provider) => (
            <Link
              key={provider.providerId}
              className="rounded-2xl transition duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              href={{ pathname: `/dashboard/providers/${provider.providerId}` }}
            >
              <ProviderCard provider={provider} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProviderPage;
