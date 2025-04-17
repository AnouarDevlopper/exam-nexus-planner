
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-6 flex justify-between items-start", className)}>
      <div>
        <h1 className="text-2xl font-bold text-exam-blue">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-exam-gray">{subtitle}</p>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
