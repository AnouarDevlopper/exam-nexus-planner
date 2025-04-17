
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
import { Columns, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Faculty, Room } from "@/types";

const Rooms = () => {
  const [open, setOpen] = useState(false);
  
  // Mock data for faculties
  const faculties: Faculty[] = [
    { id_faculte: 1, nom: "Faculty of Engineering" },
    { id_faculte: 2, nom: "Faculty of Science" },
    { id_faculte: 3, nom: "Faculty of Medicine" },
    { id_faculte: 4, nom: "Faculty of Arts" },
    { id_faculte: 5, nom: "Faculty of Law" },
  ];
  
  // Mock data for rooms
  const [rooms, setRooms] = useState<Room[]>([
    { id_salle: 1, nom: "101", capacite: 50, nbrens_surveillance: 2, id_faculte: 1 },
    { id_salle: 2, nom: "102", capacite: 75, nbrens_surveillance: 3, id_faculte: 1 },
    { id_salle: 3, nom: "201", capacite: 100, nbrens_surveillance: 4, id_faculte: 2 },
    { id_salle: 4, nom: "202", capacite: 30, nbrens_surveillance: 1, id_faculte: 2 },
    { id_salle: 5, nom: "301", capacite: 60, nbrens_surveillance: 2, id_faculte: 3 },
    { id_salle: 6, nom: "A1", capacite: 45, nbrens_surveillance: 2, id_faculte: 4 },
    { id_salle: 7, nom: "L1", capacite: 80, nbrens_surveillance: 3, id_faculte: 5 },
  ]);

  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    nom: "",
    capacite: 0,
    nbrens_surveillance: 1,
    id_faculte: undefined
  });

  const handleAddRoom = () => {
    if (newRoom.nom && newRoom.capacite && newRoom.capacite > 0 && newRoom.nbrens_surveillance && newRoom.nbrens_surveillance > 0 && newRoom.id_faculte) {
      const maxId = Math.max(...rooms.map(r => r.id_salle), 0);
      setRooms([...rooms, { ...newRoom, id_salle: maxId + 1 } as Room]);
      setNewRoom({
        nom: "",
        capacite: 0,
        nbrens_surveillance: 1,
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
        title="Room Management"
        subtitle="Add and manage exam rooms"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-accent hover:bg-exam-blue">
                <Plus className="h-4 w-4 mr-2" /> Add Room
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="room-name">Room Number/Name</Label>
                  <Input
                    id="room-name"
                    value={newRoom.nom || ""}
                    onChange={(e) => setNewRoom({...newRoom, nom: e.target.value})}
                    placeholder="e.g. 101, A1, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newRoom.capacite || ""}
                    onChange={(e) => setNewRoom({...newRoom, capacite: parseInt(e.target.value)})}
                    placeholder="e.g. 50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="surveillance">Required Supervisors</Label>
                  <Input
                    id="surveillance"
                    type="number"
                    value={newRoom.nbrens_surveillance || ""}
                    onChange={(e) => setNewRoom({...newRoom, nbrens_surveillance: parseInt(e.target.value)})}
                    placeholder="e.g. 2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faculty">Faculty</Label>
                  <Select
                    onValueChange={(value) => setNewRoom({...newRoom, id_faculte: parseInt(value)})}
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
                <Button onClick={handleAddRoom}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <DataCard
            key={room.id_salle}
            title={`Room ${room.nom}`}
            icon={Columns}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">ID:</div>
                <div>{room.id_salle}</div>
                <div className="text-gray-500">Capacity:</div>
                <div>{room.capacite} students</div>
                <div className="text-gray-500">Supervisors:</div>
                <div>{room.nbrens_surveillance}</div>
                <div className="text-gray-500">Faculty:</div>
                <div>{getFacultyName(room.id_faculte)}</div>
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

export default Rooms;
