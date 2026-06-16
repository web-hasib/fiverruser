import React from "react";
import { Star, BarChart3, Users } from "lucide-react";

interface StatsProps {
  totalAssistants: number;
  usesThisMonth: number;
  communityShared: number;
  favourited: number;
}

export const Stats = ({
  totalAssistants,
  usesThisMonth,
  communityShared,
  favourited,
}: StatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* Total Assistants */}
      <div className="flex justify-between items-center bg-card rounded-xl p-5 border-l-[3px] border-l-blue-600 border border-border/50">
        <div>
          <h3 className="text-muted-foreground text-sm font-medium mb-1">
            Total Assistants
          </h3>
          <p className="text-3xl font-bold text-foreground">
            {totalAssistants}
          </p>
        </div>
        <div className="bg-accent/50 p-2.5 rounded-lg border border-border/50">
          <Star className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Uses This Month */}
      <div className="flex justify-between items-center bg-card rounded-xl p-5 border-l-[3px] border-l-red-500 border border-border/50">
        <div>
          <h3 className="text-muted-foreground text-sm font-medium mb-1">
            Uses This Month
          </h3>
          <p className="text-3xl font-bold text-foreground">
            {usesThisMonth}
          </p>
        </div>
        <div className="bg-accent/50 p-2.5 rounded-lg border border-border/50">
          <BarChart3 className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Community Shared */}
      <div className="flex justify-between items-center bg-card rounded-xl p-5 border-l-[3px] border-l-blue-500 border border-border/50">
        <div>
          <h3 className="text-muted-foreground text-sm font-medium mb-1">
            Community Shared
          </h3>
          <p className="text-3xl font-bold text-foreground">
            {communityShared}
          </p>
        </div>
        <div className="bg-accent/50 p-2.5 rounded-lg border border-border/50">
          <Users className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Favourited */}
      <div className="flex justify-between items-center bg-card rounded-xl p-5 border-l-[3px] border-l-amber-500 border border-border/50">
        <div>
          <h3 className="text-muted-foreground text-sm font-medium mb-1">
            Favourited
          </h3>
          <p className="text-3xl font-bold text-foreground">
            {favourited}
          </p>
        </div>
        <div className="bg-accent/50 p-2.5 rounded-lg border border-border/50">
          <Star className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};
