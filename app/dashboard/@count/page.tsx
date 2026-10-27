import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const CountPage = async () => {
  const token = cookies().get(TOKEN_NAME)?.value;
  const countLocations = await axios.get(`${API_URL}/locations`, {
    headers: {
      Authorization: token,
    },
  });
  const cantidad = countLocations?.data?.length;
  return `Hay: ${cantidad} tienda${cantidad > 1 ? "s" : ""}`;
};
export default CountPage;
