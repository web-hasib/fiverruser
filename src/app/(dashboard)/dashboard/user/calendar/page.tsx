"use client";

import React, { useState } from "react";
import CreateTaskModal from "@/src/components/features/user/task/CreateTaskModal";
import { AnimatePresence, motion } from "framer-motion";
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, setMonth, setYear } from "date-fns";

// --- Components ---
import { CalendarSidebar } from "./components/CalendarSidebar";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarGrid } from "./components/CalendarGrid";
import { WeeklyGrid } from "./components/WeeklyGrid";
import { DayGrid } from "./components/DayGrid";

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  color: string;
  priority: "High" | "Medium" | "Low" | "None";
  status: "To Do" | "In Progress" | "Complete" | "Overdue";
  folderName: string;
  patientName: string;
  assignedTo: string[];
}

const mockEvents: Event[] = [
  { 
    id: "e1", 
    title: "Surgery Prep - Room 302", 
    description: "Prepare all surgical tools for the upcoming appendectomy.",
    date: new Date(2026, 4, 8, 9, 0), 
    color: "purple",
    priority: "High",
    status: "To Do",
    folderName: "Surgery",
    patientName: "Ronald Richards",
    assignedTo: ["Cameron W", "Theresa Webb"]
  },
  { 
    id: "e2", 
    title: "Meeting with Dr. Saifur", 
    description: "Discuss case reports for patients in the cardiology ward.",
    date: new Date(2026, 4, 8, 11, 30), 
    color: "green",
    priority: "Medium",
    status: "In Progress",
    folderName: "Meetings",
    patientName: "Annette Black",
    assignedTo: ["Darrell Steward"]
  },
  { 
    id: "e3", 
    title: "Cardiology Lab Results Review", 
    description: "Review ECG and blood test results for the morning rounds.",
    date: new Date(2026, 4, 8, 14, 0), 
    color: "blue",
    priority: "High",
    status: "To Do",
    folderName: "Medical",
    patientName: "Floyd Miles",
    assignedTo: ["Bessie Cooper"]
  },
  { 
    id: "e4", 
    title: "Patient Follow-up", 
    date: new Date(2026, 4, 11, 10, 0), 
    color: "blue",
    priority: "Low",
    status: "Complete",
    folderName: "Follow-up",
    patientName: "Brooklyn Simmons",
    assignedTo: ["Arlene McCoy"]
  },
  { 
    id: "e5", 
    title: "General Ward Rounds", 
    date: new Date(2026, 4, 11, 15, 30), 
    color: "red",
    priority: "High",
    status: "Overdue",
    folderName: "General",
    patientName: "Jacob Jones",
    assignedTo: ["Floyd Miles"]
  },
  { 
    id: "e6", 
    title: "Staff Coordination Meeting", 
    date: new Date(2026, 4, 15, 9, 0), 
    color: "orange",
    priority: "Medium",
    status: "To Do",
    folderName: "Admin",
    patientName: "Annette Black",
    assignedTo: ["Kathryn Murphy"]
  },
  { 
    id: "e7", 
    title: "Emergency Response Drill", 
    date: new Date(2026, 4, 21, 13, 0), 
    color: "red",
    priority: "High",
    status: "To Do",
    folderName: "Emergency",
    patientName: "Wade Warren",
    assignedTo: ["All Staff"]
  },
];

const CalendarPage = () => {
  const [view, setView] = useState("Monthly");
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["purple", "green", "blue", "red", "orange"]);

  // Auto-collapse on mobile devices
  React.useEffect(() => {
    if (window.innerWidth < 1280) {
      setIsCollapsed(true);
    }
  }, []);

  const handlePrev = () => {
    if (view === "Monthly") setCurrentDate(prev => subMonths(prev, 1));
    else if (view === "Weekly") setCurrentDate(prev => subWeeks(prev, 1));
    else if (view === "Day") setCurrentDate(prev => subDays(prev, 1));
  };

  const handleNext = () => {
    if (view === "Monthly") setCurrentDate(prev => addMonths(prev, 1));
    else if (view === "Weekly") setCurrentDate(prev => addWeeks(prev, 1));
    else if (view === "Day") setCurrentDate(prev => addDays(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleToggleFilter = (color: string) => {
    setSelectedFilters(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const filteredEvents = mockEvents.filter(event => selectedFilters.includes(event.color));

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    // Map Event to Task using full event details
    const taskData = {
      id: event.id,
      title: event.title,
      description: event.description,
      dueDate: event.date.toISOString(),
      patientName: event.patientName,
      patientId: "MED-XXXX", // dummy id
      priority: event.priority,
      folderName: event.folderName,
      status: event.status,
      assignedTo: event.assignedTo,
    };
    setSelectedTask(taskData);
    setSelectedDate(event.date);
    setIsModalOpen(true);
  };

  return (
    <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-150px)] overflow-hidden bg-background transition-colors flex flex-col w-full max-w-none p-0 m-0 relative">
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCollapsed(true)}
            className="fixed inset-0 bg-black/40 z-40 xl:hidden backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden h-full w-full">
        {/* Left Sidebar */}
        <div className="h-full overflow-y-auto no-scrollbar scroll-smooth shrink-0">
          <CalendarSidebar 
            isCollapsed={isCollapsed} 
            setIsCollapsed={setIsCollapsed} 
            selectedFilters={selectedFilters}
            onToggleFilter={handleToggleFilter}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-card rounded-lg md:rounded-2xl shadow-sm border-none md:border border-border/50 w-full min-w-0 h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
            <div className="p-2 md:p-6 flex flex-col min-h-full">
              <CalendarHeader
                currentDate={currentDate}
                view={view}
                setView={setView}
                onAddTask={() => setIsModalOpen(true)}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                onPrev={handlePrev}
                onNext={handleNext}
                onToday={handleToday}
              />

              <div className="flex-1 mt-2 md:mt-4 flex flex-col">
                {view === "Monthly" && <CalendarGrid currentDate={currentDate} events={filteredEvents} onDayClick={handleDayClick} onEventClick={handleEventClick} />}
                {view === "Weekly" && <WeeklyGrid currentDate={currentDate} events={filteredEvents} onDayClick={handleDayClick} onEventClick={handleEventClick} />}
                {view === "Day" && <DayGrid currentDate={currentDate} events={filteredEvents} onDayClick={handleDayClick} onEventClick={handleEventClick} />}
              </div>
              
            </div>
          </div>
        </main>
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        initialDate={selectedDate}
        task={selectedTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
};

export default CalendarPage;
