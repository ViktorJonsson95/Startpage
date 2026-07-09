import { useState } from "react";
import Modal from "./Modal";
import "./WidgetDialog.css";

type WidgetDialogProps = {
    open: boolean;

    title: string;
    theme: string;

    updateTitle: (title: string) => void;
    updateTheme: (theme: string) => void;
    onClose: () => void;
    SettingsComponent: React.ComponentType<any> | null;
    widgetId: string;
    onWidgetChanged: () => void;
};

export default function WidgetDialog({
    open,
    title,
    theme,
    updateTitle,
    updateTheme,
    onClose,
    SettingsComponent,
    widgetId,
    onWidgetChanged,
}: WidgetDialogProps) {
    const [newTitle, setNewTitle] = useState(title);
    console.log("WidgetDialog", open);
    return (
        <Modal
            open={open}
            title={`${title} Settings`}
            onClose={onClose}
        >
            <h3>Appearance</h3>

            <label>Title</label>

            <input
                value={newTitle}
                onChange={(e) =>
                    setNewTitle(e.target.value)
                }
            />

            <button
                onClick={() =>
                    updateTitle(newTitle)
                }
            >
                Save Title
            </button>

            <label>Theme</label>

            <select
                value={theme}
                onChange={(e) =>
                    updateTheme(e.target.value)
                }
            >
                <option value="card">Card</option>
                <option value="glass">Glass</option>
                <option value="minimal">Minimal</option>
                <option value="circle">Circle</option>
            </select>

            <hr />

            {SettingsComponent && (
                <>
                    <h3>Widget Settings</h3>
                    <SettingsComponent
                        widgetId={widgetId}
                        onSaved={onWidgetChanged}
                    />
                </>
            )}
        </Modal>
    );
}