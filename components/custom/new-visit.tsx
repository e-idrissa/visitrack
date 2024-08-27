import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewVisitForm } from "./form/new-visit"

export function NewVisit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle>Add Visit</DialogTitle>
        </DialogHeader>
        <NewVisitForm />
      </DialogContent>
    </Dialog>
  )
}
