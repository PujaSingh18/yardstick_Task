'use client';

import { useState, useEffect } from 'react';
import { PolarArea, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const TransactionChart = () => {
    const [polarTimeframe, setPolarTimeframe] = useState('today');
    const [pieTimeframe, setPieTimeframe] = useState('today');
    const [transactionData, setTransactionData] = useState([]);
    const [addedMoneyData, setAddedMoneyData] = useState(0);
    const [withdrawalData, setWithdrawalData] = useState(0);

    useEffect(() => {
        const fetchPolarData = async () => {
            const data = {
                today: [20, 15, 10, 5],
                week: [100, 90, 80, 50],
                month: [400, 350, 300, 250],
            };
            setTransactionData(data[polarTimeframe]);
        };

        const fetchPieData = async () => {
            const data = {
                today: { addedMoney: 3000, withdrawals: 1500 },
                week: { addedMoney: 12000, withdrawals: 8000 },
                month: { addedMoney: 50000, withdrawals: 30000 },
            };
            setAddedMoneyData(data[pieTimeframe].addedMoney);
            setWithdrawalData(data[pieTimeframe].withdrawals);
        };

        fetchPolarData();
        fetchPieData();
    }, [polarTimeframe, pieTimeframe]);

    const polarData = {
        labels: ['Payments', 'Payouts', 'Transfers', 'Other'],
        datasets: [{
            data: transactionData,
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
        }],
    };

    const pieData = {
        labels: ['Added Money', 'Withdrawals'],
        datasets: [{
            data: [addedMoneyData, withdrawalData],
            backgroundColor: ['#4CAF50', '#FF5722'],
        }],
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8 w-full">
            {/* Polar Area Chart Section */}
            <div className="w-[48%] min-w-[400px] h-[500px] bg-white shadow-xl rounded-xl p-6">
                <div className="flex justify-between items-center w-full mb-4">
                    <h3 className="text-xl font-semibold">Transaction Breakdown</h3>
                    <FormControl variant="outlined" className="w-32">
                        <InputLabel>Timeframe</InputLabel>
                        <Select value={polarTimeframe} onChange={(e) => setPolarTimeframe(e.target.value)} label="Timeframe">
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="week">Last Week</MenuItem>
                            <MenuItem value="month">Last Month</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="w-[90%] h-[380px] mx-auto">
                    <PolarArea data={polarData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />
                </div>
            </div>

            {/* Pie Chart Section */}
            <div className="w-[48%] min-w-[400px] h-[500px] bg-white shadow-xl rounded-xl p-6">
                <div className="flex justify-between items-center w-full mb-4">
                    <h3 className="text-xl font-semibold">Added Money vs Withdrawals</h3>
                    <FormControl variant="outlined" className="w-32">
                        <InputLabel>Timeframe</InputLabel>
                        <Select value={pieTimeframe} onChange={(e) => setPieTimeframe(e.target.value)} label="Timeframe">
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="week">Last Week</MenuItem>
                            <MenuItem value="month">Last Month</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="w-[90%] h-[380px] mx-auto">
                    <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />
                </div>
            </div>
        </div>
    );

};

export default TransactionChart;
