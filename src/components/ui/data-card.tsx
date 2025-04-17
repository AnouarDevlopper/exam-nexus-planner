
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DataCardProps {
  title: string;
  icon?: React.ElementType;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function DataCard({ title, icon: Icon, children, className, action }: DataCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm overflow-hidden", className)}>
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-exam-blue" />}
          <h3 className="font-medium text-exam-blue">{title}</h3>
        </div>
        {action}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
