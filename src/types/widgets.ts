export type WidgetProps = {
    widgetId: string;
    title: string;
    theme: string;
    editMode: boolean;
    settingsOpen: boolean;
    updateTitle: (title: string) => void;
};


export type WidgetManifest = {
    id: string;
    name: string;
    defaultWidth: number;
    defaultHeight: number;
    defaultTheme: string;
    component: React.ComponentType<any>;
    settingsComponent: React.ComponentType<any> | null;
}

export type ActiveWidget = {
    id: string;
    type: string;
    theme: string;
    title: string;
};