import TodoItem from "./TodoItem";
import "./TodoList.css";
import type { Todo } from "../types";

interface Props {
    list: Todo[];
    onToggleTodo: (entry: Todo) => void;
    onUpdateTodo: (entry: Todo, text: string) => void;
}

export default function TodoList({ list, onToggleTodo, onUpdateTodo }: Props) {
    if (list.length === 0) {
        return <p>No todos added</p>;
    }

    return (
        <div className="todo-list">
            <ul role="list" aria-label="Todo list">
                {list.map((entry) => (
                    <TodoItem
                        entry={entry}
                        key={entry.id}
                        onToggleTodo={onToggleTodo}
                        onUpdateTodo={onUpdateTodo}
                    />
                ))}
            </ul>
        </div>
    );
}
