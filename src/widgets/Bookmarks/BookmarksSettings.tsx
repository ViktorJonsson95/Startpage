import { useEffect, useState } from "react";

type Bookmark = {
    id: string;
    name: string;
    url: string;
};

type BookmarksSettingsProps = {
    widgetId: string;
    onSaved: () => void;
};

export default function BookmarksSettings({
    widgetId,
    onSaved,
}: BookmarksSettingsProps) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [newName, setNewName] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(`bookmarks-${widgetId}`);

        if (saved) {
            setBookmarks(JSON.parse(saved));
        }

    }, [widgetId]);

    function removeBookmark(id: string) {
        const updated = bookmarks.filter(
            (bookmark) => bookmark.id !== id
        );

        setBookmarks(updated);

        localStorage.setItem(
            `bookmarks-${widgetId}`,
            JSON.stringify(updated)
        );

        onSaved();
    }

    function addBookmark() {
        if (!newName || !newUrl) {
            return;
        }

        try {
            new URL(newUrl);
        } catch {
            setError(true);
            return;
        }

        setError(false);

        const updated = [
            ...bookmarks,
            {
                id: Date.now().toString(),
                name: newName,
                url: newUrl,
            },
        ];

        setBookmarks(updated);

        localStorage.setItem(
            `bookmarks-${widgetId}`,
            JSON.stringify(updated)
        );

        setNewName("");
        setNewUrl("");

        onSaved();
    }

    return (
        <div>
            <h3>Bookmarks</h3>

            {bookmarks.length === 0 ? (
                <p>No bookmarks</p>
            ) : (
                <ul>
                    {bookmarks.map((bookmark) => (
                        <li key={bookmark.id}>
                            <span>{bookmark.name}</span>

                            <button
                                onClick={() =>
                                    removeBookmark(bookmark.id)
                                }
                            >
                                ✖
                            </button>
                        </li>
                    ))}
                </ul>

            )}
            <h3>Add Bookmark</h3>

            <input
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />

            <input
                placeholder="URL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
            />

            {error && (
                <p style={{ color: "red" }}>
                    URL not valid
                </p>
            )}

            <button onClick={addBookmark}>
                Add
            </button>
        </div>
    );
}