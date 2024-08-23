import { NewVisit } from "@/components/custom/new-visit";
import { YourVisits } from "@/components/custom/your-visits";
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-primary">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Your daily Visits</h2>
        <div className="flex items-center gap-x-4">
          <YourVisits />
          <NewVisit />
        </div>
      </div>
    </main>
  );
}
