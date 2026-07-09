import { useEffect, useState } from "react";
import "./Search.css";

type SearchProps = {
    widgetId: string;
    theme: string;
    title: string;
    refreshKey: number;
};

type SearchSettings = {
    engine: string;
};

const searchEngines = [
    {
        id: "google",
        name: "Google",
        url: "https://www.google.com/search?q=",
    },
    {
        id: "duckduckgo",
        name: "DuckDuckGo",
        url: "https://duckduckgo.com/?q=",
    },
    {
        id: "bing",
        name: "Bing",
        url: "https://www.bing.com/search?q=",
    },
    {
        id: "brave",
        name: "Brave",
        url: "https://search.brave.com/search?q=",
    },
    {
        id: "wikipedia",
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Special:Search?search=",
    },
    {
        id: "youtube",
        name: "YouTube",
        url: "https://www.youtube.com/results?search_query=",
    },
    {
        id: "github",
        name: "GitHub",
        url: "https://github.com/search?q=",
    },
    {
        id: "stackoverflow",
        name: "Stack Overflow",
        url: "https://stackoverflow.com/search?q=",
    },
];

export default function Search({
    widgetId,
    theme,
    title,
    refreshKey,
}: SearchProps) {
    const [query, setQuery] = useState("");
    const [engine, setEngine] = useState("google");

    useEffect(() => {
        const saved = localStorage.getItem(
            `search-${widgetId}`
        );

        if (!saved) return;

        try {
            const settings: SearchSettings =
                JSON.parse(saved);

            setEngine(settings.engine);
        } catch {
            //
        }
    }, [widgetId, refreshKey]);


    function search() {
        if (!query.trim()) {
            return;
        }

        const selected =
            searchEngines.find(
                (searchEngine) =>
                    searchEngine.id === engine
            );

        if (!selected) {
            return;
        }

        window.open(
            selected.url +
            encodeURIComponent(query),
            "_blank"
        );

        setQuery("");
    }

    return (
        <div className={`widget search ${theme}`}>
            <h3>{title}</h3>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    search();
                }}
            >
                <input
                    type="text"
                    placeholder={`Search with ${searchEngines.find(
                        (s) =>
                            s.id === engine
                    )?.name ?? "Google"
                        }`}
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }
                />

                <button type="submit">
                    Search
                </button>
            </form>
        </div>
    );
}