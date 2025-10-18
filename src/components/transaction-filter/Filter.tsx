import { LuX } from 'react-icons/lu'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import React from 'react'
import { CalendarDropdown } from './Calender'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'

const TX_TYPES = [
    'Store Transactions',
    'Get Tipped',
    'Withdrawals',
    'Chargebacks',
    'Cashbacks',
    'Refer & Earn',
]

const TX_STATUS = ['Successful', 'Pending', 'Failed']

function MultiSelectPopover({ options, placeholder }: MultiProps) {
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<string[]>(options.slice(0, 3))

    function toggle(option: string) {
        setSelected((prev) => (prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]))
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

const Filter: React.FC<Props> = ({ open, onClose }) => {
    return (
        <div aria-hidden={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
            />
            <aside
                className={`fixed top-0 right-0 h-full w-[450px] bg-white  mt-4 rounded-3xl dark:bg-[#0f1724] shadow-2xl p-6 transition-transform duration-300 transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-[DegularBold] !leading-[120%] tracking-[0px] text-dark">Filter</h3>
                    <button onClick={onClose} aria-label="Close filter" className="p-2 rounded-full hover:bg-grayOff">
                        <LuX className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex gap-2 w-full overflow-x-scroll scrollbar-hide mb-10">
                    <button className="px-3 py-1 flex-shrink-0 rounded-full bg-black border border-grayOff text-sm !leading-[160%] tracking-[-0.4px] font-[DegularMedium] text-white hover:bg-gray-300">Today</button>
                    <button className="px-3 py-1 flex-shrink-0 rounded-full border border-grayOff text-sm !leading-[160%] tracking-[-0.4px] font-[DegularMedium] text-dark hover:bg-gray-300">Last 7 days</button>
                    <button className="px-3 py-1 flex-shrink-0 rounded-full border border-grayOff text-sm !leading-[160%] tracking-[-0.4px] font-[DegularMedium] text-dark hover:bg-gray-300">This month</button>
                    <button className="px-3 py-1 flex-shrink-0 rounded-full border border-grayOff text-sm !leading-[160%] tracking-[-0.4px] font-[DegularMedium] text-dark hover:bg-gray-300">Last 3 months</button>
                    <button className="px-3 py-1 flex-shrink-0 rounded-full border border-grayOff text-sm !leading-[160%] tracking-[-0.4px] font-[DegularMedium] text-dark hover:bg-gray-300">This Year</button>
                    <button className="px-3 py-1 flex-shrink-0 rounded-full border border-grayOff text-sm !leading-[160%] tracking-[-0.4px] font-[DegularMedium] text-dark hover:bg-gray-300">Last Year</button>
                    <button className="px-3 py-1 flex-shrink-0 rounded-full border border-grayOff text-sm !leading-[160%] tracking-[-0.4px] font-[DegularMedium] text-dark hover:bg-gray-300">All time</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="!leading-[160%] tracking-[-0.4px] font-semibold text-dark mb-4">Date Range</div>
                        <div className="flex gap-3">
                            <CalendarDropdown />
                            <CalendarDropdown />
                        </div>
                    </div>

                    <div>
                        <div className="!leading-[160%] tracking-[-0.4px] text-dark font-semibold mb-2">Transaction Type</div>
                        <MultiSelectPopover options={TX_TYPES} placeholder="Select types" />
                    </div>

                    <div>
                        <div className="!leading-[160%] tracking-[-0.4px] text-dark font-semibold mb-2">Transaction Status</div>
                        <MultiSelectPopover options={TX_STATUS} placeholder="Select status" />
                    </div>
                </div>

                <div className="absolute left-0 right-0 bottom-6 px-6">
                    <div className="flex items-center justify-between gap-4">
                        <button className="flex-1 py-3 rounded-full border border-border">Clear</button>
                        <button className="flex-1 py-3 rounded-full bg-black text-white disabled:opacity-50" disabled>
                            Apply
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Filter