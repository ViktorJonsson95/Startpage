import { useEffect, useState } from "react";
import "./RSS.css";

type RSSProps = {
    widgetId: string;
    theme: string;
    title: string;
    refreshKey: number;
};

type RSSItem = {
    title: string;
    link: string;
};

type RSSSettings = {
    url: string;
};

const defaultFeed =
    "https://feeds.arstechnica.com/arstechnica/index";

export default function RSS({
    widgetId,
    theme,
    title,
    refreshKey,
}: RSSProps) {
    const [items, setItems] = useState<RSSItem[]>([]);

    async function fetchFeed(url: string) {
        try {
            const response = await fetch(
                `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
                    url
                )}`
            );

            const data = await response.json();

            setItems(
                (data.items ?? []).map(
                    (item: any) => ({
                        title: item.title,
                        link: item.link,
                    })
                )
            );
        } catch {
            setItems([]);
        }
    }

    useEffect(() => {
        const saved = localStorage.getItem(
            `rss-${widgetId}`
        );

        if (!saved) {
            fetchFeed(defaultFeed);
            return;
        }

        try {
            const settings: RSSSettings =
                JSON.parse(saved);


            fetchFeed(settings.url);
        } catch {
            fetchFeed(defaultFeed);
        }
    }, [widgetId, refreshKey]);


    return (
        <div className={`widget rss ${theme}`}>
            <h3>{title}</h3>

            <ul>
                {items.map((item) => (
                    <li key={item.link}>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}