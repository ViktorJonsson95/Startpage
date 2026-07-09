import { useEffect, useState } from "react";
import "./Weather.css";
import WeatherSettings from "./WeatherSettings";



type WeatherProps = {
    widgetId: string;
    theme: string;
    title: string;
    updateTitle: (title: string) => void;
    refreshKey: number;
};

type CurrentWeather = {
    weathercode: number;
    temperature_2m: number;
};

type SavedWeather = {
    city: string;
    latitude: number;
    longitude: number;
};

const weatherText: Record<number, string> = {
    0: "Clear",

    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Rime fog",

    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",

    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",

    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",

    66: "Light freezing rain",
    67: "Heavy freezing rain",

    71: "Light snowfall",
    73: "Snowfall",
    75: "Heavy snowfall",

    77: "Snow grains",

    80: "Light rain showers",
    81: "Rain showers",
    82: "Heavy rain showers",

    85: "Light snow showers",
    86: "Heavy snow showers",

    95: "Thunderstorm",

    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail",
};

export default function Weather({
    widgetId,
    theme,
    title,
    refreshKey
}: WeatherProps) {
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [city, setCity] = useState("Malmö");


    async function fetchWeather(
        latitude: number,
        longitude: number
    ) {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`);

        const data = await response.json();

        setWeather(data.current);
    }


    useEffect(() => {
        const saved = localStorage.getItem(`weather-${widgetId}`);

        if (saved) {
            const weatherData: SavedWeather = JSON.parse(saved);

            setCity(weatherData.city);

            fetchWeather(weatherData.latitude, weatherData.longitude);

            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);

                const data = await response.json();

                const cityName =
                    data.address?.city ||
                    data.address?.town ||
                    data.address?.village ||
                    data.address?.municipality ||
                    "Malmö";

                const weatherData: SavedWeather = {
                    city: cityName,
                    latitude,
                    longitude,
                };

                localStorage.setItem(`weather-${widgetId}`, JSON.stringify(weatherData));

                setCity(cityName);
                fetchWeather(latitude, longitude);
            },
            () => {
                const weatherData: SavedWeather = {
                    city: "Malmö",
                    latitude: 55.605,
                    longitude: 13.0038,
                };

                localStorage.setItem(`weather-${widgetId}`, JSON.stringify(weatherData));

                fetchWeather(weatherData.latitude, weatherData.longitude);
            }
        );
    }, [widgetId, refreshKey]);

    return (
        <div className={`widget weather ${theme}`}>
            <h3>{title}</h3>

            {weather ? (
                <>
                    <p>{city}</p>

                    <h1>{weather.temperature_2m}°C</h1>

                    <p>{weatherText[weather.weathercode]}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}