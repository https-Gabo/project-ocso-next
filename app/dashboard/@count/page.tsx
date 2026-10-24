import { API_URL } from "@/constants";
import axios from "axios";

export const dynamic = "force-dynamic";

const CountPage = async () => {
  try {
    const countLocations = await axios.get(`${API_URL}/locations`);
    return "Hay tantas locations " + countLocations?.data?.length;
  } catch {
    return "No se pudo cargar el conteo de locations";
  }
};
export default CountPage;
