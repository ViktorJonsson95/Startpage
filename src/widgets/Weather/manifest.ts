import Weather from "./Weather";
import WeatherSettings from "./WeatherSettings";


const manifest = {
    id: "weather",
    name: "Weather",
    defaultWidth: 2,
    defaultHeight: 2,
    defaultTheme: "card",
    component: Weather,
    settingsComponent: WeatherSettings,
};

export default manifest;