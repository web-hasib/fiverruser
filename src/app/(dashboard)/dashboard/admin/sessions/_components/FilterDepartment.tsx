"use client"

import * as React from "react"
import { ChevronDown, Search } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { cn } from "@/src/lib/utils"

export function FilterDepartment() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [search, setSearch] = React.useState("")

  const departments = [
    "General Medicine",
    "Neurology",
    "Dentistry",
    "Pharmacy / Medication",
    "Pulmonology (Lungs)"
  ]

  const filtered = departments.filter(d => d.toLowerCase().includes(search.toLowerCase()))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="relative whitespace-nowrap w-full flex items-center justify-between bg-card border border-border text-foreground text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        >
          {value ? value : "All Depts."}
          <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-2 bg-card border-border rounded-xl shadow-lg" align="start">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <input 
              placeholder="Search by name, patient id" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-background border border-border text-foreground px-3 py-2 pr-9 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-muted-foreground/50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {filtered.map((dept) => (
              <div
                key={dept}
                onClick={() => {
                  setValue(dept === value ? "" : dept)
                  setOpen(false)
                }}
                className={cn(
                  "px-3 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-colors hover:bg-muted text-foreground"
                )}
              >
                {dept}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
