import { LucideIcon } from "lucide-react";

export type KnowledgeEntryType = "Note" | "Protocol" | "Policy" | "Guideline" | "Reference" | "Upload File";

export interface KnowledgeEntry {
  id: string;
  type: KnowledgeEntryType;
  title: string;
  summary: string;
  date: string;
  views: number;
  specialty: string;
  tags: string[];
  isPinned?: boolean;
  isFavorite?: boolean;
  isAiContext?: boolean;
  folder?: string;
  content?: string;
  attachments?: string[];
  links?: {
    patients?: string[];
    sessions?: string[];
  };
}

export interface SidebarItem {
  id: string;
  label: string;
  count: number;
  icon?: LucideIcon;
  color?: string;
}

export interface FolderItem extends SidebarItem {
  isCustom?: boolean;
}
