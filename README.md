# Startpage

A customizable dashboard built with React, TypeScript and React Grid Layout.

The goal of this project is to replace the traditional browser start page with a widget-based dashboard where every widget can be moved, resized and configured independently.

---

## Features

- Drag & drop widgets
- Resize widgets
- Multiple widget themes
- Individual widget settings
- Persistent layout (LocalStorage)
- Plugin-based widget system
- Easy to create new widgets

Current widgets:

- Weather
- Clock
- RSS Reader
- Bookmarks
- Todo List
- Search
- Calendar

---

## Built With

- React
- TypeScript
- Vite
- React Grid Layout
- LocalStorage

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/startpage.git
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build production version

```bash
npm run build
```

---

# How to use

Click the pencil icon to enter edit mode.

While in edit mode you can:

- Add widgets
- Remove widgets
- Move widgets
- Resize widgets
- Change widget theme
- Open widget settings

All changes are automatically saved in LocalStorage.

---

# Widget System

Every widget is completely independent.

Each widget consists of three files:

```
widgets/
    Weather/
        Weather.tsx
        WeatherSettings.tsx
        manifest.ts
```

## Weather.tsx

Contains the widget itself.

Responsible for:

- Rendering
- Fetching data
- Local widget state

---

## WeatherSettings.tsx

Contains widget specific settings.

The generic dialog already provides:

- Widget title
- Widget theme

WeatherSettings only contains settings unique to the Weather widget.

Example:

- City

---

## manifest.ts

Registers the widget.

Example:

```ts
import Weather from "./Weather";
import WeatherSettings from "./WeatherSettings";

export default {
    id: "weather",
    name: "Weather",

    defaultWidth: 2,
    defaultHeight: 2,

    defaultTheme: "card",

    component: Weather,

    settingsComponent: WeatherSettings,
};
```

---

# Creating a new widget

## 1. Create a folder

```
widgets/
    MyWidget/
```

---

## 2. Create the widget

```
MyWidget.tsx
```

Example:

```tsx
export default function MyWidget({
    title,
    theme,
}: any) {
    return (
        <div className={`widget ${theme}`}>
            <h3>{title}</h3>

            Hello World
        </div>
    );
}
```

---

## 3. Create widget settings

```
MyWidgetSettings.tsx
```

Only create this if the widget has custom settings.

Example:

```tsx
export default function MyWidgetSettings() {
    return (
        <>
            My widget settings
        </>
    );
}
```

---

## 4. Create manifest

```
manifest.ts
```

```ts
import MyWidget from "./MyWidget";
import MyWidgetSettings from "./MyWidgetSettings";

export default {
    id: "mywidget",
    name: "My Widget",

    defaultWidth: 2,
    defaultHeight: 2,

    defaultTheme: "card",

    component: MyWidget,

    settingsComponent: MyWidgetSettings,
};
```

---

## 5. Register widget

Import the manifest inside `App.tsx`

```ts
import MyWidgetManifest from "./widgets/MyWidget/manifest";
```

Add it to

```ts
availableWidgets
```

Add it to the EditBar widget list.

Done.

---

# Project Structure

```
src/

components/
    BasicLayout
    EditBar
    Modal
    WidgetDialog

widgets/
    Weather
    Clock
    RSS
    Todo
    Search
    Bookmarks
    Calendar

types/

App.tsx
```

---
