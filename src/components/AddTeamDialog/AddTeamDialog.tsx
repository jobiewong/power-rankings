import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import NewTeamForm from "./AddTeamForm";

export default function AddTeamDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0">
          <PlusCircle className="h-6 w-6 text-white opacity-20 transition-all duration-150 ease-in-out hover:opacity-100" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <NewTeamForm />
      </DialogContent>
    </Dialog>
  );
}
