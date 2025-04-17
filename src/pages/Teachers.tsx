
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
import { Plus, Search, User } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Faculty, Teacher } from "@/types";

const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for faculties
  const faculties: Faculty[] = [
    { id_faculte: 1, nom: "Faculty of Engineering" },
    { id_faculte: 2, nom: "Faculty of Science" },
    { id_faculte: 3, nom: "Faculty of Medicine" },
    { id_faculte: 4, nom: "Faculty of Arts" },
    { id_faculte: 5, nom: "Faculty of Law" },
  ];
  
  // Mock data for teachers
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id_enseignant: 1, nom: "Smith", prenom: "John", Email: "john.smith@university.edu", Tel: "123-456-7890", id_faculte: 1 },
    { id_enseignant: 2, nom: "Johnson", prenom: "Sarah", Email: "sarah.johnson@university.edu", Tel: "123-456-7891", id_faculte: 1 },
    { id_enseignant: 3, nom: "Williams", prenom: "David", Email: "david.williams@university.edu", Tel: "123-456-7892", id_faculte: 2 },
    { id_enseignant: 4, nom: "Brown", prenom: "Emily", Email: "emily.brown@university.edu", Tel: "123-456-7893", id_faculte: 3 },
    { id_enseignant: 5, nom: "Jones", prenom: "Michael", Email: "michael.jones@university.edu", Tel: "123-456-7894", id_faculte: 4 },
    { id_enseignant: 6, nom: "Garcia", prenom: "Maria", Email: "maria.garcia@university.edu", Tel: "123-456-7895", id_faculte: 5 },
  ]);

  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    nom: "",
    prenom: "",
    Email: "",
    Tel: "",
    id_faculte: undefined
  });

  const handleAddTeacher = () => {
    if (newTeacher.nom && newTeacher.prenom && newTeacher.Email && newTeacher.Tel && newTeacher.id_faculte) {
      const maxId = Math.max(...teachers.map(t => t.id_enseignant), 0);
      setTeachers([...teachers, { ...newTeacher, id_enseignant: maxId + 1 } as Teacher]);
      setNewTeacher({
        nom: "",
        prenom: "",
        Email: "",
        Tel: "",
        id_faculte: undefined
      });
      setOpen(false);
    }
  };

  const getFacultyName = (id: number) => {
    return faculties.find(f => f.id_faculte === id)?.nom || "Unknown";
  };

  const filteredTeachers = teachers.filter(teacher => 
    teacher.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
    teacher.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.Email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Teacher Management"
        subtitle="Add and manage university teachers"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-accent hover:bg-exam-blue">
                <Plus className="h-4 w-4 mr-2" /> Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="teacher-last-name">Last Name</Label>
                    <Input
                      id="teacher-last-name"
                      value={newTeacher.nom || ""}
                      onChange={(e) => setNewTeacher({...newTeacher, nom: e.target.value})}
                      placeholder="e.g. Smith"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teacher-first-name">First Name</Label>
                    <Input
                      id="teacher-first-name"
                      value={newTeacher.prenom || ""}
                      onChange={(e) => setNewTeacher({...newTeacher, prenom: e.target.value})}
                      placeholder="e.g. John"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    value={newTeacher.Email || ""}
                    onChange={(e) => setNewTeacher({...newTeacher, Email: e.target.value})}
                    placeholder="e.g. john.smith@university.edu"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="teacher-phone">Phone</Label>
                  <Input
                    id="teacher-phone"
                    value={newTeacher.Tel || ""}
                    onChange={(e) => setNewTeacher({...newTeacher, Tel: e.target.value})}
                    placeholder="e.g. 123-456-7890"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faculty">Faculty</Label>
                  <Select
                    onValueChange={(value) => setNewTeacher({...newTeacher, id_faculte: parseInt(value)})}
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
                <Button onClick={handleAddTeacher}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          placeholder="Search teachers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <DataCard
            key={teacher.id_enseignant}
            title={`${teacher.prenom} ${teacher.nom}`}
            icon={User}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">ID:</div>
                <div>{teacher.id_enseignant}</div>
                <div className="text-gray-500">Email:</div>
                <div className="truncate">{teacher.Email}</div>
                <div className="text-gray-500">Phone:</div>
                <div>{teacher.Tel}</div>
                <div className="text-gray-500">Faculty:</div>
                <div>{getFacultyName(teacher.id_faculte)}</div>
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

export default Teachers;
