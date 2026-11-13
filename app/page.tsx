import { Suspense } from "react";
import { TripPlanner } from "@/components/trip-planner";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <TripPlanner />
    </Suspense>
  );
}
