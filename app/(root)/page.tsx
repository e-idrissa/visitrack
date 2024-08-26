import { NewVisit } from "@/components/custom/new-visit";
import { columns } from "@/components/custom/tables/columns";
import { DataTable } from "@/components/custom/tables/data-table";
import { YourVisits } from "@/components/custom/your-visits";
import { visitsList } from "@/data";

export default function Home() {

  const visits = visitsList

  return (
    <main className="text-primary">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your daily Visits</h2>
        <div className="flex items-center gap-x-4">
          <YourVisits />
          <NewVisit />
        </div>
      </div>
      <DataTable columns={columns} data={visits} />
    </main>
  );
}
