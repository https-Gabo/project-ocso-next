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
    <div className="w-7/12">
      <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
        <div className="w-1/2 my-10">
          <SelectLocation locations={locations} store={searchParams?.store} />
        </div>
        <div className="w-3/12">
          <LocationCard
            store={
              Array.isArray(searchParams.store)
                ? searchParams.store[0]
                : searchParams.store
            }
          />
        </div>
        <div className="w-6/12">
          <FormNewLocation store={searchParams.store} />
        </div>
        <div className="flex flex-row flex-grow-0 gap-10 items-center">
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
