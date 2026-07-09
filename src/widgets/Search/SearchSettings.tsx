import { useEffect, useState } from "react";

type SearchSettingsData = {
    engine: string;
};

type SearchSettingsProps = {
    widgetId: string;
    onSaved: () => void;
};

const searchEngines = [
    {
        id: "google",
        name: "Google",
    },
    {
        id: "duckduckgo",
        name: "DuckDuckGo",
    },
    {
        id: "bing",
        name: "Bing",
    },
    {
        id: "brave",
        name: "Brave",
    },
    {
        id: "wikipedia",
        name: "Wikipedia",
    },
    {
        id: "youtube",
        name: "YouTube",
    },
    {
        id: "github",
        name: "GitHub",
    },
    {
        id: "stackoverflow",
        name: "Stack Overflow",
    },
];

export default function SearchSettings({
    widgetId,
    onSaved,
}: SearchSettingsProps) {
    const [engine, setEngine] =
        useState("google");

    useEffect(() => {
        const saved = localStorage.getItem(
            `search-${widgetId}`
        );

        if (!saved) {
            return;
        }

        try {
            const settings: SearchSettingsData =
                JSON.parse(saved);

            setEngine(settings.engine);
        } catch {
            //
        }
    }, [widgetId]);

    function saveEngine() {
        localStorage.setItem(
            `search-${widgetId}`,
            JSON.stringify({
                engine,
            })
        );

        onSaved();
    }

    return (
        <>
            <h3>Search Engine</h3>

            <select
                value={engine}
                onChange={(e) =>
                    setEngine(e.target.value)
                }
            >
                {searchEngines.map(
                    (searchEngine) => (
                        <option
                            key={searchEngine.id}
                            value={searchEngine.id}
                        >
                            {searchEngine.name}
                        </option>
                    )
                )}
            </select>

            <button onClick={saveEngine}>
                Save
            </button>
        </>
    );
}