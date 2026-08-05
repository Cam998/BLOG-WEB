import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./chargeScreen.css";

export default function ChargeScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="charge-container">
            <img src="/assets/Images/espiral.png" alt="espiral" />
        </div>
    );
}