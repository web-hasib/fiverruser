"use client";
import { CheckSquare, UserSquareIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiChart } from "react-icons/bi";
import { PiUsers } from "react-icons/pi";

interface FolderItem {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  description: string;
  color: string;
  patients: number;
  active: number;
  tasks: number;
  capacity: number;
  capacityMax: number;
  members: string[];
  modifiedLabel: string;
}

interface SharedFolderCardProps {
  folder: FolderItem;
}

export const SharedFolderCard = ({ folder }: SharedFolderCardProps) => {
  const router = useRouter();
  const capacityPct = Math.round((folder.patients / folder.capacityMax) * 100);

  return (
    <div
      onClick={() => router.push(`/dashboard/user/patients/shared/${folder.id}`)}
      className="bg-card border border-border/50 rounded-md overflow-hidden cursor-pointer hover:border-border transition-all group flex flex-col"
      style={{ borderTop: `6px solid ${folder.color}` }}
    >
      {/* Header */}
      <div className="p-4 pb-0 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="size-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${folder.color}20` }}>
            <PiUsers className="size-5" style={{ color: folder.color }} />
          </div>
          <span
            className="text-[10px] font-bold px-2 py-1 rounded-full border"
            style={{ borderColor: `${folder.categoryColor}40`, color: folder.categoryColor, backgroundColor: `${folder.categoryColor}10` }}
          >
            {folder.category}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-foreground group-hover:text-blue-500 transition-colors leading-tight">{folder.name}</h3>
          <p className="text-xs text-foreground mt-1 dark:font-[300] light:font-normal leading-relaxed line-clamp-2">{folder.description}</p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-auto pt-2">
          <div className="flex items-center gap-1">
            <UserSquareIcon className="size-4.5 text-green-500" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-green-500">{folder.patients}</span>
              <span className="text-[9px] -mt-1 text-muted-foreground">Patients</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <BiChart className="size-5.5 text-yellow-500" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-yellow-500">{folder.active}</span>
              <span className="text-[9px] text-muted-foreground -mt-1">Active</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <CheckSquare className="size-4.5 text-blue-500" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-blue-500">{folder.tasks}</span>
              <span className="text-[9px] text-muted-foreground -mt-1">Tasks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="px-4 pb-3 pt-4">
        <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
          <div
            className="h-full rounded-[1.5px] transition-all"
            style={{ width: `${capacityPct}%`, backgroundColor: folder.color }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[9px] text-foreground">{folder.patients}/{folder.capacityMax} patient capacity</span>
          <span className="text-[9px] font-bold" style={{ color: folder.color }}>{capacityPct}%</span>
        </div>
      </div>

      {/* Footer */}
      <Link 
        href={`/dashboard/user/patients/shared/${folder.id}/members`} 
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/5 group/link"
      >
        <div className="flex items-center gap-1">
          {folder.members.map((m, i) => (
            <div
              key={i}
              className="size-6 rounded-full bg-blue-600/80 text-white text-[8px] font-black flex items-center justify-center border border-card -ml-3 first:ml-0"
            >
              {m}
            </div>
          ))}
        </div>
        <span className="text-[10px] text-foreground">{folder.modifiedLabel}</span>
      </Link>
    </div>
  );
};

export type { FolderItem };

