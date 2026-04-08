import type { Todo } from "../../types";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

interface Props {
    list: Todo[];
    onToggleTodo: (entry: Todo) => void;
    onUpdateTodo: (entry: Todo, text: string) => void;
    onDeleteTodo: (id: number) => void;
}

export default function TodoList({ list, onToggleTodo, onUpdateTodo, onDeleteTodo }: Props) {
    if (list.length === 0) {
        return <p className={styles.empty}>No todos added</p>;
    }

    return (
        <ul className={styles.list} role="list" aria-label="Todo list">
            {list.map((entry) => (
                <TodoItem
                    entry={entry}
                    key={entry.id}
                    onToggleTodo={onToggleTodo}
                    onUpdateTodo={onUpdateTodo}
                    onDeleteTodo={onDeleteTodo}
                />
            ))}
        </ul>
    );
}
