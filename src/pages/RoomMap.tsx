
import { DataCard } from "@/components/ui/data-card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Columns, MapPin, Search, User } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Room, TimeSlot } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RoomMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  
  // Mock data for faculties
  const faculties = [
    { id_faculte: 1, nom: "Faculty of Engineering" },
    { id_faculte: 2, nom: "Faculty of Science" },
    { id_faculte: 3, nom: "Faculty of Medicine" },
    { id_faculte: 4, nom: "Faculty of Arts" },
    { id_faculte: 5, nom: "Faculty of Law" },
  ];
  
  // Mock data for rooms
  const rooms: Room[] = [
    { id_salle: 1, nom: "101", capacite: 50, nbrens_surveillance: 2, id_faculte: 1 },
    { id_salle: 2, nom: "102", capacite: 75, nbrens_surveillance: 3, id_faculte: 1 },
    { id_salle: 3, nom: "201", capacite: 100, nbrens_surveillance: 4, id_faculte: 2 },
    { id_salle: 4, nom: "202", capacite: 30, nbrens_surveillance: 1, id_faculte: 2 },
    { id_salle: 5, nom: "301", capacite: 60, nbrens_surveillance: 2, id_faculte: 3 },
    { id_salle: 6, nom: "A1", capacite: 45, nbrens_surveillance: 2, id_faculte: 4 },
    { id_salle: 7, nom: "L1", capacite: 80, nbrens_surveillance: 3, id_faculte: 5 },
  ];

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

  // Mock data for available rooms
  const availableRooms = [
    { id_salle: 1, id_jour: 1, id_crenom: 1 },
    { id_salle: 2, id_jour: 1, id_crenom: 2 },
    { id_salle: 3, id_jour: 2, id_crenom: 3 },
    { id_salle: 4, id_jour: 2, id_crenom: 4 },
    { id_salle: 5, id_jour: 3, id_crenom: 1 },
    { id_salle: 6, id_jour: 3, id_crenom: 2 },
    { id_salle: 7, id_jour: 4, id_crenom: 3 },
    { id_salle: 1, id_jour: 4, id_crenom: 4 },
    { id_salle: 2, id_jour: 5, id_crenom: 1 },
    { id_salle: 3, id_jour: 5, id_crenom: 2 },
  ];

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>(1);

  const getFacultyName = (id: number) => {
    return faculties.find(f => f.id_faculte === id)?.nom || "Unknown";
  };

  const isRoomAvailable = (roomId: number, dayId: number, timeSlotId: number) => {
    return availableRooms.some(
      r => r.id_salle === roomId && r.id_jour === dayId && r.id_crenom === timeSlotId
    );
  };

  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter(room => {
    let matches = room.nom.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCapacity) {
      const capacity = parseInt(selectedCapacity);
      matches = matches && room.capacite >= capacity;
    }
    
    if (selectedFaculty) {
      matches = matches && room.id_faculte === parseInt(selectedFaculty);
    }
    
    // Only show available rooms for the selected day and time slot
    if (selectedDay && selectedTimeSlot) {
      matches = matches && isRoomAvailable(room.id_salle, selectedDay, selectedTimeSlot);
    }
    
    return matches;
  });

  // Group rooms by faculty for the faculty view
  const roomsByFaculty = filteredRooms.reduce((acc, room) => {
    const faculty = room.id_faculte;
    if (!acc[faculty]) {
      acc[faculty] = [];
    }
    acc[faculty].push(room);
    return acc;
  }, {} as { [key: number]: Room[] });

  return (
    <div>
      <PageHeader
        title="Room Map"
        subtitle="Find and visualize available exam rooms"
      />

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="search-rooms" className="mb-2 block">Search Rooms</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="search-rooms"
                  placeholder="Room number..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="capacity-filter" className="mb-2 block">Minimum Capacity</Label>
              <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
                <SelectTrigger>
                  <SelectValue placeholder="Any capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any capacity</SelectItem>
                  <SelectItem value="30">30+ students</SelectItem>
                  <SelectItem value="50">50+ students</SelectItem>
                  <SelectItem value="75">75+ students</SelectItem>
                  <SelectItem value="100">100+ students</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="faculty-filter" className="mb-2 block">Faculty</Label>
              <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="All faculties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All faculties</SelectItem>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty.id_faculte} value={faculty.id_faculte.toString()}>
                      {faculty.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="day-filter" className="mb-2 block">Day</Label>
              <Select value={selectedDay.toString()} onValueChange={(value) => setSelectedDay(parseInt(value))}>
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
            
            <div>
              <Label htmlFor="time-slot-filter" className="mb-2 block">Time Slot</Label>
              <Select value={selectedTimeSlot.toString()} onValueChange={(value) => setSelectedTimeSlot(parseInt(value))}>
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
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="grid" className="mb-8">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="faculty">Faculty View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <DataCard
                key={room.id_salle}
                title={`Room ${room.nom}`}
                icon={Columns}
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-[1fr_auto] gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>Capacity:</span>
                    </div>
                    <div>{room.capacite} students</div>
                    
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>Supervisors:</span>
                    </div>
                    <div>{room.nbrens_surveillance}</div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>Faculty:</span>
                    </div>
                    <div>{getFacultyName(room.id_faculte)}</div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Day:</span>
                    </div>
                    <div>{days.find(d => d.id_jour === selectedDay)?.nom}</div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Time:</span>
                    </div>
                    <div>{timeSlots.find(t => t.id_crenom === selectedTimeSlot)?.periode}</div>
                  </div>
                  
                  <div className="pt-2">
                    <Button size="sm" className="w-full">
                      Book Room
                    </Button>
                  </div>
                </div>
              </DataCard>
            ))}
            
            {filteredRooms.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No rooms match your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="faculty" className="mt-4">
          <div className="space-y-8">
            {Object.entries(roomsByFaculty).map(([facultyId, rooms]) => (
              <Card key={facultyId}>
                <CardHeader>
                  <CardTitle>{getFacultyName(parseInt(facultyId))}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                      <div key={room.id_salle} className="border rounded-lg p-4 bg-white shadow-sm">
                        <h4 className="font-medium mb-2">Room {room.nom}</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Capacity:</span>
                            <span>{room.capacite} students</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Supervisors:</span>
                            <span>{room.nbrens_surveillance}</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-3">
                          Book Room
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {Object.keys(roomsByFaculty).length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No rooms match your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoomMap;
