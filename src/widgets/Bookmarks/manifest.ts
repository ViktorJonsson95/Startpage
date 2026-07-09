import Bookmarks from "./Bookmarks";
import BookmarksSettings from "./BookmarksSettings";

const manifest = {
    id: "bookmarks",

    name: "Bookmarks",

    defaultWidth: 2,

    defaultHeight: 2,

    defaultTheme: "card",

    component: Bookmarks,
    settingsComponent: BookmarksSettings,
};

export default manifest;