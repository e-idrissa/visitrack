import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit3, Upload } from "lucide-react"
import { EditVisitForm } from "./form/edit-visit"
import { dateFormat } from "@/lib/utils"

export function EditVisit() {

  const visit = {
    id: 'visit1',
    name: 'John',
    lastName: 'Doe',
    status: true,
    reason: "infos",
    entering_at: new Date('2023-01-01  23:49:59'),
    leaving_at: new Date('2023-01-02  23:59:59'),
    userId: "1234",
    created_at: new Date(),
    updated_at: new Date(),
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="edit"><Edit3 className="size-4 mr-1"/>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Visit</DialogTitle>
        </DialogHeader>
        <EditVisitForm visit={visit}/>
      </DialogContent>
    </Dialog>
  )
}
