Startpage - Projektplan

## Mål

Skapa en personlig startsida som kan sättas som webbläsarens startsida.

Användaren ska kunna:

* Flytta runt widgets
* Anpassa innehåll
* Spara inställningar lokalt
* Exportera och importera inställningar

Ingen backend behövs i första versionen.

---

## Teknik

* React
* TypeScript
* Vite
* Dnd Kit
* LocalStorage

---

## MVP

### Layout
* Responsiv layout
* Widget-system
* Mörkt tema
* Flyttbara widgets med Dnd Kit

### Widgets

#### Bokmärken
Funktioner:
* Lägg till bokmärke
* Ta bort bokmärke
* Redigera bokmärke
* Anpassad ikon
* Öppna i ny flik

Data:
```json
{
  "id": "github",
  "title": "GitHub",
  "url": "https://github.com"
}
```
---
#### Todo
Funktioner:

* Lägg till uppgift
* Markera som klar
* Ta bort uppgift

Data:

```json
{
  "id": "1",
  "text": "Bygg startpage",
  "completed": false
}
```

---

#### Anteckningar

Funktioner:

* Fri text
* Autospara

Data:

```json
{
  "content": "Kom ihåg att fixa RSS"
}
```

---

#### Klocka

Funktioner:

* Tid
* Datum

Ingen lagring behövs.

---

#### Väder

Funktioner:

* Visa väder
* Visa temperatur
* Visa plats

Version 1:

* Stad väljs manuellt

Version 2:

* Automatisk plats

---

#### RSS

Funktioner:

* Visa senaste artiklar
* Lägg till RSS-flöden
* Ta bort RSS-flöden

Version 1:

* Fördefinierade flöden

Version 2:

* Egna flöden

---

## Drag & Drop

Mål:

* Flytta widgets
* Spara ordning

Exempel:

```json
{
  "layout": [
    "clock",
    "weather",
    "bookmarks",
    "todo",
    "notes",
    "rss"
  ]
}
```

Sparas i LocalStorage.

---

## LocalStorage

Spara:

* Widget-ordning
* Bokmärken
* Todo-lista
* Anteckningar
* Väderinställningar
* RSS-inställningar

Nyckel:

```text
startpage-settings
```

---

## Import / Export

### Export

Knapp:

```text
Export Settings
```

Laddar ner:

```text
startpage-settings.json
```

---

### Import

Knapp:

```text
Import Settings
```

Läser in tidigare exporterad JSON.

---

## Utvecklingsordning

### Fas 1

* Skapa React-projekt
* Grundlayout
* Widget-komponent
* LocalStorage-hjälpare

Klart när:

* Sidan laddar widgets från konfiguration

---

### Fas 2

* Implementera Dnd Kit
* Flytta widgets
* Spara ordning

Klart när:

* Layouten återställs efter omladdning

---

### Fas 3

* Bokmärken
* Todo
* Anteckningar

Klart när:

* All data sparas lokalt

---

### Fas 4

* Klocka
* Väder

Klart när:

* Dashboard känns användbar dagligen

---

### Fas 5

* RSS

Klart när:

* Flöden visas automatiskt

---

### Fas 6

* Import/export av JSON

Klart när:

* Hela konfigurationen kan flyttas mellan datorer

---

## Framtida funktioner

* Kommandopalett (Ctrl+K)
* Kalender
* Pomodoro
* Fokusläge
* AI-widget
* GitHub-widget
* Flera layouter
* Synkning via konto
* Widget-storlekar
* Widget-grupper
* Teman
* Sök i bokmärken

---

## Definition of Done

Projektet är klart när användaren kan:

1. Öppna startsidan.
2. Flytta widgets.
3. Skapa bokmärken.
4. Hantera todo-lista.
5. Skriva anteckningar.
6. Se väder och tid.
7. Läsa RSS-flöden.
8. Stänga webbläsaren.
9. Öppna sidan igen och få tillbaka exakt samma layout och data.
10. Exportera och importera all data via en JSON-fil.
