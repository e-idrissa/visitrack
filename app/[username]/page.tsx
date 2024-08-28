import { NewVisit } from "@/components/custom/new-visit";
import { columns } from "@/components/custom/tables/columns";
import { DataTable } from "@/components/custom/tables/data-table";
import { visitsList } from "@/data";
import { GetUser } from "@/lib/actions/user.actions";

type Props = {
  params: {
    username: string;
  };
};
export default async function Home({ params }: Props) {

  const user = await GetUser(params.username)
  const visits = visitsList;

  return (
    <main className="text-primary">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium">Your daily Visits</h2>
        <div className="flex items-center gap-x-4">
          <NewVisit user={user!}/>
        </div>
      </div>
      <DataTable columns={columns} data={visits} />
    </main>
  );
}
