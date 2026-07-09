import { useState } from "react";
import "./EditBar.css";

type EditBarProps = {
    widgets: {
        key: string;
        name: string;
    }[];

    onAddWidget: (widgetType: string) => void;

    onThemeChange: (theme: string) => void;

    onClose: () => void;
};

export default function EditBar({
    widgets,
    onAddWidget,
    onThemeChange,
    onClose,
}: EditBarProps) {
    const [widgetsOpen, setWidgetsOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);

    return (
        <header className="edit-bar">
            <div className="edit-bar-group">
                <button
                    className="edit-bar-button"
                    onClick={() => setWidgetsOpen((prev) => !prev)}>
                    Widgets ▼
                </button>

                {widgetsOpen && (<div className="edit-dropdown">
                    {widgets.map((widget) => (
                        <button
                            key={widget.key}
                            onClick={() => onAddWidget(widget.key)}
                        >
                            {widget.name}
                        </button>
                    )
                    )}
                </div>
                )}
            </div>

            <div className="edit-bar-group">
                <button
                    className="edit-bar-button"
                    onClick={() => setThemeOpen((prev) => !prev)}
                >
                    Theme ▼
                </button>

                {themeOpen && (
                    <div className="edit-dropdown">
                        <button onClick={() => onThemeChange("theme-dark")}>
                            Dark
                        </button>

                        <button onClick={() => onThemeChange("theme-light")}>
                            Light
                        </button>

                        <button onClick={() => onThemeChange("theme-glass")}>
                            Glass
                        </button>
                    </div>
                )}
            </div>

            <button className="edit-bar-button" onClick={onClose}>
                Done
            </button>
        </header>
    );
}