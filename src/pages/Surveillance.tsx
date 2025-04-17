
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Room, Surveillance, Teacher, TimeSlot } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SurveillancePage = () => {
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
  
  // Mock data for teachers
  const teachers: Teacher[] = [
    { id_enseignant: 1, nom: "Smith", prenom: "John", Email: "john.smith@university.edu", Tel: "123-456-7890", id_faculte: 1 },
    { id_enseignant: 2, nom: "Johnson", prenom: "Sarah", Email: "sarah.johnson@university.edu", Tel: "123-456-7891", id_faculte: 1 },
    { id_enseignant: 3, nom: "Williams", prenom: "David", Email: "david.williams@university.edu", Tel: "123-456-7892", id_faculte: 2 },
    { id_enseignant: 4, nom: "Brown", prenom: "Emily", Email: "emily.brown@university.edu", Tel: "123-456-7893", id_faculte: 3 },
  ];
  
  // Mock data for rooms
  const rooms: Room[] = [
    { id_salle: 1, nom: "101", capacite: 50, nbrens_surveillance: 2, id_faculte: 1 },
    { id_salle: 2, nom: "102", capacite: 75, nbrens_surveillance: 3, id_faculte: 1 },
    { id_salle: 3, nom: "201", capacite: 100, nbrens_surveillance: 4, id_faculte: 2 },
    { id_salle: 4, nom: "202", capacite: 30, nbrens_surveillance: 1, id_faculte: 2 },
    { id_salle: 5, nom: "301", capacite: 60, nbrens_surveillance: 2, id_faculte: 3 },
  ];

  // Mock data for surveillance assignments
  const [surveillances, setSurveillances] = useState<Surveillance[]>([
    { id_enseignant: 1, id_jour: 1, id_crenom: 1, id_salle: 1 },
    { id_enseignant: 2, id_jour: 1, id_crenom: 1, id_salle: 1 },
    { id_enseignant: 3, id_jour: 1, id_crenom: 2, id_salle: 2 },
    { id_enseignant: 4, id_jour: 1, id_crenom: 2, id_salle: 2 },
    { id_enseignant: 1, id_jour: 2, id_crenom: 3, id_salle: 3 },
    { id_enseignant: 2, id_jour: 2, id_crenom: 3, id_salle: 3 },
  ]);

  const [newSurveillance, setNewSurveillance] = useState<Partial<Surveillance>>({
    id_enseignant: undefined,
    id_jour: undefined,
    id_crenom: undefined,
    id_salle: undefined
  });

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedRoom, setSelectedRoom] = useState<number | undefined>(undefined);

  const handleAddSurveillance = () => {
    if (newSurveillance.id_enseignant && newSurveillance.id_jour && newSurveillance.id_crenom && newSurveillance.id_salle) {
      // Check if this teacher is already assigned to this slot and day
      const isTeacherBusy = surveillances.some(
        s => s.id_enseignant === newSurveillance.id_enseignant && 
        s.id_jour === newSurveillance.id_jour && 
        s.id_crenom === newSurveillance.id_crenom
      );

      if (!isTeacherBusy) {
        setSurveillances([...surveillances, { ...newSurveillance } as Surveillance]);
        setNewSurveillance({
          id_enseignant: undefined,
          id_jour: undefined,
          id_crenom: undefined,
          id_salle: undefined
        });
        setOpen(false);
      } else {
        alert("This teacher is already assigned to another room at this time slot.");
      }
    }
  };

  const getTeacherName = (id: number) => {
    const teacher = teachers.find(t => t.id_enseignant === id);
    return teacher ? `${teacher.prenom} ${teacher.nom}` : "Unknown";
  };

  const getTimeSlot = (id: number) => {
    return timeSlots.find(t => t.id_crenom === id)?.periode || "Unknown";
  };

  const getRoomName = (id: number) => {
    return rooms.find(r => r.id_salle === id)?.nom || "Unknown";
  };

  const getDayName = (id: number) => {
    return days.find(d => d.id_jour === id)?.nom || "Unknown";
  };

  // Filter by selected day and room (if selected)
  const filteredSurveillances = surveillances.filter(s => {
    let matches = s.id_jour === selectedDay;
    if (selectedRoom) {
      matches = matches && s.id_salle === selectedRoom;
    }
    return matches;
  });

  // Group by room and time slot for easier display
  const groupedSurveillances = filteredSurveillances.reduce((acc, surveillance) => {
    const key = `${surveillance.id_salle}-${surveillance.id_crenom}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(surveillance);
    return acc;
  }, {} as { [key: string]: Surveillance[] });

  // Calculate remaining supervisors needed for each room
  const calculateRemainingSlots = (roomId: number, timeSlotId: number) => {
    const room = rooms.find(r => r.id_salle === roomId);
    if (!room) return 0;
    
    const assigned = surveillances.filter(
      s => s.id_salle === roomId && s.id_jour === selectedDay && s.id_crenom === timeSlotId
    ).length;
    
    return Math.max(0, room.nbrens_surveillance - assigned);
  };

  return (
    <div>
      <PageHeader
        title="Surveillance Management"
        subtitle="Assign teachers to supervise exams"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-exam-accent hover:bg-exam-blue">
                <Plus className="h-4 w-4 mr-2" /> Assign Supervisor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Assign Teacher to Supervision</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="teacher">Teacher</Label>
                  <Select
                    onValueChange={(value) => setNewSurveillance({...newSurveillance, id_enseignant: parseInt(value)})}
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
                <div className="grid gap-2">
                  <Label htmlFor="day">Day</Label>
                  <Select
                    onValueChange={(value) => setNewSurveillance({...newSurveillance, id_jour: parseInt(value)})}
                  >
                    <SelectTrigger>
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
                <div className="grid gap-2">
                  <Label htmlFor="time-slot">Time Slot</Label>
                  <Select
                    onValueChange={(value) => setNewSurveillance({...newSurveillance, id_crenom: parseInt(value)})}
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
                    onValueChange={(value) => setNewSurveillance({...newSurveillance, id_salle: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id_salle} value={room.id_salle.toString()}>
                          Room {room.nom} (Needs {room.nbrens_surveillance} supervisors)
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
                <Button onClick={handleAddSurveillance}>Assign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Tabs defaultValue="by-day" className="mb-8">
        <TabsList>
          <TabsTrigger value="by-day">By Day</TabsTrigger>
          <TabsTrigger value="by-teacher">By Teacher</TabsTrigger>
        </TabsList>
        
        <TabsContent value="by-day" className="mt-4">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-full md:w-auto">
                  <Label htmlFor="day-filter" className="mb-2 block">Filter by Day</Label>
                  <Select 
                    value={selectedDay.toString()} 
                    onValueChange={(value) => setSelectedDay(parseInt(value))}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
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
                
                <div className="w-full md:w-auto">
                  <Label htmlFor="room-filter" className="mb-2 block">Filter by Room (Optional)</Label>
                  <Select 
                    value={selectedRoom?.toString() || ""} 
                    onValueChange={(value) => setSelectedRoom(value ? parseInt(value) : undefined)}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Rooms</SelectItem>
                      {rooms.map((room) => (
                        <SelectItem key={room.id_salle} value={room.id_salle.toString()}>
                          Room {room.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms
              .filter(room => !selectedRoom || room.id_salle === selectedRoom)
              .map(room => (
                <Card key={room.id_salle}>
                  <CardHeader>
                    <CardTitle>Room {room.nom}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {timeSlots.map(slot => {
                      const key = `${room.id_salle}-${slot.id_crenom}`;
                      const supervisions = groupedSurveillances[key] || [];
                      const remainingSlots = calculateRemainingSlots(room.id_salle, slot.id_crenom);
                      
                      return (
                        <div key={slot.id_crenom} className="mb-4">
                          <h4 className="font-medium mb-2">{slot.periode}</h4>
                          
                          {supervisions.length > 0 ? (
                            <div className="space-y-2">
                              {supervisions.map((supervision, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span>{getTeacherName(supervision.id_enseignant)}</span>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => {
                                      setSurveillances(surveillances.filter(s => 
                                        !(s.id_enseignant === supervision.id_enseignant && 
                                          s.id_jour === supervision.id_jour &&
                                          s.id_crenom === supervision.id_crenom &&
                                          s.id_salle === supervision.id_salle)
                                      ));
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-gray-500 italic">No supervisors assigned yet</div>
                          )}
                          
                          {remainingSlots > 0 && (
                            <div className="mt-2">
                              <Alert className="bg-yellow-50 border-yellow-200">
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                                <AlertDescription>
                                  Needs {remainingSlots} more supervisor{remainingSlots > 1 ? 's' : ''}
                                </AlertDescription>
                              </Alert>
                            </div>
                          )}
                          
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setNewSurveillance({
                                  id_jour: selectedDay,
                                  id_crenom: slot.id_crenom,
                                  id_salle: room.id_salle
                                });
                                setOpen(true);
                              }}
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add Supervisor
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="by-teacher" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teachers.map(teacher => {
              const teacherSurveillances = surveillances.filter(s => s.id_enseignant === teacher.id_enseignant);
              
              return (
                <Card key={teacher.id_enseignant}>
                  <CardHeader>
                    <CardTitle>{teacher.prenom} {teacher.nom}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {teacherSurveillances.length > 0 ? (
                      <div className="space-y-2">
                        {teacherSurveillances.map((surveillance, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <div className="font-medium">{getDayName(surveillance.id_jour)}</div>
                              <div className="text-sm text-gray-500">
                                {getTimeSlot(surveillance.id_crenom)} • Room {getRoomName(surveillance.id_salle)}
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => {
                                setSurveillances(surveillances.filter(s => 
                                  !(s.id_enseignant === surveillance.id_enseignant && 
                                    s.id_jour === surveillance.id_jour &&
                                    s.id_crenom === surveillance.id_crenom &&
                                    s.id_salle === surveillance.id_salle)
                                ));
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">No surveillance duties assigned</div>
                    )}
                    
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setNewSurveillance({
                            id_enseignant: teacher.id_enseignant
                          });
                          setOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Assign to Surveillance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SurveillancePage;
