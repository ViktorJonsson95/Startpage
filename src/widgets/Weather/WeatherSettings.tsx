import { useEffect, useState } from "react";

type SavedWeather = {
    city: string;
    latitude: number;
    longitude: number;
};

type WeatherSettingsProps = {
    widgetId: string;
    onSaved: () => void;
};

export default function WeatherSettings({
    widgetId,
    onSaved,
}: WeatherSettingsProps) {
    const [newCity, setNewCity] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem(`weather-${widgetId}`);

        if (!saved) {
            return;
        }

        const weather: SavedWeather = JSON.parse(saved);

        setNewCity(weather.city);
    }, [widgetId]);

    async function saveCity() {
        if (!newCity.trim()) {
            return;
        }

        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                newCity
            )}&count=1`
        );

        const data = await response.json();

        if (!data.results?.length) {
            alert("City not found");
            return;
        }

        const result = data.results[0];

        const saved: SavedWeather = {
            city: result.name,
            latitude: result.latitude,
            longitude: result.longitude,
        };

        localStorage.setItem(
            `weather-${widgetId}`,
            JSON.stringify(saved)
        );

        onSaved();
    }

    return (
        <>
            <h3>City</h3>

            <input
                value={newCity}
                onChange={(e) =>
                    setNewCity(e.target.value)
                }
            />

            <button onClick={saveCity}>
                Save City
            </button>
        </>
    );
}