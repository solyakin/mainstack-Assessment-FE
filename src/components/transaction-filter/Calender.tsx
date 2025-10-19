
import { useEffect, useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { Calendar } from "../ui/calendar"

interface CalendarDropdownProps {
    placeholder?: string
    value?: Date
    onChange?: (date: Date | undefined) => void
}

export function CalendarDropdown({ placeholder = "Select date", value, onChange }: CalendarDropdownProps) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(value)

    useEffect(() => {
        setDate(value)
    }, [value])

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate)
        onChange?.(selectedDate)
        setOpen(false)
    }

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>                    
                    <button
                        id="date"
                        className={"w-48 flex items-center p-2 justify-between font-normal bg-grayOff rounded-0 border-1 text-sm rounded-lg focus:ring-2 focus:outline-2 "}
                    >
                        {date ? date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : placeholder}
                        {open ?
                            <MdKeyboardArrowUp className="ml-2" />
                            :
                            <MdKeyboardArrowDown className="ml-2" />
                        }
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={handleDateSelect}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
