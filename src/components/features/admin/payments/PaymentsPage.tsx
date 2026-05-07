"use client";

import React, { useState } from "react";
import { 
    Search, 
    Download, 
    Plus, 
    Edit2, 
    Trash2, 
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { DashboardMainContainer } from "@/src/components/features/admin/dashboard/components/DashboardContainer";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import AddAIModelModal from "./components/AddAIModelModal";
import DeleteAIModelModal from "./components/DeleteAIModelModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Line,
    ComposedChart,
    Bar
} from "recharts";

const STATS = [
    { label: "MRR", value: "$32,247", change: "+ 8.3%", trend: "up", subText: "VS last month", color: "border-emerald-500" },
    { label: "ARR", value: "$513.6K", change: "+ 8.3%", trend: "up", subText: "YoY", color: "border-blue-500" },
    { label: "AI COST (MONTH)", value: "$8,240", change: "+ 8.3%", trend: "up", subText: "VS last month", color: "border-orange-500" },
    { label: "GROSS MARGIN", value: "80.7%", change: "- 8.3%", trend: "down", subText: "VS last month", color: "border-blue-500" },
];

const AI_MODELS = [
    { id: 1, name: "Claude- sonnet-4-6", inputCost: "$0.0030", outputCost: "$.0.0150", inputTokens: "1.80M", outputTokens: "Dhaka hospital", estCost: "1.80M", spend: "40%" },
    { id: 2, name: "Claude- sonnet-4-6", inputCost: "$0.0030", outputCost: "$.0.0150", inputTokens: "1.80M", outputTokens: "Dhaka hospital", estCost: "1.80M", spend: "40%" },
    { id: 3, name: "Claude- sonnet-4-6", inputCost: "$0.0030", outputCost: "$.0.0150", inputTokens: "1.80M", outputTokens: "Dhaka hospital", estCost: "1.80M", spend: "40%" },
    { id: 4, name: "Claude- sonnet-4-6", inputCost: "$0.0030", outputCost: "$.0.0150", inputTokens: "1.80M", outputTokens: "Dhaka hospital", estCost: "1.80M", spend: "40%" },
];

const CHART_DATA = [
    { name: "Jan", revenue: 400, aiCost: 200, net: 50 },
    { name: "Feb", revenue: 400, aiCost: 200, net: 50 },
    { name: "Mar", revenue: 400, aiCost: 200, net: 50 },
    { name: "Apr", revenue: 400, aiCost: 200, net: 50 },
    { name: "May", revenue: 400, aiCost: 200, net: 50 },
    { name: "June", revenue: 400, aiCost: 200, net: 50 },
];

const SUBSCRIPTIONS = [
    { id: 1, user: "Dr. Saifur Rahman", plan: "Team", amount: "$29/mo", billing: "Monthly", status: "Paid", renewal: "2026-04-12" },
    { id: 2, user: "Dr. Saifur Rahman", plan: "Team", amount: "$29/mo", billing: "Annual", status: "Expired", renewal: "2026-04-12" },
    { id: 3, user: "Dr. Saifur Rahman", plan: "Pro", amount: "$29/mo", billing: "Monthly", status: "Paid", renewal: "2026-04-12" },
    { id: 4, user: "Dr. Saifur Rahman", plan: "Starter", amount: "$29/mo", billing: "Monthly", status: "Paid", renewal: "2026-04-12" },
    { id: 5, user: "Dr. Saifur Rahman", plan: "Team", amount: "$29/mo", billing: "Annual", status: "Expired", renewal: "2026-04-12" },
    { id: 6, user: "Dr. Saifur Rahman", plan: "Pro", amount: "$29/mo", billing: "Monthly", status: "Expired", renewal: "2026-04-12" },
];

