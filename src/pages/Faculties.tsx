
import { DataCard } from "@/components/ui/data-card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, School } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Faculty } from "@/types";

const Faculties = () => {
  const [open, setOpen] = useState(false);
  
  // Mock data for faculties
  const [faculties, setFaculties] = useState<Faculty[]>([
    { id_faculte: 1, nom: "Faculty of Engineering" },
    { id_faculte: 2, nom: "Faculty of Science" },
    { id_faculte: 3, nom: "Faculty of Medicine" },
    { id_faculte: 4, nom: "Faculty of Arts" },
    { id_faculte: 5, nom: "Faculty of Law" },
  ]);

  const [newFaculty, setNewFaculty] = useState("");

  const handleAddFaculty = () => {
    if (newFaculty.trim()) {
      const maxId = Math.max(...faculties.map(f => f.id_faculte), 0);
      setFaculties([...faculties, { id_faculte: maxId + 1, nom: newFaculty }]);
      setNewFaculty("");
      setOpen(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Faculty Management"
        subtitle="Add and manage university faculties"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-accent hover:bg-exam-blue">
                <Plus className="h-4 w-4 mr-2" /> Add Faculty
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Faculty</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="faculty-name">Faculty Name</Label>
                  <Input
                    id="faculty-name"
                    value={newFaculty}
                    onChange={(e) => setNewFaculty(e.target.value)}
                    placeholder="e.g. Faculty of Engineering"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFaculty}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculties.map((faculty) => (
          <DataCard
            key={faculty.id_faculte}
            title={faculty.nom}
            icon={School}
          >
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">ID: {faculty.id_faculte}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
              </div>
            </div>
          </DataCard>
        ))}
      </div>
    </div>
  );
};

export default Faculties;
