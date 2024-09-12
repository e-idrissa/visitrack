import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewVisitForm } from "./form/new-visit"
import { User } from "@prisma/client"

type Props = {
  user: string
}
export function NewVisit({ user }: Props) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle>Add Visit</DialogTitle>
        </DialogHeader>
        <NewVisitForm username={user!}/>
      </DialogContent>
    </Dialog>
  )
}
