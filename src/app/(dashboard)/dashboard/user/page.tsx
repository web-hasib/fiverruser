"use client";

import {
  ArrowRight,
  Download,
  Eye,
  FileText,
  Filter,
  Pencil,
  Settings,
  Timer,
  Trash2,
  Users
} from "lucide-react";

import Container from "@/src/components/Container";
import { ColumnDef, DataTable } from "@/src/components/dashboard/DataTable";
import { StatsCard } from "@/src/components/dashboard/StatsCard";
import { StatusBadge } from "@/src/components/dashboard/StatusBadge";
import Heading from "@/src/components/Heading";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface Patient {
  id: string;
  patientId: string;
  name: string;
  mobile: string;
  age: number;
  taskDate: string;
  tokens: number;
  status: "completed" | "pending" | "urgent" | "default";
}

// Mock data for the table
const patientData: Patient[] = [
  {
    id: "1",
    patientId: "MED-XXXX",
    name: "Wade Warren",
    mobile: "(603) 555-0123",
    age: 32,
    taskDate: "Aug 15, 2026",
    tokens: 452,
    status: "completed",
  },
  {
    id: "2",
    patientId: "MED-XXXX",
    name: "Courtney Henry",
    mobile: "(217) 555-0113",
    age: 24,
    taskDate: "Aug 15, 2026",
    tokens: 700,
    status: "completed",
  },
  {
    id: "3",
    patientId: "MED-XXXX",
    name: "Annette Black",
    mobile: "(201) 555-0124",
    age: 26,
    taskDate: "Aug 15, 2026",
    tokens: 200,
    status: "pending",
  },
  {
    id: "4",
    patientId: "MED-XXXX",
    name: "Jerome Bell",
    mobile: "(208) 555-0112",
    age: 27,
    taskDate: "Aug 15, 2026",
    tokens: 125,
    status: "pending",
  },
];

const UserDashboardPage = () => {
  const tableColumns: ColumnDef<Patient>[] = [
    { header: "Patient ID", accessorKey: "patientId" },
    {
      header: "Patient Name",
      cell: (item: Patient) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
            {item.name.charAt(0)}
          </div>
          <span>{item.name}</span>
        </div>
      ),
    },
    { header: "Mobile Number", accessorKey: "mobile" },
    { header: "Age", accessorKey: "age" },
    { header: "Task Date", accessorKey: "taskDate" },
    { header: "Usage Tokens", accessorKey: "tokens" },
    {
      header: "Status",
      cell: (item: Patient) => (
        <StatusBadge variant={item.status}>{item.status}</StatusBadge>
      ),
    },
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-3 text-primary-foreground/30">
          <Eye
            size={18}
            className="cursor-pointer hover:text-primary-foreground transition-colors"
          />
          <Pencil
            size={18}
            className="cursor-pointer hover:text-primary-foreground transition-colors"
          />
          <Trash2
            size={18}
            className="cursor-pointer hover:text-rose-500 transition-colors"
          />
        </div>
      ),
    },
  ];

  return (
    <Container className="space-y-10 pb-10">
      <Heading
        title="Welcome back, Dr. Saifur"
        subtitle="Manage your profile and track your progress here."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Active Case"
          value="12"
          trend="Patient visits up"
          trendValue="+3%"
          icon={FileText}
          chartData={[
            { value: 10 },
            { value: 15 },
            { value: 12 },
            { value: 20 },
            { value: 18 },
          ]}
        />
        <StatsCard
          title="Patients"
          value="1200"
          trend="Patient visits up"
          trendValue="+15%"
          icon={Users}
          chartData={[
            { value: 100 },
            { value: 300 },
            { value: 200 },
            { value: 500 },
            { value: 400 },
          ]}
        />
        <StatsCard
          title="Pending Tasks"
          value="7"
          trend="Urgent"
          trendValue="3"
          icon={Timer}
          chartData={[
            { value: 5 },
            { value: 8 },
            { value: 6 },
            { value: 10 },
            { value: 7 },
          ]}
        />
        <StatsCard
          title="AI Confidence Avg"
          value="95%"
          trend="Patient visits up"
          trendValue="+2%"
          icon={Settings}
          chartData={[
            { value: 90 },
            { value: 94 },
            { value: 92 },
            { value: 96 },
            { value: 95 },
          ]}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" className="">
          <Download className="mr-2" size={16} /> Download PDF
        </Button>
        <Button variant="outline" className="">
          <Filter className="mr-2" size={16} /> Filter
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={tableColumns} data={patientData} />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments / Tasks Card */}
        <div className="rounded-3xl bg-primary border border-primary-foreground/10 p-6 space-y-4">
          <h4 className="text-lg font-semibold text-primary-foreground mb-6">
            Appointments & Tasks
          </h4>
          <div className="space-y-4">
            {[
              {
                title: "Today's Appointments",
                count: "8 scheduled",
                color: "bg-blue-600",
                val: "13",
              },
              {
                title: "Pending Tasks",
                count: "Due today",
                color: "bg-amber-600",
                val: "7",
              },
              {
                title: "Upcoming Deadlines",
                count: "3 this week",
                color: "bg-emerald-600",
                val: "13",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors cursor-pointer border border-transparent hover:border-primary-foreground/20"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg",
                      item.color,
                    )}
                  >
                    <span className="text-lg font-bold">{item.val}</span>
                  </div>
                  <div>
                    <p className="font-medium text-primary-foreground">{item.title}</p>
                    <p className="text-xs text-primary-foreground/60">{item.count}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-primary-foreground/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Templates / Guides Card */}
        <div className="rounded-3xl bg-primary border border-primary-foreground/10 p-6 space-y-4">
          <h4 className="text-lg font-semibold text-primary-foreground mb-6">Library</h4>
          <div className="space-y-4">
            {[
              {
                title: "Cardiology Discharge Template",
                users: "234 Users",
                tag: "Cardiology",
              },
              {
                title: "Post-Op Summary Guidelines",
                users: "234 Users",
                tag: "Cardiology",
              },
              {
                title: "Pediatric History Format",
                users: "234 Users",
                tag: "Cardiology",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors cursor-pointer border border-transparent hover:border-primary-foreground/20"
              >
                <div className="space-y-2">
                  <p className="font-medium text-primary-foreground">{item.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] uppercase font-bold">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <FileText size={18} className="text-gray-600 ml-auto mb-1" />
                  <p className="text-[10px] text-gray-500">{item.users}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserDashboardPage;
