"use client"

import * as React from "react"
import { CalendarDays } from "lucide-react"
import { format } from "date-fns"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { Calendar } from "@/src/components/ui/calendar"

export function FilterDateRangePicker() {
  const [fromDate, setFromDate] = React.useState<Date>()
  const [toDate, setToDate] = React.useState<Date>()

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-2.5 min-w-[140px] cursor-pointer hover:bg-muted transition-colors">
            <span className="text-sm text-foreground">
              {fromDate ? format(fromDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
            </span>
            <CalendarDays className="h-4 w-4 text-muted-foreground ml-2" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-border bg-card shadow-lg rounded-xl" align="start">
          <Calendar
            mode="single"
            selected={fromDate}
            onSelect={setFromDate}
            initialFocus
            className="p-3 bg-card rounded-xl text-foreground"
          />
        </PopoverContent>
      </Popover>

      <span className="text-muted-foreground">—</span>

      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-2.5 min-w-[140px] cursor-pointer hover:bg-muted transition-colors">
            <span className="text-sm text-foreground">
              {toDate ? format(toDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
            </span>
            <CalendarDays className="h-4 w-4 text-muted-foreground ml-2" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-border bg-card shadow-lg rounded-xl" align="start">
          <Calendar
            mode="single"
            selected={toDate}
            onSelect={setToDate}
            initialFocus
            className="p-3 bg-card rounded-xl text-foreground"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
