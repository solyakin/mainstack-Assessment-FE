import Navbar from "../components/Navbar"
import Transaction from "../components/Transaction"
import SideIcons from "../components/SideIcons"
import Overview from "../components/Overview/Overview"
import { useEffect, useState } from "react"
import type { TransactionType, WalletDataType } from "../constant/global"
import requestClient from "../lib/httpRequest"

const Dashboard = () => {

    const [walletData, setWalletData] = useState<WalletDataType | null>(null);
    const [transactions, setTransactions] = useState<TransactionType[]>([]);

    const fetchingWalletData = async () => {
        try {
            const response = await requestClient().get('/wallet');
            setWalletData(response.data);
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
    };

    const fetchingTransactions = async () => {
        try {
            const response = await requestClient().get('/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }

    useEffect(() => {
        fetchingWalletData();
        fetchingTransactions();
    }, []);
    
    return (
        <div className="p-6">
            <Navbar />
            <Overview walletData={walletData} transactions={transactions} />
            <Transaction transactions={transactions} />
            <SideIcons />
        </div>
    )
}

export default Dashboard;