import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import DeleteLocationButton from "./_components/DeleteLocation";
import FormNewLocation from "./_components/FormNewLocation";
import FormUpdateLocation from "./_components/FormUpdateLocation";
import LocationCard from "./_components/LocationCard";
import SelectLocation from "./_components/SelectLocation";
import UpdateLocation from "./_components/UpdateLocation";
export const dynamic = "force-dynamic";
const LocationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let locations: Location[] = [];

  try {
    const response = await fetch(`${API_URL}/locations`, {
      headers: authHeaders(),
      next: { tags: ["dashboard:locations"] },
    });
    if (!response.ok) throw new Error("No se pudieron cargar las tiendas");
    const data: unknown = await response.json();
    locations = Array.isArray(data) ? (data as Location[]) : [];
  } catch {
    locations = [];
  }

  locations = [
    {
      locationId: 0,
      locationName: "Ninguna",
      locationLatLng: [0, 0],
      locationAddress: "No existe",
    },
    ...locations,
  ];
  return (
    <div className="w-full">
      <div className="grid h-[calc(100vh-104px)] w-full grid-cols-1 content-start gap-5 overflow-y-auto rounded-[28px] border border-orange-200 bg-white/75 p-5 shadow-[0_20px_45px_rgba(251,146,60,0.10)] xl:grid-cols-2">
        <div className="w-full xl:col-span-2">
          <SelectLocation locations={locations} store={searchParams?.store} />
        </div>
        <div className="w-full">
          <LocationCard
            store={
              Array.isArray(searchParams.store)
                ? searchParams.store[0]
                : searchParams.store
            }
          />
        </div>
        <div className="w-full">
          <FormNewLocation store={searchParams.store} />
        </div>
        <div className="flex flex-row items-center justify-center gap-4 xl:col-span-2">
          <DeleteLocationButton store={searchParams.store} />
          <UpdateLocation store = {searchParams.store}>
            <FormUpdateLocation store={searchParams.store} />
          </UpdateLocation>
        </div>
      </div>
    </div>
  );
};
export default LocationsPage;
