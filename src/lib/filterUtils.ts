import type { TransactionType } from "../constant/global";
import type { FilterState } from "../components/transaction-filter/Filter";
import type { DateRange } from "../constant/data";

// Map transaction types from API to filter types
const mapTransactionType = (transaction: TransactionType): string => {
    switch (transaction.type) {
        case 'deposit':
            // Check metadata to determine specific type
            if (transaction.metadata?.type === 'store') return 'Store Transactions';
            if (transaction.metadata?.type === 'tip') return 'Get Tipped';
            return 'Store Transactions'; // Default for deposits
        case 'withdrawal':
            return 'Withdrawals';
        default:
            return 'Other';
    }
};

// Map transaction status from API to filter status
const mapTransactionStatus = (transaction: TransactionType): string => {
    if (!transaction.status) return '';
    return transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1);
};

// Get date range boundaries
const getDateRange = (range: string): { start: Date; end: Date } => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (range) {
        case 'today':
            return {
                start: today,
                end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
            };
        case 'last7days':
            return {
                start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
                end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
            };
        case 'thisMonth':
            return {
                start: new Date(now.getFullYear(), now.getMonth(), 1),
                end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
            };
        case 'last3months':
            return {
                start: new Date(now.getFullYear(), now.getMonth() - 3, 1),
                end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
            };
        case 'thisYear':
            return {
                start: new Date(now.getFullYear(), 0, 1),
                end: new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
            };
        case 'lastYear':
            return {
                start: new Date(now.getFullYear() - 1, 0, 1),
                end: new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999)
            };
        case 'allTime':
        default:
            return {
                start: new Date(0),
                end: new Date(8640000000000000) // Max safe date
            };
    }
};

 // Function to calculate date range based on selection
    export const calculateDateRange = (range: DateRange): { start?: Date; end?: Date } => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        switch (range) {
            case 'today':
                return {
                    start: today,
                    end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
                };
            case 'last7days':
                return {
                    start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
                    end: today
                };
            case 'thisMonth':
                return {
                    start: new Date(now.getFullYear(), now.getMonth(), 1),
                    end: new Date(now.getFullYear(), now.getMonth() + 1, 0)
                };
            case 'last3months':
                return {
                    start: new Date(now.getFullYear(), now.getMonth() - 3, 1),
                    end: today
                };
            case 'thisYear':
                return {
                    start: new Date(now.getFullYear(), 0, 1),
                    end: new Date(now.getFullYear(), 11, 31)
                };
            case 'lastYear':
                return {
                    start: new Date(now.getFullYear() - 1, 0, 1),
                    end: new Date(now.getFullYear() - 1, 11, 31)
                };
            case 'allTime':
            default:
                return { start: undefined, end: undefined };
        }
    };

export const filterTransactions = (transactions: TransactionType[], filters: FilterState): TransactionType[] => {
    return transactions.filter(transaction => {
        // Date range filter
        const transactionDate = new Date(transaction.date);
        const { start, end } = getDateRange(filters.dateRange);
        
        if (filters.dateRange !== 'allTime') {
            if (transactionDate < start || transactionDate > end) {
                return false;
            }
        }

        // Custom date range filter (if implemented)
        if (filters.startDate && filters.endDate) {
            const startDate = new Date(filters.startDate);
            const endDate = new Date(filters.endDate);
            if (transactionDate < startDate || transactionDate > endDate) {
                return false;
            }
        }

        // Transaction type filter
        if (filters.transactionTypes.length > 0) {
            const transactionType = mapTransactionType(transaction);
            if (!filters.transactionTypes.includes(transactionType)) {
                return false;
            }
        }

        // Transaction status filter
        if (filters.transactionStatus.length > 0) {
            const transactionStatus = mapTransactionStatus(transaction);
            if (!filters.transactionStatus.includes(transactionStatus)) {
                return false;
            }
        }

        return true;
    });
};

export const getFilteredTransactionCount = (transactions: TransactionType[], filters: FilterState): number => {
    return filterTransactions(transactions, filters).length;
};
