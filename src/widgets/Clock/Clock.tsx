import "./Clock.css";
import { useState, useEffect } from "react";

type ClockProps = {
    theme: string;
};

export default function Clock({
    theme,
}: ClockProps) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className={`widget clock ${theme}`}>
            <div className="clock-time">
                {now.toLocaleTimeString()}
            </div>
        </div>
    );
}