import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineWallet } from "react-icons/ai";
import FileList from '../components/FileList';
import { useMediaQuery } from 'react-responsive';
import TransactionChart from "@/components/TransactionChart";
import CashCard from "@/components/CashCard"; // Import the new CashCard component
import CashEntryDialog from "../components/CashEntryDialog";

export default function Dashboard() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const handleOpenDialog = (title, key) => {
        setDialogTitle(title);
        setSelectedCard(key);
        setDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    const [cashData, setCashData] = useState({
        cashIn: 50000,
        cashOut: 30000,
        balance: 20000
    });
    const handleSubmit = (value) => {
        console.log(`Submitted ${value} for ${dialogType}`);
        // Handle the amount submission logic here
    };
    return (
        <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Mobile Menu Button */}
            {isMobile && (
                <button
                    className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-lg"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FiMenu size={24} />
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:relative transition-transform duration-300 ease-in-out z-50`}
            >
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
                    Dashboard
                </h1>

                {/* Cash Summary Cards */}
                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-6`}>
                    <CashCard
                        title="Cash In"
                        amount={cashData.cashIn}
                        lastTransaction={5000}
                        bgColor="from-green-500 to-green-700"
                        icon={<AiOutlineArrowUp size={28} className="text-green-800" />}
                        onIconClick={() => handleOpenDialog("Cash In", "cashIn")}
                    />
                    <CashCard
                        title="Cash Out"
                        amount={cashData.cashOut}
                        lastTransaction={2000}
                        bgColor="from-red-500 to-red-700"
                        icon={<AiOutlineArrowDown size={28} className="text-red-800" />}
                        onIconClick={() => handleOpenDialog("Cash Out", "cashOut")}
                    />
                    <CashCard
                        title="Balance"
                        amount={cashData.balance}
                        lastTransaction={1000}
                        bgColor="from-blue-500 to-blue-700"
                        icon={<AiOutlineWallet size={28} className="text-blue-800" />}
                        onIconClick={() => handleOpenDialog("Balance", "balance")}
                    />
                    <CashEntryDialog
                        open={dialogOpen}
                        handleClose={handleCloseDialog}
                        title={dialogTitle}
                        onSubmit={handleSubmit}
                    />
                </div>

                {/* Transaction Chart Section */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow">
                    <TransactionChart />
                </div>

                {/* File List Section */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow">
                    <FileList />
                </div>
            </div>
        </div>
    );
}
