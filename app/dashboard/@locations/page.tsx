import { API_URL, TOKEN_NAME } from "@/constants";
import { Location } from "@/entities";
import axios from "axios";
import { cookies } from "next/headers";
import LocationCard from "./components/LocationCard";
import SelectLocation from "./components/SelectLocation";
export const dynamic = "force-dynamic";
const LocationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = cookies().get(TOKEN_NAME)?.value;
  let locations: Location[] = [];

  try {
    const { data } = await axios.get<Location[]>(`${API_URL}/locations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    locations = Array.isArray(data) ? data : [];
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
            location={locations.find((location) =>
              searchParams.store
                ? String(location.locationId) ===
                  String(
                    Array.isArray(searchParams.store)
                      ? searchParams.store[0]
                      : searchParams.store,
                  )
                : false,
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default LocationsPage;
