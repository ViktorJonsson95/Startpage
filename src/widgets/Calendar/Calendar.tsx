import { useMemo, useState } from "react";
import "./Calendar.css";

type CalendarProps = {
    widgetId: string;
    theme: string;
    title: string;
};

export default function Calendar({
    widgetId,
    theme,
    title,
}: CalendarProps) {
    const today = new Date();

    const [currentDate, setCurrentDate] =
        useState(today);


    const weekdays = [
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
        "Su",
    ];

    const monthName =
        currentDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric",
            }
        );

    const days = useMemo(() => {
        const year =
            currentDate.getFullYear();

        const month =
            currentDate.getMonth();

        const firstDay =
            new Date(year, month, 1);

        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();

        let start =
            firstDay.getDay() - 1;

        if (start < 0) {
            start = 6;
        }

        const cells: (
            number | null
        )[] = [];

        for (
            let i = 0;
            i < start;
            i++
        ) {
            cells.push(null);
        }

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {
            cells.push(day);
        }

        while (
            cells.length % 7 !== 0
        ) {
            cells.push(null);
        }

        return cells;
    }, [currentDate]);

    function previousMonth() {
        setCurrentDate(
            (previous) =>
                new Date(
                    previous.getFullYear(),
                    previous.getMonth() - 1,
                    1
                )
        );
    }

    function nextMonth() {
        setCurrentDate(
            (previous) =>
                new Date(
                    previous.getFullYear(),
                    previous.getMonth() + 1,
                    1
                )
        );
    }

    return (
        <div
            className={`widget calendar ${theme}`}
        >
            <div className="calendar-header">
                <button
                    onClick={
                        previousMonth
                    }
                >
                    ◀
                </button>

                <h3>{monthName}</h3>

                <button
                    onClick={nextMonth}
                >
                    ▶
                </button>
            </div>

            <div className="calendar-grid">
                {weekdays.map(
                    (day) => (
                        <strong
                            key={day}
                        >
                            {day}
                        </strong>
                    )
                )}

                {days.map(
                    (day, index) => {
                        const isToday =
                            day ===
                            today.getDate() &&
                            currentDate.getMonth() ===
                            today.getMonth() &&
                            currentDate.getFullYear() ===
                            today.getFullYear();

                        return (
                            <div
                                key={
                                    index
                                }
                                className={
                                    isToday
                                        ? "calendar-day today"
                                        : "calendar-day"
                                }
                            >
                                {day}
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}