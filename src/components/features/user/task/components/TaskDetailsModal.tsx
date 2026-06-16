"use client";

import React from "react";
import { DashboardModal } from "@/src/components/dashboard/DashboardModal";
import { Task } from "../types";
import { 
  User, 
  IdCard, 
  Calendar, 
  Clock, 
  Folder, 
  Users, 
  AlertCircle, 
  CheckCircle2,
  ChevronDown 
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskDetailsModal = ({ isOpen, onClose, task }: TaskDetailsModalProps) => {
  if (!task) return null;

  const firstPatient = Array.isArray(task.patientName) ? task.patientName[0] || "" : task.patientName;
  const patientNameStr = Array.isArray(task.patientName) ? task.patientName.join(", ") : task.patientName;

  return (
    <DashboardModal isOpen={isOpen} onClose={onClose} title={task.title} maxWidth="sm:max-w-[450px]">
      <div className="flex flex-col items-center pt-2 pb-6">
        {/* Avatar */}
        <div className="size-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white uppercase shadow-lg shadow-blue-600/20 mb-6 shrink-0">
          {firstPatient.slice(0, 2)}
        </div>
        
        {/* Subtitle/Description */}
        <p className="text-muted-foreground text-sm text-center px-8 mb-8 line-clamp-3">
          {task.description || "No description provided for this task."}
        </p>

        <div className="w-full space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider px-1">Basic Information</h3>
            
            <div className="space-y-3">
              <InfoRow icon={<User size={18} />} label="Patient Name:" value={patientNameStr} />
              <InfoRow icon={<IdCard size={18} />} label="Patient ID:" value={task.patientId} />
              <InfoRow icon={<Calendar size={18} />} label="Date :" value={task.dueDate.split('|')[0].trim()} />
              <InfoRow icon={<Clock size={18} />} label="Start Time:" value={task.dueDate.split('|')[1]?.trim() || "8:12 AM"} />
              <InfoRow icon={<Clock size={18} />} label="End Time:" value="8:50 AM" />
              <InfoRow icon={<Folder size={18} />} label="Folder Name:" value={task.folderName} />
              <InfoRow icon={<Users size={18} />} label="Assigned To:" value={task.assignedTo.join('\n')} multiLine />
            </div>
          </div>

          <div className="pt-4 border-t border-[#30363d]/50 space-y-4">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider px-1">Tags...</h3>
            
            <div className="space-y-3">
              <div className="bg-[#161b22]/50 rounded-xl p-3 border border-[#30363d]/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium text-gray-300 italic">Priority</span>
                </div>
                <div className="flex items-center gap-2 bg-[#ef4444]/10 border border-[#ef4444]/30 px-3 py-1 rounded-lg text-[#ef4444] text-xs font-bold min-w-[80px] justify-between">
                  {task.priority}
                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="bg-[#161b22]/50 rounded-xl p-3 border border-[#30363d]/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium text-gray-300 italic">Status</span>
                </div>
                <div className="flex items-center gap-2 bg-[#ef4444]/10 border border-[#ef4444]/30 px-3 py-1 rounded-lg text-[#ef4444] text-xs font-bold min-w-[100px] justify-between">
                  {task.status}
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardModal>
  );
};

const InfoRow = ({ 
  icon, 
  label, 
  value, 
  multiLine = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  multiLine?: boolean 
}) => (
  <div className="flex items-start justify-between group">
    <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
      {icon}
      <span className="text-sm font-medium italic">{label}</span>
    </div>
    <div className="text-right">
      {multiLine ? (
        value.split('\n').map((v, i) => (
          <p key={i} className="text-sm font-semibold text-gray-200">{v}</p>
        ))
      ) : (
        <p className="text-sm font-semibold text-gray-200">{value}</p>
      )}
    </div>
  </div>
);

export default TaskDetailsModal;
