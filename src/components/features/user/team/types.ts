export interface Task {
    id: string;
    title: string;
    category: string;
    assignedBy: string;
    priority: "High" | "Medium" | "Low";
    completed: boolean;
}

export interface TeamMember {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mobileNumber: string;
    pager: string;
    role: string;
    roles: string[];
    department: string;
    specialty: string;
    specialties: string[];
    profession: string;
    status: "on-duty" | "on-call" | "on-or" | "day-off";
    scheduleType: "Regular" | "Custom";
    scheduleDays: string;
    scheduleTime: string;
    tasks: number;
    joinDate: string;
    accessType: "Member" | "Team Admin" | "Department Admin";
    assignedTasks: Task[];
    tasksList: Task[];
}
