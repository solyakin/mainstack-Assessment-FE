import { PiDownloadSimple } from "react-icons/pi";
import { LuChevronDown } from "react-icons/lu";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import Filter, { type FilterState } from './transaction-filter/Filter'
import { useEffect, useState } from 'react'
import { RiFileList3Fill } from "react-icons/ri";
import requestClient from "../lib/httpRequest";
import type { TransactionType } from "../constant/global";
import { formatDate } from "../lib/utils";
import { filterTransactions } from "../lib/filterUtils";
import { TxDescription } from "./TransactionDescription";

const IconCircle: React.FC<{ type: 'deposit' | 'withdrawal' }> = ({ type }) => {
    const depositBg = 'bg-[#E3FCF2] text-[#075132]'
    const withdrawalBg = 'bg-[#F9E3E0] text-[#961100]'
    return (
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${type === 'deposit' ? depositBg : withdrawalBg}`}>
            {type === 'deposit' ? <BsArrowDownLeft className="w-4 h-4" /> : <BsArrowUpRight className="w-4 h-4" />}
        </div>
    )
}

const Transaction: React.FC = () => {
    
    const [open, setOpen] = useState(false)
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<TransactionType[]>([]);
    const [currentFilters, setCurrentFilters] = useState<FilterState>({
        dateRange: 'allTime',
        transactionTypes: [],
        transactionStatus: []
    });

    const fetchingTransactions = async () => {
        try {
            const response = await requestClient().get('/transactions');
            setTransactions(response.data);
            setFilteredTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }

    const handleApplyFilter = (filters: FilterState) => {
        setCurrentFilters(filters);
        const filtered = filterTransactions(transactions, filters);
        setFilteredTransactions(filtered);
    }


    useEffect(() => {
        fetchingTransactions();
    }, []);

    useEffect(() => {
        // Apply current filters when transactions are updated
        if (transactions.length > 0) {
            const filtered = filterTransactions(transactions, currentFilters);
            setFilteredTransactions(filtered);
        }
    }, [transactions, currentFilters]);


    return (
        <div className="mx-auto max-w-6xl mt-16 p-6 bg-background rounded-lg">            
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold !leading-[32px] tracking-[-0.6px]">{filteredTransactions.length} Transactions</h3>
                    <p className="text-sm text-gray !leading-[16px] tracking-[-0.2px] font-medium">Your transactions for the last 7 days</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-full bg-grayOff text-dark flex items-center gap-2">
                        Filter <LuChevronDown className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 rounded-full bg-grayOff text-dark flex items-center gap-2">
                        Export list <PiDownloadSimple className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="border-t border-border" />            
            <ul className="mt-6 space-y-5">
                {filteredTransactions.length > 0 ?
                    filteredTransactions?.map((tx, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <IconCircle type={tx.type} />
                            <TxDescription {...tx} />
                        </div>

                        <div className="text-right">
                            <p className="font-[DegularBold] !leading-[150%] tracking-[-0.4px] text-dark">USD {tx.amount}</p>
                            <p className="font-medium !leading-[16px] tracking-[-0.2px] text-gray text-sm">{formatDate(tx.date)}</p>
                        </div>
                    </li>
                )):
                    <div className="flex items-center justify-center my-16">
                        <div className="max-w-md">
                            <div className="h-12 w-12 bg-grayOff rounded-xl flex items-center justify-center">
                                <RiFileList3Fill className="w-7 h-7" />
                            </div>
                            <h1 className="font-bold text-[28px] !leading-[40px] tracking-[-0.6px] mt-6 text-dark">No matching transaction found for the selected filter</h1>
                            <p className="text-gray leading-[24px] tracking-[-0.2px] font-medium my-4">Change your filters to see more results, or add a new product.</p>
                            <button 
                            onClick={() => setOpen(true)} 
                            className="px-8 py-2 font-medium rounded-full bg-grayOff leading-[24px] tracking-[-0.4px] text-dark">
                            Clear Filter
                            </button>
                        </div>
                    </div>
                }
            </ul>

            {/* ---- Filter Wrapper ---- */}
            <Filter 
                open={open} 
                onClose={() => setOpen(false)} 
                onApplyFilter={handleApplyFilter}
                currentFilters={currentFilters}
            />

        </div>
    )
}

export default Transaction