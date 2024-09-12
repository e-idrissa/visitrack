import { NewVisit } from "@/components/custom/new-visit";
import { columns } from "@/components/custom/tables/columns";
import { DataTable } from "@/components/custom/tables/data-table";
import { GetDailyVisits } from "@/lib/actions/visit.actions";

export default async function Home({ params }: { params: { username: string } }) {
  const username = params.username
  const dailyVisits = await GetDailyVisits();

  return (
    <main className="text-primary">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium">Your daily Visits</h2>
        <div className="flex items-center gap-x-4">
          <NewVisit user={username}/>
        </div>
      </div>
      <DataTable columns={columns} data={dailyVisits!} />
    </main>
  );
}
