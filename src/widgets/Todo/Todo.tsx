import { useEffect, useState } from "react";
import "./Todo.css";

type TodoProps = {
    widgetId: string;
    theme: string;
    title: string;
};

type TodoItem = {
    id: string;
    text: string;
    checked: boolean;
};

export default function Todo({
    widgetId,
    theme,
    title,
}: TodoProps) {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState<TodoItem[]>(() => {
        const saved =
            localStorage.getItem(
                `todo-${widgetId}`
            );

        if (!saved) return [];

        try {
            return JSON.parse(saved);
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            `todo-${widgetId}`,
            JSON.stringify(todos)
        );
    }, [todos, widgetId]);

    function addTodo() {
        if (!input.trim()) return;

        setTodos((previous) => [
            ...previous,
            {
                id: Date.now().toString(),
                text: input.trim(),
                checked: false,
            },
        ]);

        setInput("");
    }

    function removeTodo(id: string) {
        setTodos((previous) => previous.filter((todo) => todo.id !== id));
    }

    function toggleTodo(id: string) {
        setTodos((previous) =>
            previous.map((todo) =>
                todo.id === id ? { ...todo, checked: !todo.checked, } : todo
            )
        );
    }
    const sortedTodos = [...todos].sort(
        (a, b) =>
            Number(a.checked) -
            Number(b.checked)
    );

    return (
        <div className={`widget todo ${theme}`}>
            <h3>{title}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addTodo();
                }}
            >
                <input
                    type="text"
                    placeholder="Lägg till en todo..."
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)
                    }
                />

                <button type="submit">
                    Lägg till
                </button>
            </form>

            <ul>
                {sortedTodos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.checked}
                            onChange={() =>
                                toggleTodo(todo.id)
                            }
                        />

                        <span
                            style={{
                                textDecoration:
                                    todo.checked
                                        ? "line-through"
                                        : "none",
                            }}
                        >
                            {todo.text}
                        </span>

                        <button
                            onClick={() =>
                                removeTodo(todo.id)
                            }
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}