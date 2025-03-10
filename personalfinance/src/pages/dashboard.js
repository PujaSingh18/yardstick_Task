import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineWallet } from "react-icons/ai";
import FileList from '../components/FileList';
import { useMediaQuery } from 'react-responsive';
import TransactionChart from "@/components/TransactionChart";
import CashCard from "@/components/CashCard";
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
        console.log(`Submitted ${value} for ${dialogTitle}`);
    };

    return (
        <div className="flex min-h-screen transition-colors duration-300">
            {/* Sidebar (Fixed) */}
            <div className={`fixed top-0 left-0 h-full bg-white-800 w-10 md:w-10 transition-all duration-300
                ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"} z-50 shadow-lg`}>
                <Sidebar />
            </div>

            {/* Hamburger Button (Only in Mobile View) */}
            {isMobile && (
                <button
                    className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-lg z-50"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FiMenu size={24} />
                </button>
            )}

            {/* Main Content (Allows Scrolling) */}
            <div className="flex-1 ml-60 md:ml-64 p-6 md:p-8 bg-gray-100 dark:bg-gray-900 overflow-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
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
                    />
                </div>

                {/* Cash Entry Dialog */}
                <CashEntryDialog
                    open={dialogOpen}
                    handleClose={handleCloseDialog}
                    title={dialogTitle}
                    onSubmit={handleSubmit}
                />

                {/* Transaction Chart Section */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <TransactionChart />
                </div>

                {/* File List Section */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <FileList />
                </div>
            </div>
        </div>
    );
}
