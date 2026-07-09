import { useEffect, useState } from "react";

type RSSSettingsData = {
    url: string;
};

type RSSSettingsProps = {
    widgetId: string;
    onSaved: () => void;
};

const defaultFeed =
    "https://feeds.arstechnica.com/arstechnica/index";

export default function RSSSettings({
    widgetId,
    onSaved,
}: RSSSettingsProps) {
    const [newFeedUrl, setNewFeedUrl] =
        useState(defaultFeed);

    useEffect(() => {
        const saved = localStorage.getItem(
            `rss-${widgetId}`
        );

        if (!saved) {
            return;
        }

        try {
            const settings: RSSSettingsData =
                JSON.parse(saved);

            setNewFeedUrl(settings.url);
        } catch {
            setNewFeedUrl(defaultFeed);
        }
    }, [widgetId]);

    function saveFeed() {
        localStorage.setItem(
            `rss-${widgetId}`,
            JSON.stringify({
                url: newFeedUrl,
            })
        );

        onSaved();
    }

    return (
        <>
            <h3>RSS Feed URL</h3>

            <input
                value={newFeedUrl}
                onChange={(e) =>
                    setNewFeedUrl(e.target.value)
                }
            />

            <button onClick={saveFeed}>
                Save Feed
            </button>
        </>
    );
}