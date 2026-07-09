import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./BasicLayout.css";

import type { Layout } from "react-grid-layout";
import React, { useEffect, useState } from "react";
import ReactGridLayout, { noCompactor, useContainerWidth } from "react-grid-layout";
import type { WidgetManifest, ActiveWidget } from "../types/widgets";
import { containerBounds } from "react-grid-layout/core";
import type { LayoutConstraint } from "react-grid-layout/core";
import WidgetDialog from "./WidgetDialog";


type Props = {
    widgets: ActiveWidget[];
    availableWidgets: WidgetManifest[];
    editMode: boolean;
    removeWidget: (id: string) => void;
    items?: number;
    cols?: number;
    rowHeight?: number;
    className?: string;
    onLayoutChange?: (layout: Layout) => void;
    y?: number;
    layout: Layout;
    setLayout: React.Dispatch<React.SetStateAction<Layout>>;
    updateWidgetTheme: (widgetId: string, theme: string) => void;
    updateWidgetTitle: (widgetId: string, title: string) => void;
};

const freeFormCompactor = { ...noCompactor, preventCollision: true, };

export default function BasicLayout({
    widgets,
    availableWidgets,
    layout,
    setLayout,
    editMode,
    removeWidget,
    cols = 12,
    rowHeight = 20,
    className = "layout",
    onLayoutChange = () => { },
    updateWidgetTheme,
    updateWidgetTitle,
}: Props) {
    const { width, containerRef, mounted } = useContainerWidth();
    const [selectedWidget, setSelectedWidget] = useState<ActiveWidget | null>(null);
    const [themeWidgetId, setThemeWidgetId,] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const boundedResize: LayoutConstraint = {
        name: "boundedResize",
        constrainSize(item, w, h, handle, context) {
            return {
                w: Math.min(w, context.cols - item.x),
                h: Math.min(h, context.maxRows - item.y)
            };
        }
    };

    useEffect(() => {
        if (!editMode) {
            setSelectedWidget(null);
            setThemeWidgetId(null);
        }
    }, [editMode]);

    const marginY = 10;

    const maxRows = Math.floor(((containerRef.current?.clientHeight ?? 0) + marginY) / (rowHeight + marginY));

    const selectedDefinition = selectedWidget ? availableWidgets.find((w) => w.id === selectedWidget.type) : null;

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            {mounted && (
                <ReactGridLayout
                    autoSize={false}
                    width={width}
                    layout={layout}
                    className={className}
                    gridConfig={{ cols, rowHeight, maxRows, }}
                    onLayoutChange={(newLayout) => { setLayout(newLayout); onLayoutChange(newLayout); }}
                    dragConfig={{ enabled: editMode }}
                    resizeConfig={{ enabled: editMode }}
                    compactor={freeFormCompactor}
                    constraints={[containerBounds, boundedResize]}
                >

                    {widgets.map((widget) => {
                        const definition = availableWidgets.find((w) => w.id === widget.type);

                        if (!definition) {
                            return null;
                        }

                        const Component = definition.component;
                        const SettingsComponent = definition.settingsComponent;

                        return (
                            <div key={widget.id} className="widget-wrapper">
                                {editMode && (
                                    <div className="widget-toolbar">
                                        <button onClick={() => setSelectedWidget(widget)}>
                                            ⚙
                                        </button>

                                        <button onClick={() => setThemeWidgetId(themeWidgetId === widget.id ? null : widget.id)}>
                                            🎨
                                        </button>

                                        <button onClick={() => removeWidget(widget.id)}>
                                            ✖
                                        </button>
                                    </div>

                                )
                                }
                                {themeWidgetId === widget.id && (
                                    <div className="theme-menu">
                                        <button
                                            onClick={() => updateWidgetTheme(widget.id, "card")}>
                                            Card
                                        </button>

                                        <button onClick={() => updateWidgetTheme(widget.id, "glass")}>
                                            Glass
                                        </button>

                                        <button onClick={() => updateWidgetTheme(widget.id, "minimal")}>
                                            Minimal
                                        </button>

                                        <button onClick={() => updateWidgetTheme(widget.id, "circle")}>
                                            Circle
                                        </button>
                                    </div>
                                )}
                                <Component
                                    widgetId={widget.id}
                                    title={widget.title}
                                    theme={widget.theme}
                                    refreshKey={refreshKey}
                                    editMode={editMode}
                                    settingsOpen={false}
                                    updateTitle={(title: string) =>
                                        updateWidgetTitle(widget.id, title)
                                    }
                                />
                            </div>
                        );
                    })}
                </ReactGridLayout>

            )
            }
            {selectedWidget && selectedDefinition && (
                <WidgetDialog
                    open={true}
                    title={selectedWidget.title}
                    theme={selectedWidget.theme}
                    updateTitle={(title) =>
                        updateWidgetTitle(selectedWidget.id, title)
                    }
                    updateTheme={(theme) =>
                        updateWidgetTheme(selectedWidget.id, theme)
                    }
                    onClose={() => setSelectedWidget(null)}
                    SettingsComponent={selectedDefinition.settingsComponent}
                    widgetId={selectedWidget.id}
                    onWidgetChanged={() =>
                        setRefreshKey((prev) => prev + 1)
                    }
                />
            )}
        </div >
    );
}