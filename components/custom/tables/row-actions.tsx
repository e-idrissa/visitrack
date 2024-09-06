import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircleIcon, Trash2, Loader2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Visit } from "@prisma/client";

type RowActionsProps = {
  visit: Visit;
};

const RowActions: React.FC<RowActionsProps> = ({ visit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deleteVisit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/visits/${visit.id}`, { data: visit });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Visit deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const endVisit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`/api/visits/${visit.id}/end`, { data: visit });
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Visit ended successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
          <span className="sr-only">Open menu</span>
          {!isLoading && <MoreHorizontal className="h-4 w-4" />}
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="end" onClick={endVisit}>
            <CheckCircleIcon className="size-4 mr-1" />
            End
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="destructive" onClick={deleteVisit}>
            <Trash2 className="size-4 mr-1" />
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