export default function PaymentsPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingModel, setEditingModel] = useState<any>(null);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    
    const [selectedPlan, setSelectedPlan] = useState("All Plans");
    const [selectedStatus, setSelectedStatus] = useState("All Status");

    const handleEdit = (model: any) => {
        setEditingModel(model);
        setIsAddModalOpen(true);
    };

    const handleDeleteClick = (model: any) => {
        setItemToDelete(model);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log("Deleting model:", itemToDelete?.name);
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };

    return (
        <DashboardMainContainer>
            <div className="min-h-full bg-background p-4 md:p-8 space-y-10 sora">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-xl font-medium text-foreground tracking-tight">Payment, Subscriptions & Revenue</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {STATS.map((stat, i) => (
                        <div key={i} className={cn(
                            "bg-card border-t-2 rounded-lg p-5 shadow-sm",
                            stat.color
                        )}>
                            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</div>
                            <div className="text-2xl font-bold text-foreground mb-3">{stat.value}</div>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "flex items-center text-[10px] font-bold",
                                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                                )}>
                                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                    {stat.change}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-medium">{stat.subText}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Model Cost Tracker */}
                <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
                    <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border">
                        <h2 className="text-lg font-medium text-foreground">AI model cost tracker</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] text-muted-foreground hidden sm:block">Enter your API costs - total spend auto- calculated from usage</span>
                            <Button 
                                onClick={() => {
                                    setEditingModel(null);
                                    setIsAddModalOpen(true);
                                }}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-9 px-4 rounded-lg flex items-center gap-1 text-xs"
                            >
                                <Plus className="w-4 h-4" />
                                ADD FEATURE
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[11px] text-muted-foreground uppercase tracking-wider border-b border-border bg-muted/30">
                                    <th className="px-6 py-4 font-medium">AI model</th>
                                    <th className="px-6 py-4 font-medium">Input cost/ 1K tokens</th>
                                    <th className="px-6 py-4 font-medium">Output cost/ 1K tokens</th>
                                    <th className="px-6 py-4 font-medium">Input token (month)</th>
                                    <th className="px-6 py-4 font-medium">Output token (month)</th>
                                    <th className="px-6 py-4 font-medium">Est. Cost</th>
                                    <th className="px-6 py-4 font-medium">% Of Spend</th>
                                    <th className="px-6 py-4 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {AI_MODELS.map((model) => (
                                    <tr key={model.id} className="text-[13px] text-foreground/80 hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-5 font-bold text-foreground">{model.name}</td>
                                        <td className="px-6 py-5">{model.inputCost}</td>
                                        <td className="px-6 py-5">{model.outputCost}</td>
                                        <td className="px-6 py-5">{model.inputTokens}</td>
                                        <td className="px-6 py-5">{model.outputTokens}</td>
                                        <td className="px-6 py-5 text-amber-500 font-bold">{model.estCost}</td>
                                        <td className="px-6 py-5">{model.spend}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => handleEdit(model)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 hover:bg-muted border border-border rounded text-[11px] text-foreground/70 transition-colors"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteClick(model)}
                                                    className="p-1.5 border border-red-500/50 rounded bg-red-500/5 hover:bg-red-500/10 text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="border-t border-border bg-muted/10">
                                <tr className="text-[13px] font-medium">
                                    <td colSpan={4} className="px-6 py-5">
                                        <div className="flex items-center gap-1">
                                            <span className="text-muted-foreground">Total AI spend:</span>
                                            <span className="text-blue-600 font-bold">$36.67/ month</span>
                                        </div>
                                    </td>
                                    <td colSpan={4} className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <span className="text-muted-foreground font-medium">Net revenue after AI :</span>
                                            <span className="text-emerald-500 font-bold">$36673.32</span>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Revenue vs AI Cost Chart */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-lg font-medium text-foreground">Revenue vs AI Cost - Last 6 Month</h2>
                        
                        <div className="flex items-center gap-6 ml-1">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                <span className="text-[12px] text-muted-foreground font-medium">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <span className="text-[12px] text-muted-foreground font-medium">AI Cost</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[12px] text-muted-foreground font-medium">Net</span>
                            </div>
                        </div>

                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={CHART_DATA} barGap={0} margin={{ top: 20, right: 20, left: -30, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fill: 'currentColor', fontSize: 13, fontWeight: 500, opacity: 0.6}} 
                                        dy={15} 
                                    />
                                    <YAxis hide />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                                        itemStyle={{ fontSize: '12px' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={35} />
                                    <Bar dataKey="aiCost" fill="#fbbf24" radius={[4, 4, 0, 0]} barSize={35} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="net" 
                                        stroke="#10b981" 
                                        strokeWidth={2} 
                                        dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} 
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Subscriptions */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-foreground">Subscriptions</h2>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-[350px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input 
                                    type="text" 
                                    placeholder="User, action, entity, IP" 
                                    className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>
                            
                            {/* Plans Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center justify-between gap-6 bg-card border border-border rounded-lg px-4 py-2 text-xs font-medium text-muted-foreground w-full md:w-auto hover:bg-muted/50 transition-colors group">
                                        {selectedPlan} <ChevronDown className="w-4 h-4 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[180px] bg-card border-border rounded-xl shadow-xl p-1 animate-in fade-in zoom-in-95">
                                    {["All Plans", "Starter", "Pro", "Team"].map((plan) => (
                                        <DropdownMenuItem 
                                            key={plan} 
                                            onClick={() => setSelectedPlan(plan)}
                                            className="rounded-lg py-2 px-3 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
                                        >
                                            {plan}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Status Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center justify-between gap-6 bg-card border border-border rounded-lg px-4 py-2 text-xs font-medium text-muted-foreground w-full md:w-auto hover:bg-muted/50 transition-colors group">
                                        {selectedStatus} <ChevronDown className="w-4 h-4 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[180px] bg-card border-border rounded-xl shadow-xl p-1 animate-in fade-in zoom-in-95">
                                    {["All Status", "Paid", "Expired", "Pending", "Cancelled"].map((status) => (
                                        <DropdownMenuItem 
                                            key={status} 
                                            onClick={() => setSelectedStatus(status)}
                                            className="rounded-lg py-2 px-3 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
                                        >
                                            {status}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-bold">
                                Paid: 823
                            </div>
                            <div className="bg-red-500/10 text-red-600 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-bold">
                                Expired: 18
                            </div>
                            <Button variant="ghost" className="bg-card border border-border text-muted-foreground hover:text-foreground h-9 px-4 gap-2 text-xs font-medium rounded-lg">
                                <Download className="w-4 h-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/20 border-b border-border">
                                    <tr className="text-[11px] text-muted-foreground uppercase tracking-wider">
                                        <th className="px-6 py-4 font-medium">User/ Team</th>
                                        <th className="px-6 py-4 font-medium">Plan</th>
                                        <th className="px-6 py-4 font-medium">Amount</th>
                                        <th className="px-6 py-4 font-medium">Billing</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Next Renewal</th>
                                        <th className="px-6 py-4 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {SUBSCRIPTIONS.map((sub) => (
                                        <tr key={sub.id} className="text-[13px] text-foreground/80 hover:bg-muted/10 transition-colors">
                                            <td className="px-6 py-5 font-bold text-foreground">{sub.user}</td>
                                            <td className="px-6 py-5">
                                                <span className={cn(
                                                    "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                                    sub.plan === "Team" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
                                                    sub.plan === "Pro" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" :
                                                    "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                                                )}>
                                                    {sub.plan}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-emerald-600 font-medium">{sub.amount}</td>
                                            <td className="px-6 py-5 text-muted-foreground font-medium">{sub.billing}</td>
                                            <td className="px-6 py-5">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                    sub.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                                                    "bg-red-500/10 text-red-600 border border-red-500/20"
                                                )}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-muted-foreground">{sub.renewal}</td>
                                            <td className="px-6 py-5 text-right">
                                                <Button variant="ghost" className="bg-muted/30 hover:bg-muted h-8 px-4 text-[11px] font-bold text-muted-foreground rounded transition-colors border border-transparent hover:border-border">
                                                    Receipt
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <AddAIModelModal 
                open={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setEditingModel(null);
                }}
                onSave={(data) => {
                    console.log("Saving AI Model:", data);
                }}
                initialData={editingModel}
            />

            <DeleteAIModelModal 
                open={isDeleteModalOpen}
                modelName={itemToDelete?.name ?? ""}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setItemToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </DashboardMainContainer>
    );
}
