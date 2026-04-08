import TodoItem from "./TodoItem";
import "./TodoList.css";

export default function TodoList({ list, onToggleTodo, onUpdateTodo, listId }) {
    if (list.length === 0) {
        return <p>No todos added</p>;
    }

    return (
        <div className="todo-list">
            <ul role="list" aria-labelledby={listId}>
                {list.map((entry, index) => {
                    return (
                        <TodoItem
                            entry={entry}
                            key={entry.id}
                            onToggleTodo={onToggleTodo}
                            onChangeTodoText={onUpdateTodo}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
