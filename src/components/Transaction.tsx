import { PiDownloadSimple } from "react-icons/pi";
import { LuChevronDown } from "react-icons/lu";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import Filter from './transaction-filter/Filter'
import { useEffect, useState } from 'react'
import { RiFileList3Fill } from "react-icons/ri";
import requestClient from "../lib/httpRequest";
import type { TransactionType } from "../constant/global";
import { formatDate } from "../lib/utils";

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

    const fetchingTransactions = async () => {
        try {
            const response = await requestClient().get('/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }

    useEffect(() => {
        fetchingTransactions();
    }, []);

    const TxDescription = (transaction: TransactionType) => {
        switch (transaction.type) {
            case 'deposit':
                return (
                <div>
                    <p className="font-medium !leading-[24px] tracking-[-0.2px] text-dark">
                        {transaction?.metadata?.product_name || "Product Name"}
                    </p>
                    <p className="mt-2 font-medium !leading-[16px] tracking-[-0.2px] text-gray text-sm">
                        {transaction?.metadata?.name}
                    </p>
                </div> 
                );
            case 'withdrawal':
                return (
                <div>
                    <p className="font-medium !leading-[24px] tracking-[-0.2px] text-dark">
                        Cash Withdrawal
                    </p>
                    {transaction.status && (
                        <div className={`font-medium !leading-[16px] tracking-[-0.2px] text-sm mt-2 ${transaction.status === 'successful' ? 'text-[#0EA163]' : 'text-[#A77A07]'}`}>
                            {transaction.status === 'successful' ? 'Successful' : 'Pending'}
                        </div>
                    )}
                </div>
                );
            default:
                return 'Unknown';
        }
    };

    console.log('Transactions:', transactions);

    return (
        <div className="mx-auto max-w-6xl mt-16 p-6 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold !leading-[32px] tracking-[-0.6px]">24 Transactions</h3>
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
            <Filter open={open} onClose={() => setOpen(false)} />


            <div className="border-t border-border" />

            <ul className="mt-6 space-y-5">
                {transactions.length > 0 ?
                    transactions?.map((tx, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <IconCircle type={tx.type} />
                            <TxDescription {...tx} />
                        </div>

                        <div className="text-right">
                            <div className="font-[DegularBold] !leading-[150%] tracking-[-0.4px] text-dark">USD {tx.amount}</div>
                            <div className="font-medium !leading-[16px] tracking-[-0.2px] text-gray text-sm">{formatDate(tx.date)}</div>
                        </div>
                    </li>
                )):
                    <div className="flex items-center justify-center my-16">
                        <div className="max-w-md">
                            <div className="h-12 w-12 bg-grayOff rounded-xl flex items-center justify-center"><RiFileList3Fill className="w-7 h-7" /></div>
                            <h1 className="font-bold text-[28px] !leading-[40px] tracking-[-0.6px] mt-6 text-dark">No matching transaction found for the selected filter</h1>
                            <p className="text-gray leading-[24px] tracking-[-0.2px] font-medium my-4">Change your filters to see more results, or add a new product.</p>
                            <button onClick={() => setOpen(true)} className="px-8 py-2 font-medium rounded-full bg-grayOff leading-[24px] tracking-[-0.4px] text-dark">
                            Clear Filter
                        </button>
                        </div>
                    </div>
                }
            </ul>
        </div>
    )
}

export default Transaction