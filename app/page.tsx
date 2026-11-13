import { TripPlanner } from "@/components/trip-planner";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ fail?: string }>;
}) {
  const { fail } = await searchParams;

  return <TripPlanner failOnce={fail === "once"} />;
}
