import { useState, useEffect } from "react";
import "./Bookmarks.css"
import type {
    WidgetProps,
} from "../../types/widgets";

type BookmarksProps = {
    widgetId: string;
    title: string;
    theme: string;
    refreshKey: number;
};

type Bookmark = {
    id: string;
    name: string;
    url: string;
};


export default function Bookmarks({
    widgetId,
    title,
    theme,
    refreshKey,
}: BookmarksProps) {
    const [bookmarks, setBookmarks] =
        useState<Bookmark[]>(() => {
            const saved = localStorage.getItem(`bookmarks-${widgetId}`);

            if (saved) {
                return JSON.parse(saved);
            }

            return [
                {
                    id: Date.now().toString(),
                    name: "GitHub",
                    url: "https://github.com",
                },
                {
                    id: (Date.now() + 1).toString(),
                    name: "YouTube",
                    url: "https://youtube.com",
                },
            ];
        });

    useEffect(() => {
        const saved = localStorage.getItem(`bookmarks-${widgetId}`);

        if (!saved) {
            return;
        }

        setBookmarks(JSON.parse(saved));
    }, [widgetId, refreshKey]);

    function removeBookmark(id: string) {
        setBookmarks((previous) =>
            previous.filter(
                (bookmark) =>
                    bookmark.id !== id
            )
        );
    }

    useEffect(() => {
        localStorage.setItem(
            `bookmarks-${widgetId}`,
            JSON.stringify(bookmarks)
        );
    }, [bookmarks, widgetId]);

    return (
        <div className={`widget bookmarks ${theme}`}>
            <h3>{title}</h3>
            <ul>
                <ul>
                    {bookmarks.map((bookmark) => (
                        <li key={bookmark.id}>
                            <img
                                src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
                                alt=""
                            />
                            <a href={bookmark.url}>
                                {bookmark.name}
                            </a>
                            <button
                                onClick={() =>
                                    removeBookmark(
                                        bookmark.id
                                    )
                                }
                            >
                                ✖
                            </button>
                        </li>
                    ))}
                </ul>
            </ul>
        </div>

    );
}