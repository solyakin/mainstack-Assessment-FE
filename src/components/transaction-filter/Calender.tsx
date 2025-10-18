"use client"

import * as React from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { Calendar } from "../ui/calendar"

export function CalendarDropdown() {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        id="date"
                        className={"w-48 flex items-center p-2 justify-between font-normal bg-grayOff rounded-0 border-1 text-sm rounded-lg focus:ring-2 focus:outline-2 "}
                    >
                        {(date ?? new Date()).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
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
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
