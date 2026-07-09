import { useState } from "react";

type TodoSettingsProps = {
    title: string;
    updateTitle: (title: string) => void;
};

export default function TodoSettings({
    title,
    updateTitle,
}: TodoSettingsProps) {
    const [newTitle, setNewTitle] = useState(title);

    return (
        <>
            <h3>Widget Name</h3>

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
                Save Name
            </button>
        </>
    );
}