
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  BookOpen, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Columns, 
  Home, 
  LayoutDashboard, 
  Map,
  School,
  User,
  Users,
  BookText,
  ClipboardCheck
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  expanded: boolean;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, title, path, expanded, active }: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center py-3 px-3 rounded-lg transition-colors duration-200",
        active 
          ? "bg-exam-accent text-white" 
          : "text-exam-blue hover:bg-exam-lightBlue"
      )}
    >
      <Icon className="h-5 w-5 min-w-5" />
      {expanded && <span className="ml-3 font-medium">{title}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/" },
    { title: "Faculties", icon: School, path: "/faculties" },
    { title: "Levels", icon: BookOpen, path: "/levels" },
    { title: "Groups", icon: Users, path: "/groups" },
    { title: "Teachers", icon: User, path: "/teachers" },
    { title: "Modules", icon: BookText, path: "/modules" },
    { title: "Rooms", icon: Columns, path: "/rooms" },
    { title: "Schedules", icon: Calendar, path: "/schedules" },
    { title: "Surveillance", icon: ClipboardCheck, path: "/surveillance" },
    { title: "Room Map", icon: Map, path: "/room-map" },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {expanded && (
          <h1 className="text-xl font-bold text-exam-blue">
            Exam Nexus
          </h1>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg hover:bg-exam-lightBlue text-exam-blue transition-colors"
        >
          {expanded ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            title={item.title}
            path={item.path}
            expanded={expanded}
            active={location.pathname === item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
