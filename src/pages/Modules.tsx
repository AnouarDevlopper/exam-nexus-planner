
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
import { BookText, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Level, Module, Teacher } from "@/types";

const Modules = () => {
  const [open, setOpen] = useState(false);
  
  // Mock data for levels
  const levels: Level[] = [
    { id_niv: 1, niv: "Bachelor's", formation: "Degree", domaine: "Engineering", specialite: "Computer Engineering", id_faculte: 1 },
    { id_niv: 2, niv: "Master's", formation: "Research", domaine: "Engineering", specialite: "Software Engineering", id_faculte: 1 },
    { id_niv: 3, niv: "Bachelor's", formation: "Degree", domaine: "Science", specialite: "Physics", id_faculte: 2 },
    { id_niv: 4, niv: "Doctorate", formation: "Research", domaine: "Medicine", specialite: "Cardiology", id_faculte: 3 },
  ];
  
  // Mock data for teachers
  const teachers: Teacher[] = [
    { id_enseignant: 1, nom: "Smith", prenom: "John", Email: "john.smith@university.edu", Tel: "123-456-7890", id_faculte: 1 },
    { id_enseignant: 2, nom: "Johnson", prenom: "Sarah", Email: "sarah.johnson@university.edu", Tel: "123-456-7891", id_faculte: 1 },
    { id_enseignant: 3, nom: "Williams", prenom: "David", Email: "david.williams@university.edu", Tel: "123-456-7892", id_faculte: 2 },
    { id_enseignant: 4, nom: "Brown", prenom: "Emily", Email: "emily.brown@university.edu", Tel: "123-456-7893", id_faculte: 3 },
  ];
  
  // Mock data for modules
  const [modules, setModules] = useState<Module[]>([
    { id_module: 1, nom: "Introduction to Programming", id_niv: 1, id_enseignant: 1 },
    { id_module: 2, nom: "Data Structures and Algorithms", id_niv: 1, id_enseignant: 2 },
    { id_module: 3, nom: "Advanced Software Engineering", id_niv: 2, id_enseignant: 1 },
    { id_module: 4, nom: "Quantum Physics", id_niv: 3, id_enseignant: 3 },
    { id_module: 5, nom: "Cardiology Research Methods", id_niv: 4, id_enseignant: 4 },
  ]);

  const [newModule, setNewModule] = useState<Partial<Module>>({
    nom: "",
    id_niv: undefined,
    id_enseignant: undefined
  });

  const handleAddModule = () => {
    if (newModule.nom && newModule.id_niv && newModule.id_enseignant) {
      const maxId = Math.max(...modules.map(m => m.id_module), 0);
      setModules([...modules, { ...newModule, id_module: maxId + 1 } as Module]);
      setNewModule({
        nom: "",
        id_niv: undefined,
        id_enseignant: undefined
      });
      setOpen(false);
    }
  };

  const getLevelName = (id: number) => {
    const level = levels.find(l => l.id_niv === id);
    return level ? `${level.niv} in ${level.specialite}` : "Unknown";
  };

  const getTeacherName = (id: number) => {
    const teacher = teachers.find(t => t.id_enseignant === id);
    return teacher ? `${teacher.prenom} ${teacher.nom}` : "Unknown";
  };

  return (
    <div>
      <PageHeader
        title="Module Management"
        subtitle="Add and manage course modules"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-accent hover:bg-exam-blue">
                <Plus className="h-4 w-4 mr-2" /> Add Module
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Module</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="module-name">Module Name</Label>
                  <Input
                    id="module-name"
                    value={newModule.nom || ""}
                    onChange={(e) => setNewModule({...newModule, nom: e.target.value})}
                    placeholder="e.g. Introduction to Programming"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="level">Educational Level</Label>
                  <Select
                    onValueChange={(value) => setNewModule({...newModule, id_niv: parseInt(value)})}
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
                <div className="grid gap-2">
                  <Label htmlFor="teacher">Teacher</Label>
                  <Select
                    onValueChange={(value) => setNewModule({...newModule, id_enseignant: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id_enseignant} value={teacher.id_enseignant.toString()}>
                          {teacher.prenom} {teacher.nom}
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
                <Button onClick={handleAddModule}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <DataCard
            key={module.id_module}
            title={module.nom}
            icon={BookText}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">ID:</div>
                <div>{module.id_module}</div>
                <div className="text-gray-500">Level:</div>
                <div>{getLevelName(module.id_niv)}</div>
                <div className="text-gray-500">Teacher:</div>
                <div>{getTeacherName(module.id_enseignant)}</div>
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

export default Modules;
