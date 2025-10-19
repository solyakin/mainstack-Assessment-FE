import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

export function MultiSelectPopover({ options, placeholder, selected, onSelectionChange }: MultiProps & {
    selected: string[]
    onSelectionChange: (selected: string[]) => void
}) {
    const [open, setOpen] = useState(false)

    function toggle(option: string) {
        const newSelected = selected.includes(option) 
            ? selected.filter((p) => p !== option) 
            : [...selected, option]
        onSelectionChange(newSelected)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="w-full p-3 rounded-lg text-left flex items-center justify-between border bg-grayOff focus:ring-2">
                    <span className="truncate text-sm">{selected.length ? selected.join(', ') : placeholder}</span>
                    {open ?
                        <MdKeyboardArrowUp className="ml-2" />
                        :
                        <MdKeyboardArrowDown className="ml-2" />
                    }
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4">
                <div className="space-y-2">
                    {options.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 p-2 rounded-md hover:bg-grayOff cursor-pointer">
                            <input type="checkbox" className='h-4 w-4 accent-black cursor-pointer focus:ring-black' checked={selected.includes(opt)} onChange={() => toggle(opt)} />
                            <span className="ml-1">{opt}</span>
                        </label>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}