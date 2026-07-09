import { useEffect, useState } from "react";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import type { Layout } from "react-grid-layout";
import { Pencil } from "lucide-react";

import BasicLayout from "./components/BasicLayout"
import EditBar from "./components/EditBar";
import "./App.css";

import type { ActiveWidget } from "./types/widgets";

import WeatherManifest from "./widgets/Weather/manifest";
import ClockManifest from "./widgets/Clock/manifest"
import RSSManifest from "./widgets/RSS/manifest"
import BookmarksManifest from "./widgets/Bookmarks/manifest"
import TodoManifest from "./widgets/Todo/manifest"
import SearchManifest from "./widgets/Search/manifest"
import CalendarManifest from "./widgets/Calendar/manifest"


const availableWidgets = [
  WeatherManifest,
  ClockManifest,
  RSSManifest,
  BookmarksManifest,
  TodoManifest,
  SearchManifest,
  CalendarManifest
];



export default function App() {
  const [theme, setTheme] = useState(() => { return (localStorage.getItem("theme") ?? "theme-dark"); });
  const [editMode, setEditMode] = useState(false);
  const [activeWidgets, setActiveWidgets] =
    useState<ActiveWidget[]>(() => {
      const saved = localStorage.getItem("activeWidgets");
      if (!saved) {
        return [];
      }
      return JSON.parse(saved).map((widget: ActiveWidget) => ({ ...widget, title: widget.title ?? widget.type, }));
    });

  const [layout, setLayout] = useState<Layout>(() => {
    const saved = localStorage.getItem("layout");
    if (!saved) {
      return [];
    }
    return JSON.parse(saved).map((widget: ActiveWidget) => ({ ...widget, title: widget.title ?? widget.type, }));
  });

  useEffect(() => {
    localStorage.setItem("layout", JSON.stringify(layout));
  }, [layout]);

  useEffect(() => {
    localStorage.setItem("activeWidgets", JSON.stringify(activeWidgets));
  }, [activeWidgets]);


  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  function removeWidget(id: string) {
    setActiveWidgets((previous) => previous.filter((widget) => widget.id !== id));
    setLayout((previous) => previous.filter((item) => item.i !== id));
  }

  function updateWidgetTitle(widgetId: string, title: string) {
    setActiveWidgets((previous) =>
      previous.map((widget) => widget.id === widgetId ? { ...widget, title, } : widget)
    );
  }
  function updateWidgetTheme(widgetId: string, theme: string) {
    setActiveWidgets((previous) =>
      previous.map((widget) => widget.id === widgetId ? { ...widget, theme } : widget)
    );
  }

  function findFreePosition(
    layout: Layout,
    width: number,
    height: number,
    cols = 12
  ) {
    let y = 0;

    while (true) {
      for (let x = 0; x <= cols - width; x++) {

        const collision = layout.some(item =>
          x < item.x + item.w &&
          x + width > item.x &&
          y < item.y + item.h &&
          y + height > item.y
        );

        if (!collision) {
          return { x, y };
        }
      }

      y++;
    }
  }

  function addWidget(widgetType: string) {
    const definition = availableWidgets.find((w) => w.id === widgetType);

    if (!definition) {
      return;
    }

    const id = Date.now().toString();

    setActiveWidgets((previous) => [
      ...previous,
      {
        id,
        type: widgetType,
        theme: definition.defaultTheme,
        title: widgetType,
      },
    ]);

    setLayout((previous) => {
      const position = findFreePosition(
        previous,
        definition.defaultWidth,
        definition.defaultHeight
      );

      return [
        ...previous,
        {
          i: id,
          x: position.x,
          y: position.y,
          w: definition.defaultWidth,
          h: definition.defaultHeight,
        },
      ];
    });
  }
  return (
    <>
      {!editMode && (
        <button
          className="edit-button"
          onClick={() => setEditMode(true)}
        >
          <Pencil size={22} />
        </button>
      )}
      {editMode && (
        <EditBar
          widgets={[
            {
              key: "clock",
              name: "Clock",
            },
            {
              key: "bookmarks",
              name: "Bookmarks",
            },
            {
              key: "todo",
              name: "Todo",
            },
            {
              key: "weather",
              name: "Weather",
            },
            {
              key: "calendar",
              name: "Calendar",
            },
            {
              key: "search",
              name: "Search",
            },
            {
              key: "rss",
              name: "RSS",
            },
          ]}
          onAddWidget={addWidget}
          onThemeChange={setTheme}
          onClose={() => setEditMode(false)}
        />
      )}
      <div className="dashboard">
        <BasicLayout
          widgets={activeWidgets}
          availableWidgets={availableWidgets}
          layout={layout}
          setLayout={setLayout}
          editMode={editMode}
          removeWidget={removeWidget}
          updateWidgetTheme={updateWidgetTheme}
          updateWidgetTitle={updateWidgetTitle}
        />
      </div>
    </>
  )

}