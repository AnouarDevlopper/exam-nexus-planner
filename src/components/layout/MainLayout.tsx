
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-exam-lightBlue">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
