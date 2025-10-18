interface WalletDataType {
    balance: number;
    ledger_balance: number;
    pending_payout: number;
    total_payout: number;
    total_revenue: number;
}

interface MetaDataType {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
}

interface TransactionType {
    amount: number;
    date: string;
    metadata: MetaDataType;
    status: 'successful' | 'pending';
    payment_reference: string;
    type: 'deposit' | 'withdrawal';
}

interface UserType {
    first_name: string;
    last_name: string;
    email: string;
}



export {
    WalletDataType,
    TransactionType,
    UserType
};