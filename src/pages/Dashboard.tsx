
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Calendar, Columns, School, User, Users } from "lucide-react";

const Dashboard = () => {
  // Mock data for dashboard metrics
  const stats = [
    { title: "Faculties", value: 5, icon: School, color: "bg-blue-100 text-blue-600" },
    { title: "Teachers", value: 128, icon: User, color: "bg-green-100 text-green-600" },
    { title: "Students", value: 1280, icon: Users, color: "bg-purple-100 text-purple-600" },
    { title: "Rooms", value: 45, icon: Columns, color: "bg-amber-100 text-amber-600" },
    { title: "Exams", value: 98, icon: Calendar, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div>
      <PageHeader
        title="Exam Nexus Dashboard"
        subtitle="Manage university exam scheduling efficiently"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="text-lg font-medium mb-4">Upcoming Exams</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-md p-3 flex justify-between">
                <div>
                  <p className="font-medium">Database Systems</p>
                  <p className="text-sm text-gray-500">Computer Science - Group A</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Room 301</p>
                  <p className="text-sm text-gray-500">May 15, 10:00 AM</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-3 py-2 border-b last:border-0">
                <div className="bg-gray-100 rounded-full p-1.5">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Engineering Mathematics exam scheduled</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
