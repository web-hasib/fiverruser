"use client";

import React, { useState, useMemo } from "react";
import Heading from "@/src/components/Heading";
import Container from "@/src/components/Container";
import { Button } from "@/src/components/ui/button";
import { Plus, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";

// ── Feature Components ──────────────────────────────────────────────────────
import CreateTaskModal from "@/src/components/features/user/task/CreateTaskModal";
import TaskSidebar from "@/src/components/features/user/task/components/TaskSidebar";
import { FolderMembersModal } from "@/src/components/features/user/knowledge-base/components/FolderMembersModal";
import TaskSummaryCards from "@/src/components/features/user/task/components/TaskSummaryCards";
import TaskFilters from "@/src/components/features/user/task/components/TaskFilters";
import { TaskCard } from "@/src/components/features/user/task/components/TaskCard";
import TaskDetailsModal from "@/src/components/features/user/task/components/TaskDetailsModal";
import InviteModal from "@/src/components/features/user/task/components/InviteModal";
import DeleteTaskModal from "@/src/components/features/user/task/components/DeleteTaskModal";
import AddFolderModal from "@/src/components/features/user/task/components/AddFolderModal";
import DeleteFolderModal from "@/src/components/features/user/task/components/DeleteFolderModal";
import { Task, FolderItem, TaskPriority, TaskStatus } from "@/src/components/features/user/task/types";
import { DataTable, ColumnDef } from "@/src/components/dashboard/DataTable";
import { cn } from "@/src/lib/utils";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — swap these with real API calls later
// e.g. const { data: tasks } = useGetTasksQuery();
//      const { data: folders } = useGetFoldersQuery();
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Cardiology Discharge Template",
    dueDate: "Today, 09:00 AM",
    patientName: "Darrell Steward",
    patientId: "MED-0021",
    priority: "High",
    folderName: "Medical",
    status: "Overdue",
    assignedTo: ["Cameron Williamson", "Leslie Alexander"],
  },
  {
    id: "2",
    title: "Review Blood Test Results",
    dueDate: "Today, 11:30 AM",
    patientName: "Annette Black",
    patientId: "MED-0034",
    priority: "Medium",
    folderName: "Follow-up",
    status: "Overdue",
    assignedTo: ["Theresa Webb"],
  },
  {
    id: "3",
    title: "Pre-surgical Evaluation",
    dueDate: "Today, 02:00 PM",
    patientName: "Floyd Miles",
    patientId: "MED-0056",
    priority: "High",
    folderName: "Medical",
    status: "To Do",
    assignedTo: ["Cameron Williamson"],
  },
  {
    id: "4",
    title: "Lab Results Review",
    dueDate: "Today, 04:15 PM",
    patientName: "Bessie Cooper",
    patientId: "MED-0072",
    priority: "Low",
    folderName: "Documents",
    status: "In Progress",
    assignedTo: ["Jacob Jones", "Brooklyn Simmons"],
  },
  {
    id: "5",
    title: "Follow-up Consultation",
    dueDate: "Tomorrow, 10:00 AM",
    patientName: "Jane Cooper",
    patientId: "MED-0088",
    priority: "Medium",
    folderName: "Follow-up",
    status: "To Do",
    assignedTo: ["Darrell Steward"],
  },
  {
    id: "6",
    title: "Cardiac Assessment",
    dueDate: "Apr 22, 09:30 AM",
    patientName: "Marvin McKinney",
    patientId: "MED-0091",
    priority: "High",
    folderName: "Medical",
    status: "To Do",
    assignedTo: ["Cameron Williamson", "Floyd Miles"],
  },
  {
    id: "7",
    title: "Discharge Summary Documentation",
    dueDate: "Apr 23, 03:00 PM",
    patientName: "Arlene McCoy",
    patientId: "MED-0103",
    priority: "None",
    folderName: "Documents",
    status: "Complete",
    assignedTo: ["Theresa Webb"],
  },
  {
    id: "8",
    title: "Medication Review",
    dueDate: "Apr 24, 01:00 PM",
    patientName: "Cody Fisher",
    patientId: "MED-0115",
    priority: "Low",
    folderName: "Follow-up",
    status: "Complete",
    assignedTo: ["Leslie Alexander"],
  },
  {
    id: "9",
    title: "Specialist Referral Notes",
    dueDate: "Apr 25, 11:00 AM",
    patientName: "Kathryn Murphy",
    patientId: "MED-0127",
    priority: "Medium",
    folderName: "Medical",
    status: "In Progress",
    assignedTo: ["Jacob Jones"],
  },
  {
    id: "10",
    title: "Post-op Recovery Checklist",
    dueDate: "Apr 28, 08:00 AM",
    patientName: "Annette Black",
    patientId: "MED-0138",
    priority: "High",
    folderName: "Medical",
    status: "To Do",
    assignedTo: ["Cameron Williamson", "Brooklyn Simmons"],
  },
];

