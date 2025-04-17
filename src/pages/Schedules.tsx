
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
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Exam, Group, Module, Room, TimeSlot } from "@/types";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

const Schedules = () => {
  const [open, setOpen] = useState(false);
  
  // Mock data for time slots
  const timeSlots: TimeSlot[] = [
    { id_crenom: 1, periode: "09:00 - 10:30" },
    { id_crenom: 2, periode: "11:00 - 12:30" },
    { id_crenom: 3, periode: "14:00 - 15:30" },
    { id_crenom: 4, periode: "16:00 - 17:30" },
  ];

  // Mock data for days
  const days = [
    { id_jour: 1, nom: "Monday" },
    { id_jour: 2, nom: "Tuesday" },
    { id_jour: 3, nom: "Wednesday" },
    { id_jour: 4, nom: "Thursday" },
    { id_jour: 5, nom: "Friday" },
  ];
  
  // Mock data for groups
  const groups: Group[] = [
    { id_groupe: 1, nom: "Group A", nbr_etud: 35, id_niv: 1 },
    { id_groupe: 2, nom: "Group B", nbr_etud: 40, id_niv: 1 },
    { id_groupe: 3, nom: "Group C", nbr_etud: 30, id_niv: 2 },
    { id_groupe: 4, nom: "Group A", nbr_etud: 25, id_niv: 3 },
    { id_groupe: 5, nom: "Research Group", nbr_etud: 15, id_niv: 4 },
  ];
  
  // Mock data for modules
  const modules: Module[] = [
    { id_module: 1, nom: "Introduction to Programming", id_niv: 1, id_enseignant: 1 },
    { id_module: 2, nom: "Data Structures and Algorithms", id_niv: 1, id_enseignant: 2 },
    { id_module: 3, nom: "Advanced Software Engineering", id_niv: 2, id_enseignant: 1 },
    { id_module: 4, nom: "Quantum Physics", id_niv: 3, id_enseignant: 3 },
    { id_module: 5, nom: "Cardiology Research Methods", id_niv: 4, id_enseignant: 4 },
  ];
  
  // Mock data for rooms
  const rooms: Room[] = [
    { id_salle: 1, nom: "101", capacite: 50, nbrens_surveillance: 2, id_faculte: 1 },
    { id_salle: 2, nom: "102", capacite: 75, nbrens_surveillance: 3, id_faculte: 1 },
    { id_salle: 3, nom: "201", capacite: 100, nbrens_surveillance: 4, id_faculte: 2 },
    { id_salle: 4, nom: "202", capacite: 30, nbrens_surveillance: 1, id_faculte: 2 },
    { id_salle: 5, nom: "301", capacite: 60, nbrens_surveillance: 2, id_faculte: 3 },
  ];

  // Mock data for exams
  const [exams, setExams] = useState<Exam[]>([
    { id_groupe: 1, id_module: 1, id_crenom: 1, id_salle: 1 },
    { id_groupe: 2, id_module: 2, id_crenom: 2, id_salle: 2 },
    { id_groupe: 3, id_module: 3, id_crenom: 3, id_salle: 3 },
    { id_groupe: 4, id_module: 4, id_crenom: 4, id_salle: 4 },
    { id_groupe: 5, id_module: 5, id_crenom: 1, id_salle: 5 },
  ]);

  const [newExam, setNewExam] = useState<Partial<Exam>>({
    id_groupe: undefined,
    id_module: undefined,
    id_crenom: undefined,
    id_salle: undefined
  });

  const [selectedDay, setSelectedDay] = useState<number>(1);

  const handleAddExam = () => {
    if (newExam.id_groupe && newExam.id_module && newExam.id_crenom && newExam.id_salle) {
      setExams([...exams, { ...newExam } as Exam]);
      setNewExam({
        id_groupe: undefined,
        id_module: undefined,
        id_crenom: undefined,
        id_salle: undefined
      });
      setOpen(false);
    }
  };

  const getGroupName = (id: number) => {
    return groups.find(g => g.id_groupe === id)?.nom || "Unknown";
  };

  const getModuleName = (id: number) => {
    return modules.find(m => m.id_module === id)?.nom || "Unknown";
  };

  const getTimeSlot = (id: number) => {
    return timeSlots.find(t => t.id_crenom === id)?.periode || "Unknown";
  };

  const getRoomName = (id: number) => {
    return rooms.find(r => r.id_salle === id)?.nom || "Unknown";
  };

  // Filter modules by group level
  const filteredModules = newExam.id_groupe
    ? modules.filter(module => {
        const group = groups.find(g => g.id_groupe === newExam.id_groupe);
        return group && module.id_niv === group.id_niv;
      })
    : [];

  // Filter rooms by capacity compared to group size
  const filteredRooms = newExam.id_groupe
    ? rooms.filter(room => {
        const group = groups.find(g => g.id_groupe === newExam.id_groupe);
        return group && room.capacite >= group.nbr_etud;
      })
    : [];

  return (
    <div>
      <PageHeader
        title="Exam Scheduling"
        subtitle="Create and manage exam schedules"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-accent hover:bg-exam-blue">
                <Plus className="h-4 w-4 mr-2" /> Schedule Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Exam</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="group">Student Group</Label>
                  <Select
                    onValueChange={(value) => setNewExam({...newExam, id_groupe: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id_groupe} value={group.id_groupe.toString()}>
                          {group.nom} ({group.nbr_etud} students)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="module">Module</Label>
                  <Select
                    onValueChange={(value) => setNewExam({...newExam, id_module: parseInt(value)})}
                    disabled={!newExam.id_groupe}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={!newExam.id_groupe ? "Select a group first" : "Select module"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredModules.map((module) => (
                        <SelectItem key={module.id_module} value={module.id_module.toString()}>
                          {module.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time-slot">Time Slot</Label>
                  <Select
                    onValueChange={(value) => setNewExam({...newExam, id_crenom: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.id_crenom} value={slot.id_crenom.toString()}>
                          {slot.periode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="room">Room</Label>
                  <Select
                    onValueChange={(value) => setNewExam({...newExam, id_salle: parseInt(value)})}
                    disabled={!newExam.id_groupe}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={!newExam.id_groupe ? "Select a group first" : "Select room"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredRooms.map((room) => (
                        <SelectItem key={room.id_salle} value={room.id_salle.toString()}>
                          Room {room.nom} (Capacity: {room.capacite})
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
                <Button onClick={handleAddExam}>Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Tabs defaultValue="schedule" className="mb-8">
        <TabsList>
          <TabsTrigger value="schedule">Schedule View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule" className="mt-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Exam Schedule</h3>
              <Select 
                value={selectedDay.toString()} 
                onValueChange={(value) => setSelectedDay(parseInt(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day.id_jour} value={day.id_jour.toString()}>
                      {day.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              <div className="font-medium text-gray-500">Time Slot</div>
              <div className="font-medium text-gray-500">Group</div>
              <div className="font-medium text-gray-500">Module</div>
              <div className="font-medium text-gray-500">Room</div>
              <div className="font-medium text-gray-500">Actions</div>

              {timeSlots.map((slot) => {
                const examForSlot = exams.find(e => e.id_crenom === slot.id_crenom);
                return (
                  <React.Fragment key={slot.id_crenom}>
                    <div className="py-2 border-t">{slot.periode}</div>
                    <div className="py-2 border-t">
                      {examForSlot ? getGroupName(examForSlot.id_groupe) : "-"}
                    </div>
                    <div className="py-2 border-t">
                      {examForSlot ? getModuleName(examForSlot.id_module) : "-"}
                    </div>
                    <div className="py-2 border-t">
                      {examForSlot ? `Room ${getRoomName(examForSlot.id_salle)}` : "-"}
                    </div>
                    <div className="py-2 border-t">
                      {examForSlot ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Cancel</Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => {
                          setNewExam({...newExam, id_crenom: slot.id_crenom});
                          setOpen(true);
                        }}>
                          <Plus className="h-3 w-3 mr-1" /> Add
                        </Button>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-4 font-medium text-gray-500">
                <div>Group</div>
                <div>Module</div>
                <div>Time Slot</div>
                <div>Room</div>
                <div>Actions</div>
              </div>
              
              {exams.map((exam, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 py-2 border-t">
                  <div>{getGroupName(exam.id_groupe)}</div>
                  <div>{getModuleName(exam.id_module)}</div>
                  <div>{getTimeSlot(exam.id_crenom)}</div>
                  <div>Room {getRoomName(exam.id_salle)}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        setExams(exams.filter((_, i) => i !== index));
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedules;
