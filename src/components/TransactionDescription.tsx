
import type { TransactionType } from '../constant/global';

export const TxDescription = (transaction: TransactionType) => {
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