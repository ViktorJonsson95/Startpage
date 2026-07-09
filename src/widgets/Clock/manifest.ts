import Clock from "./Clock";
import ClockSettings from "./ClockSettings";

const manifest = {
    id: "clock",

    name: "Clock",

    defaultWidth: 2,

    defaultHeight: 2,

    defaultTheme: "card",

    component: Clock,
    settingsComponent: ClockSettings,
};

export default manifest;