
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
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Group, Level } from "@/types";

const Groups = () => {
  const [open, setOpen] = useState(false);
  
  // Mock data for levels
  const levels: Level[] = [
    { id_niv: 1, niv: "Bachelor's", formation: "Degree", domaine: "Engineering", specialite: "Computer Engineering", id_faculte: 1 },
    { id_niv: 2, niv: "Master's", formation: "Research", domaine: "Engineering", specialite: "Software Engineering", id_faculte: 1 },
    { id_niv: 3, niv: "Bachelor's", formation: "Degree", domaine: "Science", specialite: "Physics", id_faculte: 2 },
    { id_niv: 4, niv: "Doctorate", formation: "Research", domaine: "Medicine", specialite: "Cardiology", id_faculte: 3 },
  ];
  
  // Mock data for groups
  const [groups, setGroups] = useState<Group[]>([
    { id_groupe: 1, nom: "Group A", nbr_etud: 35, id_niv: 1 },
    { id_groupe: 2, nom: "Group B", nbr_etud: 40, id_niv: 1 },
    { id_groupe: 3, nom: "Group C", nbr_etud: 30, id_niv: 2 },
    { id_groupe: 4, nom: "Group A", nbr_etud: 25, id_niv: 3 },
    { id_groupe: 5, nom: "Research Group", nbr_etud: 15, id_niv: 4 },
  ]);

  const [newGroup, setNewGroup] = useState<Partial<Group>>({
    nom: "",
    nbr_etud: 0,
    id_niv: undefined
  });

  const handleAddGroup = () => {
    if (newGroup.nom && newGroup.nbr_etud && newGroup.nbr_etud > 0 && newGroup.id_niv) {
      const maxId = Math.max(...groups.map(g => g.id_groupe), 0);
      setGroups([...groups, { ...newGroup, id_groupe: maxId + 1 } as Group]);
      setNewGroup({
        nom: "",
        nbr_etud: 0,
        id_niv: undefined
      });
      setOpen(false);
    }
  };

  const getLevelName = (id: number) => {
    const level = levels.find(l => l.id_niv === id);
    return level ? `${level.niv} in ${level.specialite}` : "Unknown";
  };

  return (
    <div>
      <PageHeader
        title="Group Management"
        subtitle="Add and manage student groups"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-accent hover:bg-exam-blue">
                <Plus className="h-4 w-4 mr-2" /> Add Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Group</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="group-name">Group Name</Label>
                  <Input
                    id="group-name"
                    value={newGroup.nom || ""}
                    onChange={(e) => setNewGroup({...newGroup, nom: e.target.value})}
                    placeholder="e.g. Group A, Group B, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="student-count">Number of Students</Label>
                  <Input
                    id="student-count"
                    type="number"
                    value={newGroup.nbr_etud || ""}
                    onChange={(e) => setNewGroup({...newGroup, nbr_etud: parseInt(e.target.value)})}
                    placeholder="e.g. 30"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="level">Educational Level</Label>
                  <Select
                    onValueChange={(value) => setNewGroup({...newGroup, id_niv: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.id_niv} value={level.id_niv.toString()}>
                          {level.niv} in {level.specialite}
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
                <Button onClick={handleAddGroup}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <DataCard
            key={group.id_groupe}
            title={group.nom}
            icon={Users}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">ID:</div>
                <div>{group.id_groupe}</div>
                <div className="text-gray-500">Students:</div>
                <div>{group.nbr_etud}</div>
                <div className="text-gray-500">Level:</div>
                <div>{getLevelName(group.id_niv)}</div>
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

export default Groups;
