import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const CashCard = ({ title, amount, lastTransaction, bgColor, icon, onIconClick }) => {
    const [displayAmount, setDisplayAmount] = useState(0);
    const isMobile = useMediaQuery({ maxWidth: 567 });

    useEffect(() => {
        let start = 0;
        const end = amount;
        if (start === end) return;
        let totalDuration = 1000;
        let incrementTime = totalDuration / end;
        let timer = setInterval(() => {
            start += Math.ceil(end / 100);
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setDisplayAmount(start);
        }, incrementTime);
        return () => clearInterval(timer);
    }, [amount]);

    return (
        <div
            className={`relative w-full p-6 md:p-8 rounded-2xl bg-gradient-to-r ${bgColor} text-white shadow-xl transition-all duration-300 transform ${isMobile ? "hover:scale-100" : "hover:scale-105 hover:shadow-2xl"
                } border-2 border-transparent hover:border-opacity-50 hover:border-white dark:border-gray-700 dark:hover:border-gray-500`}
        >
            {/* Clickable Icon Section */}
            <div
                className="absolute top-4 right-4 w-14 h-14 flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-lg rounded-full shadow-md transition-all duration-300 hover:scale-110 cursor-pointer"
                onClick={onIconClick} // Trigger function when clicked
            >
                {icon}
            </div>

            <p className="mt-4 text-lg md:text-xl font-semibold">{title}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider">
                ₹{displayAmount.toLocaleString()}
            </h2>

            <div className="relative group">
                <p className="text-sm opacity-80 mt-2 cursor-pointer">
                    Last Transaction: <span className="font-bold">₹{lastTransaction.toLocaleString()}</span>
                </p>
            </div>
        </div>
    );
};

export default CashCard;
