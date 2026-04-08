import { FaTimes } from "react-icons/fa";
import styles from "./TodoItem.module.css";
import type { Todo } from "../../types";

interface Props {
    entry: Todo;
    onToggleTodo: (entry: Todo) => void;
    onUpdateTodo: (entry: Todo, text: string) => void;
    onDeleteTodo: (id: number) => void;
}

export default function TodoItem({
    entry,
    onToggleTodo,
    onUpdateTodo,
    onDeleteTodo,
}: Props) {
    const inputId = `todo-input-${entry.id}`;
    return (
        <li className={styles.item}>
            <label className={styles.checkboxWrapper}>
                <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    checked={entry.completed}
                    onChange={() => onToggleTodo(entry)}
                    aria-label={`Toggle completed for ${entry.text}`}
                />
                <span className={styles.checkboxCustom} aria-hidden="true" />
            </label>
            <input
                id={inputId}
                aria-label="Edit todo task"
                className={`${styles.text} ${entry.completed ? styles.done : ""}`}
                type="text"
                value={entry.text}
                onChange={(e) => onUpdateTodo(entry, e.target.value)}
            />
            <button
                className={styles.deleteBtn}
                onClick={() => onDeleteTodo(entry.id)}
                aria-label={`Delete "${entry.text}"`}
            >
                <FaTimes />
            </button>
        </li>
    );
}
