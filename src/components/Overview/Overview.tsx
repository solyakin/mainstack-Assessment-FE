import { useEffect, useState } from 'react';
import { ChartLineDefault } from '../chart/LineChart'
import { ImInfo } from "react-icons/im";
import requestClient from '../../lib/httpRequest';
import type { WalletDataType } from '../../constant/global';

const Overview = () => {

    const [walletData, setWalletData] = useState<WalletDataType>();
    const fetchingWalletData = async () => {
        try {
            const response = await requestClient().get('/wallet');
            setWalletData(response.data);
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
    };
    useEffect(() => {
        fetchingWalletData();
    }, []);
    
    return (
        <div className="grid grid-cols-3 lg:grid-col-3 max-w-6xl m-auto mt-14">
            <div className="cols-span-3 lg:col-span-2 w-full">
                <ChartLineDefault balance={walletData?.balance} />
            </div>
            <div className="cols-span-3 lg:col-span-1 w-full">
                <div className="space-y-6 p-6 w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="w-full">
                            <div className="text-sm text-gray flex items-center justify-between">
                                <span className="text-sm font-[DegularMedium]">Ledger Balance</span>
                                <ImInfo className="w-4 h-4 text-gray" />
                            </div>
                            <div className="mt-2 text-[28px] !leading-[38px] trackling-[-0.6px] text-dark font-[DegularBold]">USD {walletData?.ledger_balance?.toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <div className="text-sm text-gray flex items-center justify-between">
                                <span className="text-sm font-[DegularMedium]">Total Payout</span>
                                <ImInfo className="w-4 h-4 text-gray" />
                            </div>
                            <div className="mt-2 text-[28px] !leading-[38px] trackling-[-0.6px] text-dark font-[DegularBold]">USD {walletData?.total_payout?.toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <div className="text-sm text-gray flex items-center justify-between">
                                <span className="text-sm font-[DegularMedium]">Total Revenue</span>
                                <ImInfo className="w-4 h-4 text-gray" />
                            </div>
                            <div className="mt-2 text-[28px] !leading-[38px] trackling-[-0.6px] text-dark font-[DegularBold]">USD {walletData?.total_revenue?.toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <div className="text-sm text-gray flex items-center justify-between">
                                <span className="text-sm font-[DegularMedium]">Pending Payout</span>
                                <ImInfo className="w-4 h-4 text-gray" />
                            </div>
                            <div className="mt-2 text-[28px] !leading-[38px] trackling-[-0.6px] text-dark font-[DegularBold]">USD {walletData?.pending_payout?.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview;