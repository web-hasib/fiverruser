// Shared types for the Teams/Org admin section

export type PlanType = "Free" | "Pro" | "Enterprise";
export type PaymentStatus = "Paid" | "Expired" | "Trail";
export type OrgStatus = "Active" | "Inactive" | "Flagged";
export type OrgType = "Hospital" | "Clinic" | "Lab" | "Pharmacy" | "Other";

export interface OrgTeam {
    id: string;
    name: string;
    type: OrgType | string;
    country: string;
    plan: PlanType | string;
    payment: PaymentStatus | string;
    users: number;
    depts: number;
    tokenLimit: number;
    tokenUsed: number;
    storageLimitGB: number;
    storageUsedGB: number;
    isUnlimitedStorage: boolean;
    status: OrgStatus | string;
    // Edit modal extras
    contactEmail: string;
    phone: string;
    address: string;
    billingAddress: string;
    city: string;
    vatNumber: string;
    zipCode: string;
    sessionsLimit: number;
    storageLimitOverride: string;
    storageUsed: string;
    avatar?: string;
}
