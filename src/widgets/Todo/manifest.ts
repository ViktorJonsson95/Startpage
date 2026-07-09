import Todo from "./Todo";

const manifest = {
    id: "todo",
    name: "Todo",
    defaultWidth: 2,
    defaultHeight: 2,
    defaultTheme: "card",
    component: Todo,
    settingsComponent: null, //TodoSettings ska vara här men behövs inte just nu
};

export default manifest;