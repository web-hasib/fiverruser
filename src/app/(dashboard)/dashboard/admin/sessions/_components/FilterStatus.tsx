"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { cn } from "@/src/lib/utils"

export function FilterStatus() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const statuses = [
    "Completed",
    "In Progress"
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="relative whitespace-nowrap w-full flex items-center justify-between bg-card border border-border text-foreground text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        >
          {value ? value : "All Status"}
          <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-2 bg-card border-border rounded-xl shadow-lg" align="start">
        <div className="flex flex-col gap-1">
          {statuses.map((status) => (
            <div
              key={status}
              onClick={() => {
                setValue(status === value ? "" : status)
                setOpen(false)
              }}
              className={cn(
                "px-3 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-colors hover:bg-muted text-foreground"
              )}
            >
              {status}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
