import {
  GetAverageDailyVisits,
  GetYesterdaysVisits,
} from "@/lib/actions/visit.actions";
import { Activity, ChartNoAxesColumn, LucideProps } from "lucide-react"; // Import LucideProps for type reference

type Props = {
  label: string;
  count: number;
  icon: React.ComponentType<LucideProps>; // Correct type for a Lucide icon component
};

const Insight = ({ label, count, icon: Icon }: Props) => {
  return (
    <div className="bg-white/20 border border-white/50 rounded-xl p-4 w-52 text-white">
      <div className="flex items-center gap-x-1 font-medium">
        <Icon className="size-5" />
        <h2>{label}</h2>
      </div>
      <p className="text-5xl font-semibold text-right pt-3">{count}</p>
    </div>
  );
};

const Insights = async () => {
  const averageVisits = await GetAverageDailyVisits();
  const yesterdaysVisits = await GetYesterdaysVisits();

  const insights = [
    { label: "Yesterday's Visits", count: yesterdaysVisits, icon: Activity },
    { label: "Average Visits", count: averageVisits, icon: ChartNoAxesColumn },
  ];

  return (
    <div className="pb-56 flex gap-x-3">
      {insights.map(({ label, count, icon }) => (
        <Insight key={label} label={label} count={count ?? 0} icon={icon} />
      ))}
    </div>
  );
};

export default Insights;
