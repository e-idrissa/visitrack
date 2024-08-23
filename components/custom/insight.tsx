import { LucideProps } from "lucide-react"; // Import LucideProps for type reference

type Props = {
  label: string;
  count: number;
  icon: React.ComponentType<LucideProps>; // Correct type for a Lucide icon component
};

const Insight = ({ label, count, icon: Icon }: Props) => {
  return (
    <div className="bg-white/20 border border-white/50 rounded-xl p-4 w-52 text-white">
      <div className="flex items-center gap-x-1 font-medium">
        <Icon className="size-5"/>
        <h2>{label}</h2>
      </div>
      <p className="text-5xl font-semibold text-right pt-3">{count}</p>
    </div>
  );
};

export default Insight;
