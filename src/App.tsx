import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Faculties from "./pages/Faculties";
import Levels from "./pages/Levels";
import Groups from "./pages/Groups";
import Teachers from "./pages/Teachers";
import Modules from "./pages/Modules";
import Rooms from "./pages/Rooms";
import Schedules from "./pages/Schedules";
import Surveillance from "./pages/Surveillance";
import RoomMap from "./pages/RoomMap";
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/faculties" element={<MainLayout><Faculties /></MainLayout>} />
          <Route path="/levels" element={<MainLayout><Levels /></MainLayout>} />
          <Route path="/groups" element={<MainLayout><Groups /></MainLayout>} />
          <Route path="/teachers" element={<MainLayout><Teachers /></MainLayout>} />
          <Route path="/modules" element={<MainLayout><Modules /></MainLayout>} />
          <Route path="/rooms" element={<MainLayout><Rooms /></MainLayout>} />
          <Route path="/schedules" element={<MainLayout><Schedules /></MainLayout>} />
          <Route path="/surveillance" element={<MainLayout><Surveillance /></MainLayout>} />
          <Route path="/room-map" element={<MainLayout><RoomMap /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
