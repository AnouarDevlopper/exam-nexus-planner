
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
import { BookOpen, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Faculty, Level } from "@/types";

const Levels = () => {
  const [open, setOpen] = useState(false);
  
  // Mock data for faculties
  const faculties: Faculty[] = [
    { id_faculte: 1, nom: "Faculty of Engineering" },
    { id_faculte: 2, nom: "Faculty of Science" },
    { id_faculte: 3, nom: "Faculty of Medicine" },
    { id_faculte: 4, nom: "Faculty of Arts" },
    { id_faculte: 5, nom: "Faculty of Law" },
  ];
  
  // Mock data for levels
  const [levels, setLevels] = useState<Level[]>([
    { id_niv: 1, niv: "Bachelor's", formation: "Degree", domaine: "Engineering", specialite: "Computer Engineering", id_faculte: 1 },
    { id_niv: 2, niv: "Master's", formation: "Research", domaine: "Engineering", specialite: "Software Engineering", id_faculte: 1 },
    { id_niv: 3, niv: "Bachelor's", formation: "Degree", domaine: "Science", specialite: "Physics", id_faculte: 2 },
    { id_niv: 4, niv: "Doctorate", formation: "Research", domaine: "Medicine", specialite: "Cardiology", id_faculte: 3 },
  ]);

  const [newLevel, setNewLevel] = useState<Partial<Level>>({
    niv: "",
    formation: "",
    domaine: "",
    specialite: "",
    id_faculte: undefined
  });

  const handleAddLevel = () => {
    if (newLevel.niv && newLevel.formation && newLevel.domaine && newLevel.specialite && newLevel.id_faculte) {
      const maxId = Math.max(...levels.map(l => l.id_niv), 0);
      setLevels([...levels, { ...newLevel, id_niv: maxId + 1 } as Level]);
      setNewLevel({
        niv: "",
        formation: "",
        domaine: "",
        specialite: "",
        id_faculte: undefined
      });
      setOpen(false);
    }
  };

  const getFacultyName = (id: number) => {
    return faculties.find(f => f.id_faculte === id)?.nom || "Unknown";
  };

  return (
    <div>
      <PageHeader
        title="Level Management"
        subtitle="Add and manage educational levels and specializations"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-accent hover:bg-exam-blue">
                <Plus className="h-4 w-4 mr-2" /> Add Level
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Level</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="level-type">Level Type</Label>
                  <Input
                    id="level-type"
                    value={newLevel.niv || ""}
                    onChange={(e) => setNewLevel({...newLevel, niv: e.target.value})}
                    placeholder="e.g. Bachelor's, Master's, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="formation">Formation Type</Label>
                  <Input
                    id="formation"
                    value={newLevel.formation || ""}
                    onChange={(e) => setNewLevel({...newLevel, formation: e.target.value})}
                    placeholder="e.g. Degree, Diploma, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={newLevel.domaine || ""}
                    onChange={(e) => setNewLevel({...newLevel, domaine: e.target.value})}
                    placeholder="e.g. Engineering, Science, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={newLevel.specialite || ""}
                    onChange={(e) => setNewLevel({...newLevel, specialite: e.target.value})}
                    placeholder="e.g. Computer Engineering, Physics, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faculty">Faculty</Label>
                  <Select
                    onValueChange={(value) => setNewLevel({...newLevel, id_faculte: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      {faculties.map((faculty) => (
                        <SelectItem key={faculty.id_faculte} value={faculty.id_faculte.toString()}>
                          {faculty.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLevel}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map((level) => (
          <DataCard
            key={level.id_niv}
            title={`${level.niv} in ${level.specialite}`}
            icon={BookOpen}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">ID:</div>
                <div>{level.id_niv}</div>
                <div className="text-gray-500">Level:</div>
                <div>{level.niv}</div>
                <div className="text-gray-500">Formation:</div>
                <div>{level.formation}</div>
                <div className="text-gray-500">Domain:</div>
                <div>{level.domaine}</div>
                <div className="text-gray-500">Specialization:</div>
                <div>{level.specialite}</div>
                <div className="text-gray-500">Faculty:</div>
                <div>{getFacultyName(level.id_faculte)}</div>
              </div>
              
              <div className="flex gap-2 pt-2 justify-end">
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

export default Levels;