const INITIAL_MY_FOLDERS: FolderItem[] = [
  { id: "all",       name: "All Tasks", count: 10, color: "#2563eb" },
  { id: "medical",   name: "Medical",   count: 5,  color: "#ef4444" },
  { id: "followup",  name: "Follow-up", count: 3,  color: "#f97316" },
  { id: "documents", name: "Documents", count: 2,  color: "#10b981" },
];

const INITIAL_SHARED_FOLDERS: FolderItem[] = [
  { id: "team-cardiology", name: "Cardiology Team", count: 4, color: "#8b5cf6", isShared: true },
  { id: "team-general",    name: "General Ward",    count: 6, color: "#06b6d4", isShared: true },
];

const PRIORITY_OPTIONS: TaskPriority[] = ["High", "Medium", "Low", "None"];
const STATUS_OPTIONS: TaskStatus[] = ["To Do", "In Progress", "Complete", "Overdue"];

// ─── Page ─────────────────────────────────────────────────────────────────────
const TaskPage = () => {
  // ── Task state (swap with RTK Query later) ────────────────────────────────
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  // ── Folder state (swap with RTK Query later) ──────────────────────────────
  const [myFolders, setMyFolders] = useState<FolderItem[]>(INITIAL_MY_FOLDERS);
  const [selectedFolderId, setSelectedFolderId] = useState("all");

  // ── View state ─────────────────────────────────────────────────────────────
  const [view, setView] = useState<"grid" | "list">("list");

  // ── Expand state for View All ───────────────────────────────────────────────
  const [showAllOverdue, setShowAllOverdue] = useState(false);
  const [showAllToday, setShowAllToday] = useState(false);
  const [showAllRemaining, setShowAllRemaining] = useState(false);

  // ── Filter & Search state ───────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name A—Z");
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialty");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [assignedFilter, setAssignedFilter] = useState("All Assigned");

  // ── Modal state ────────────────────────────────────────────────────────────
  const [isCreateOpen,       setIsCreateOpen]       = useState(false);
  const [isAddFolderOpen,    setIsAddFolderOpen]    = useState(false);
  const [isAddSharedFolderOpen, setIsAddSharedFolderOpen] = useState(false);
  const [isShareOpen,        setIsShareOpen]        = useState(false);
  const [shareTarget,        setShareTarget]        = useState<FolderItem | null>(null);
  const [deleteTaskTarget,   setDeleteTaskTarget]   = useState<Task | null>(null);
  const [deleteFolderTarget, setDeleteFolderTarget] = useState<FolderItem | null>(null);
  const [editingTask,        setEditingTask]        = useState<Task | null>(null);
  const [isViewOpen,         setIsViewOpen]         = useState(false);
  const [viewingTask,        setViewingTask]        = useState<Task | null>(null);
  const [isMembersListOpen, setIsMembersListOpen]    = useState(false);
  const [selectedFolderForMembers, setSelectedFolderForMembers] = useState<FolderItem | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // ── Folder handlers (replace bodies with API calls) ───────────────────────
  const handleAddFolder = (name: string, color: string) => {
    const newFolder: FolderItem = {
      id: `folder-${Date.now()}`,
      name,
      count: 0,
      color,
    };
    // TODO: replace with mutation → createFolder({ name, color })
    setMyFolders((prev) => [...prev, newFolder]);
    setSelectedFolderId(newFolder.id);
  };

  const [sharedFolders, setSharedFolders] = useState<FolderItem[]>(INITIAL_SHARED_FOLDERS);

  const handleAddSharedFolder = (name: string, color: string) => {
    const newFolder: FolderItem = {
      id: `shared-folder-${Date.now()}`,
      name,
      count: 0,
      color,
      isShared: true,
    };
    setSharedFolders((prev) => [...prev, newFolder]);
    setSelectedFolderId(newFolder.id);
  };

  const handleRenameFolder = (id: string, newName: string) => {
    // TODO: replace with mutation → renameFolder({ id, name: newName })
    setMyFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
    );
  };

  const handleDeleteFolder = () => {
    if (!deleteFolderTarget) return;
    // TODO: replace with mutation → deleteFolder(deleteFolderTarget.id)
    setMyFolders((prev) => prev.filter((f) => f.id !== deleteFolderTarget.id));
    if (selectedFolderId === deleteFolderTarget.id) setSelectedFolderId("all");
    setDeleteFolderTarget(null);
  };

  const handleShareFolder = (folder: FolderItem) => {
    setShareTarget(folder);
    setIsShareOpen(true);
  };

  const handleMembers = (folder: FolderItem) => {
    setSelectedFolderForMembers(folder);
    setIsMembersListOpen(true);
  };

  // ── Task handlers (replace bodies with API calls) ─────────────────────────
  const handleDeleteTask = () => {
    if (!deleteTaskTarget) return;
    // TODO: replace with mutation → deleteTask(deleteTaskTarget.id)
    setTasks((prev) => prev.filter((t) => t.id !== deleteTaskTarget.id));
    // Update folder counts
    setMyFolders((prev) =>
      prev.map((f) => {
        if (f.id === "all") return { ...f, count: f.count - 1 };
        const matchName = f.name.toLowerCase() === deleteTaskTarget.folderName.toLowerCase();
        return matchName ? { ...f, count: Math.max(0, f.count - 1) } : f;
      })
    );
    setDeleteTaskTarget(null);
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setIsCreateOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsCreateOpen(true);
  };

  const handleSave = () => {
    setIsCreateOpen(false);
    setEditingTask(null);
  };

  const handleViewTask = (task: Task) => {
    setViewingTask(task);
    setIsViewOpen(true);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === "Complete" ? "To Do" : "Complete" }
          : t
      )
    );
  };

  const handleUpdatePriority = (taskId: string, priority: TaskPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, priority } : t))
    );
  };

  const handleUpdateStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  // ── View All helpers ───────────────────────────────────────────────────────
  const INITIAL_DISPLAY_COUNT = 5;
  
  const renderTaskGrid = (tasks: Task[], showAll: boolean, onToggle: () => void) => {
    const displayTasks = showAll ? tasks : tasks.slice(0, INITIAL_DISPLAY_COUNT);
    const hasMore = tasks.length > INITIAL_DISPLAY_COUNT;
    
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={handleEdit} 
              onDelete={(t) => setDeleteTaskTarget(t)} 
              onView={handleViewTask} 
              onToggleComplete={handleToggleComplete}
              onUpdatePriority={handleUpdatePriority}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
        {hasMore && (
          <button
            onClick={onToggle}
            className="mt-4 w-full py-3 bg-primary hover:bg-primary-foreground/5 border border-primary-foreground/20 rounded-xl text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
          >
            {showAll ? "Show Less" : `View All (${tasks.length - INITIAL_DISPLAY_COUNT} more)`}
          </button>
        )}
      </>
    );
  };

  // Define columns for DataTable
  const taskColumns: ColumnDef<Task>[] = [
    {
      header: "Task Title",
      cell: (task) => (
        <div className="flex items-center gap-3">
          <Checkbox 
            checked={task.status === "Complete"} 
            onCheckedChange={() => handleToggleComplete(task.id)}
            className="border-primary-foreground/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
          />
          <div onClick={() => handleEdit(task)} className="cursor-pointer group">
            <p className={cn(
              "font-medium text-primary-foreground group-hover:text-blue-500 transition-colors",
              task.status === "Complete" && "line-through text-primary-foreground/40"
            )}>
              {task.title}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date & Time",
    },
    {
      header: "Patient Name",
      cell: (task) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0">
            {task.patientName.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-blue-500 text-sm font-bold truncate hover:underline cursor-pointer">
              {task.patientName}
            </p>
            <p className="text-primary-foreground/40 text-[10px] font-medium uppercase tracking-tight">
              {task.patientId}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Priority",
      cell: (task) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={cn(
              "flex items-center justify-between gap-2 px-3 py-1 rounded-lg border text-xs font-bold w-[90px] cursor-pointer hover:bg-opacity-20 transition-all",
              task.priority === "High" ? "text-rose-500 bg-rose-500/10 border-rose-500/30" :
              task.priority === "Medium" ? "text-orange-500 bg-orange-500/10 border-orange-500/30" :
              task.priority === "Low" ? "text-blue-500 bg-blue-500/10 border-blue-500/30" :
              "text-gray-500 bg-gray-500/10 border-gray-500/30"
            )}>
              {task.priority}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#1e293b] border-white/10">
            {PRIORITY_OPTIONS.map((priority) => (
              <DropdownMenuItem 
                key={priority} 
                onClick={() => handleUpdatePriority(task.id, priority)}
                className="text-white hover:bg-white/10 cursor-pointer text-xs font-bold"
              >
                {priority}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "folderName",
      header: "Folder Name",
    },
    {
      header: "Status",
      cell: (task) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={cn(
              "flex items-center justify-between gap-2 px-3 py-1 rounded-lg border text-xs font-bold w-[100px] cursor-pointer hover:bg-opacity-20 transition-all",
              task.status === "Overdue" ? "text-rose-500 bg-rose-500/10 border-rose-500/30" :
              task.status === "Complete" ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" :
              task.status === "In Progress" ? "text-blue-500 bg-blue-500/10 border-blue-500/30" :
              "text-gray-500 bg-gray-500/10 border-gray-500/30"
            )}>
              {task.status}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#1e293b] border-white/10">
            {STATUS_OPTIONS.map((status) => (
              <DropdownMenuItem 
                key={status} 
                onClick={() => handleUpdateStatus(task.id, status)}
                className="text-white hover:bg-white/10 cursor-pointer text-xs font-bold"
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      header: "Assigned To",
      cell: (task) => (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
             {task.assignedTo.slice(0, 2).map((name, i) => (
               <div key={i} className={cn(
                 "size-7 rounded-full border-2 border-primary flex items-center justify-center text-[10px] font-bold text-white",
                 i === 0 ? "bg-blue-600" : "bg-indigo-600"
               )}>
                 {name.split(' ').map(n => n[0]).join('')}
               </div>
             ))}
          </div>
          <span className="text-primary-foreground/60 text-xs font-medium truncate max-w-[100px]">
            {task.assignedTo.join(', ')}
          </span>
        </div>
      ),
    },
    {
      header: "Action",
      cell: (task) => (
        <div className="flex items-center gap-3">
          <button onClick={() => setDeleteTaskTarget(task)} className="text-primary-foreground/50 hover:text-rose-500 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </button>
        </div>
      ),
    },
  ];

  const renderTaskList = (title: string, tasks: Task[], showAll: boolean, onToggle: () => void) => {
    const displayTasks = showAll ? tasks : tasks.slice(0, INITIAL_DISPLAY_COUNT);
    const hasMore = tasks.length > INITIAL_DISPLAY_COUNT;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-primary-foreground">{title}</h3>
          <span className="text-xs px-2 py-0.5 rounded-md font-bold text-white bg-primary-foreground/20">
            {tasks.length}
          </span>
        </div>
        <DataTable
          data={displayTasks}
          columns={taskColumns}
          className="rounded-xl"
        />
        {hasMore && (
          <button
            onClick={onToggle}
            className="w-full py-3 bg-primary hover:bg-primary-foreground/5 border border-primary-foreground/20 rounded-xl text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
          >
            {showAll ? "Show Less" : `View All (${tasks.length - INITIAL_DISPLAY_COUNT} more)`}
          </button>
        )}
      </div>
    );
  };

  // ── Derived data ───────────────────────────────────────────────────────────
  const filteredTasks = useMemo(() => {
    let result = tasks;
    
    // Filter by folder
    if (selectedFolderId !== "all") {
      const folder = [...myFolders, ...sharedFolders].find(
        (f) => f.id === selectedFolderId
      );
      if (folder) {
        result = result.filter(
          (t) => t.folderName.toLowerCase() === folder.name.toLowerCase()
        );
      }
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) => {
          const patientMatch = Array.isArray(t.patientName)
            ? t.patientName.some(n => n.toLowerCase().includes(q))
            : t.patientName.toLowerCase().includes(q);
            
          return t.title.toLowerCase().includes(q) ||
                 patientMatch ||
                 t.patientId.toLowerCase().includes(q);
        }
      );
    }
    
    // Filter by specialty
    if (specialtyFilter && specialtyFilter !== "All Specialty") {
      result = result.filter((t) => 
        t.folderName.toLowerCase().includes(specialtyFilter.toLowerCase())
      );
    }
    
    // Filter by priority
    if (priorityFilter && priorityFilter !== "All Priority") {
      result = result.filter((t) => t.priority === priorityFilter);
    }
    
    // Filter by status
    if (statusFilter && statusFilter !== "All Status") {
      result = result.filter((t) => t.status === statusFilter);
    }
    
    // Filter by assigned
    if (assignedFilter && assignedFilter !== "All Assigned") {
      result = result.filter((t) =>
        t.assignedTo.some((name) => name.includes(assignedFilter))
      );
    }
    
    // Sort
    if (sortBy === "Name A—Z") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Name Z—A") {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "Priority") {
      const pOrder = { High: 0, Medium: 1, Low: 2, None: 3 };
      result = [...result].sort((a, b) => pOrder[a.priority as TaskPriority] - pOrder[b.priority as TaskPriority]);
    }
    
    // Always sort Completed tasks to the end
    result = [...result].sort((a, b) => {
      if (a.status === "Complete" && b.status !== "Complete") return 1;
      if (a.status !== "Complete" && b.status === "Complete") return -1;
      return 0;
    });
    
    return result;
  }, [selectedFolderId, tasks, myFolders, sharedFolders, searchQuery, priorityFilter, statusFilter, assignedFilter, sortBy]);

  const overdueTasks  = filteredTasks.filter((t) => t.status === "Overdue");
  const todayTasks    = filteredTasks.filter((t) => t.dueDate.startsWith("Today") && t.status !== "Overdue");
  const remainingTasks = filteredTasks.filter((t) => !t.dueDate.startsWith("Today") && t.status !== "Overdue");

  const counts = useMemo(() => ({
    all:       filteredTasks.length,
    overdue:   filteredTasks.filter((t) => t.status === "Overdue").length,
    todo:      filteredTasks.filter((t) => t.status === "To Do").length,
    progress:  filteredTasks.filter((t) => t.status === "In Progress").length,
    completed: filteredTasks.filter((t) => t.status === "Complete").length,
  }), [filteredTasks]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full min-h-screen">
      {/* ── Sidebar (Desktop) ─────────────────────────────────────────── */}
      <div className="hidden lg:flex h-full">
        <TaskSidebar
          myFolders={myFolders}
          sharedFolders={sharedFolders}
          selectedFolderId={selectedFolderId}
          onSelectFolder={setSelectedFolderId}
          onAddFolder={() => setIsAddFolderOpen(true)}
          onAddSharedFolder={() => setIsAddSharedFolderOpen(true)}
          onShareFolder={handleShareFolder}
          onDeleteFolder={(folder) => setDeleteFolderTarget(folder)}
          onRenameFolder={handleRenameFolder}
          onMembers={handleMembers}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4">
        <Container>
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors text-primary-foreground">
                    <Menu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80 border-r-0 bg-transparent">
                  <TaskSidebar
                    myFolders={myFolders}
                    sharedFolders={sharedFolders}
                    selectedFolderId={selectedFolderId}
                    onSelectFolder={(id) => { setSelectedFolderId(id); setIsMobileSidebarOpen(false); }}
                    onAddFolder={() => { setIsAddFolderOpen(true); setIsMobileSidebarOpen(false); }}
                    onAddSharedFolder={() => { setIsAddSharedFolderOpen(true); setIsMobileSidebarOpen(false); }}
                    onShareFolder={handleShareFolder}
                    onDeleteFolder={(folder) => setDeleteFolderTarget(folder)}
                    onRenameFolder={handleRenameFolder}
                    onMembers={handleMembers}
                  />
                </SheetContent>
              </Sheet>
              <Heading title="Task" />
            </div>
            <Button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white size-10 p-0 flex items-center justify-center shadow-lg shadow-blue-600/20 rounded-xl transition-all"
            >
              <Plus size={24} strokeWidth={3} />
            </Button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <Heading title="Task" />
            <Button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-auto py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 rounded-xl transition-all"
            >
              <Plus size={20} strokeWidth={3} /> Add New Task
            </Button>
          </div>

          {/* Summary Cards */}
          <TaskSummaryCards 
            counts={counts} 
            onCardClick={setStatusFilter} 
            activeFilter={statusFilter}
          />

          {/* Filters */}
          <TaskFilters 
            view={view} 
            onViewChange={setView}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            specialtyFilter={specialtyFilter}
            onSpecialtyChange={setSpecialtyFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            assignedFilter={assignedFilter}
            onAssignedChange={setAssignedFilter}
          />

          {/* Task Lists / Grid */}
          {view === "grid" ? (
            // Grid View
            <div className="space-y-6">
              {overdueTasks.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-sm font-bold text-rose-500">Overdue Tasks</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md font-bold text-white bg-rose-500">
                      {overdueTasks.length}
                    </span>
                  </div>
                  {renderTaskGrid(overdueTasks, showAllOverdue, () => setShowAllOverdue(!showAllOverdue))}
                </div>
              )}

              {todayTasks.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-sm font-bold text-orange-500">Today's Tasks</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md font-bold text-white bg-orange-500">
                      {todayTasks.length}
                    </span>
                  </div>
                  {renderTaskGrid(todayTasks, showAllToday, () => setShowAllToday(!showAllToday))}
                </div>
              )}

              {remainingTasks.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-sm font-bold text-blue-500">Remaining Tasks</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md font-bold text-white bg-blue-500">
                      {remainingTasks.length}
                    </span>
                  </div>
                  {renderTaskGrid(remainingTasks, showAllRemaining, () => setShowAllRemaining(!showAllRemaining))}
                </div>
              )}
            </div>
          ) : (
            // List View
            <>
              {overdueTasks.length > 0 && (
                renderTaskList("Overdue Tasks", overdueTasks, showAllOverdue, () => setShowAllOverdue(!showAllOverdue))
              )}

              {todayTasks.length > 0 && (
                renderTaskList("Today's Tasks", todayTasks, showAllToday, () => setShowAllToday(!showAllToday))
              )}

              {remainingTasks.length > 0 && (
                renderTaskList("Remaining Tasks", remainingTasks, showAllRemaining, () => setShowAllRemaining(!showAllRemaining))
              )}
            </>
          )}

          {filteredTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500">
              <div className="size-16 rounded-full bg-[#161b22] flex items-center justify-center mb-4">
                <Plus size={28} className="text-gray-600" />
              </div>
              <p className="text-sm font-medium">No tasks in this folder yet.</p>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="mt-3 text-blue-500 text-sm font-bold hover:underline"
              >
                + Add your first task
              </button>
            </div>
          )}
        </Container>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────── */}

      {/* Create/Edit Task */}
      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => { setIsCreateOpen(false); setEditingTask(null); }}
        onSave={handleSave}
        task={editingTask}
      />

      {/* View Task Details */}
      <TaskDetailsModal
        isOpen={isViewOpen}
        onClose={() => { setIsViewOpen(false); setViewingTask(null); }}
        task={viewingTask}
      />

      <FolderMembersModal
        isOpen={isMembersListOpen}
        onClose={() => setIsMembersListOpen(false)}
        folderName={selectedFolderForMembers?.name || "Folder"}
        onAddMemberClick={() => setIsShareOpen(true)}
      />

      <AddFolderModal
        isOpen={isAddFolderOpen}
        onClose={() => setIsAddFolderOpen(false)}
        onSave={handleAddFolder}
      />

      <AddFolderModal
        isOpen={isAddSharedFolderOpen}
        onClose={() => setIsAddSharedFolderOpen(false)}
        onSave={handleAddSharedFolder}
        title="Add New Shared Folder"
        buttonText="Create Shared Folder"
      />

      {/* Share Folder */}
      <InviteModal
        isOpen={isShareOpen}
        onClose={() => { setIsShareOpen(false); setShareTarget(null); }}
        folderName={shareTarget?.name}
      />

      {/* Delete Task */}
      <DeleteTaskModal
        isOpen={!!deleteTaskTarget}
        onClose={() => setDeleteTaskTarget(null)}
        onConfirm={handleDeleteTask}
        taskTitle={deleteTaskTarget?.title ?? ""}
      />

      {/* Delete Folder */}
      <DeleteFolderModal
        isOpen={!!deleteFolderTarget}
        onClose={() => setDeleteFolderTarget(null)}
        onConfirm={handleDeleteFolder}
        folderName={deleteFolderTarget?.name ?? ""}
      />
    </div>
  );
};

export default TaskPage;
