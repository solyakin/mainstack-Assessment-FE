import React, { useState } from 'react'
import { LuX } from 'react-icons/lu'
import { CalendarDropdown } from './Calender'
import { MultiSelectPopover } from '../MultiSelectPopover'
import { dateRangeOptions, TX_STATUS, TX_TYPES, type DateRange } from '../../constant/data'
export interface FilterState {
    dateRange: DateRange
    startDate?: Date
    endDate?: Date
    transactionTypes: string[]
    transactionStatus: string[]
}
interface FilterProps {
    open: boolean
    onClose: () => void
    onApplyFilter: (filters: FilterState) => void
    currentFilters: FilterState
}

const Filter: React.FC<FilterProps> = ({ open, onClose, onApplyFilter, currentFilters }) => {

    const [filters, setFilters] = useState<FilterState>(currentFilters)

    const handleDateRangeSelect = (range: DateRange) => {
        setFilters(prev => ({ ...prev, dateRange: range }))
    }

    const handleTypeSelection = (types: string[]) => {
        setFilters(prev => ({ ...prev, transactionTypes: types }))
    }

    const handleStatusSelection = (status: string[]) => {
        setFilters(prev => ({ ...prev, transactionStatus: status }))
    }

    const handleClear = () => {
        const clearedFilters: FilterState = {
            dateRange: 'allTime',
            transactionTypes: [],
            transactionStatus: []
        }
        setFilters(clearedFilters)
    }

    const handleApply = () => {
        onApplyFilter(filters)
        onClose()
    }

    const hasFilters = filters.transactionTypes.length > 0 || filters.transactionStatus.length > 0 || filters.dateRange !== 'allTime'
    console.log('Current Filters in Filter Component:', filters);
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
                    {dateRangeOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleDateRangeSelect(option.value)}
                            className={`px-3 py-1 flex-shrink-0 rounded-full text-sm !leading-[160%] tracking-[-0.4px] font-[DegularMedium] transition-colors ${
                                filters.dateRange === option.value
                                    ? 'bg-black text-white'
                                    : 'border border-grayOff text-dark hover:bg-grayOff'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
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
                        <MultiSelectPopover 
                            options={TX_TYPES} 
                            placeholder="Select types"
                            selected={filters.transactionTypes}
                            onSelectionChange={handleTypeSelection}
                        />
                    </div>

                    <div>
                        <div className="!leading-[160%] tracking-[-0.4px] text-dark font-semibold mb-2">Transaction Status</div>
                        <MultiSelectPopover 
                            options={TX_STATUS} 
                            placeholder="Select status"
                            selected={filters.transactionStatus}
                            onSelectionChange={handleStatusSelection}
                        />
                    </div>
                </div>

                <div className="absolute left-0 right-0 bottom-6 px-6">
                    <div className="flex items-center justify-between gap-4">
                        <button 
                            onClick={handleClear}
                            className="flex-1 py-3 rounded-full border border-border hover:bg-grayOff transition-colors"
                        >
                            Clear
                        </button>
                        <button 
                            onClick={handleApply}
                            className={`flex-1 py-3 rounded-full transition-colors ${
                                hasFilters 
                                    ? 'bg-black text-white hover:bg-gray-800' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!hasFilters}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Filter