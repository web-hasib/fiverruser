"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { cn } from "@/src/lib/utils"

export function FilterTeam() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const teams = [
    "St. Mary's Hospital",
    "City Medical Center",
    "Green Valley Clinic",
    "Berlin Medical"
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="relative  whitespace-nowrap w-full flex items-center justify-between bg-card border border-border text-foreground text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        >
         {value ? value : "All Teams"}
          <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-2 bg-card border-border rounded-xl shadow-lg" align="start">
        <div className="flex flex-col gap-1">
          {teams.map((team) => (
            <div
              key={team}
              onClick={() => {
                setValue(team === value ? "" : team)
                setOpen(false)
              }}
              className={cn(
                "px-3 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-colors hover:bg-muted text-foreground"
              )}
            >
              {team}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
