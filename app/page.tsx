import HomeClient from "@/app/components/home-client/home-client";
import { listLocations } from "@/app/services/locations";

export default async function Home() {
  const data = await listLocations();

  return <HomeClient data={data} />;
}
