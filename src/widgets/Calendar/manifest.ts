import Calendar from "./Calendar";
import CalendarSettings from "./CalendarSettings";

const manifest = {
    id: "calendar",
    name: "Calendar",
    defaultWidth: 2,
    defaultHeight: 2,
    defaultTheme: "card",
    component: Calendar,
    settingsComponent: CalendarSettings,
};

export default manifest;