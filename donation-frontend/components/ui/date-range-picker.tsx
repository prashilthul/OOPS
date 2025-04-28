import { useState } from "react"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface DateRangePickerProps {
  startDate: Date | null
  endDate: Date | null
  onDateChange: (start: Date | null, end: Date | null) => void
}

export function DateRangePicker({ startDate, endDate, onDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate)) {
      onDateChange(date || null, null)
    } else if (!endDate && date && date > startDate) {
      onDateChange(startDate, date)
      setIsOpen(false)
    } else {
      onDateChange(date || null, null)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? (
            endDate ? (
              <>
                {format(startDate, "PPP")} - {format(endDate, "PPP")}
              </>
            ) : (
              format(startDate, "PPP")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: startDate || undefined, to: endDate || undefined }}
          onSelect={(range) => handleSelect(range?.from)}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}