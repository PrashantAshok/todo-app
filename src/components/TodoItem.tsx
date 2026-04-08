import type { Todo } from "../types";

interface Props {
    entry: Todo;
    onToggleTodo: (entry: Todo) => void;
    onUpdateTodo: (entry: Todo, text: string) => void;
}

export default function TodoItem({ entry, onToggleTodo, onUpdateTodo }: Props) {
    const inputId = `todo-input-${entry.id}`;
    return (
        <li>
            <input
                type="checkbox"
                checked={entry.completed}
                onChange={() => onToggleTodo(entry)}
                aria-labelledby={inputId}
            />
            <input
                id={inputId}
                aria-label="Todo text"
                className={entry.completed ? "done" : ""}
                type="text"
                value={entry.text}
                onChange={(e) => onUpdateTodo(entry, e.target.value)}
            />
        </li>
    );
}
