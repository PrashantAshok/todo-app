import { useState, type ChangeEvent, type SubmitEvent } from "react";

export default function AddNewTodo({ onHandleSubmit }) {
    const [newTodoText, setNewTodoText] = useState("");
    const [newTodoState, setNewTodoState] = useState(false);

    const handleNewTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodoText(e.target.value);
    };

    const onToggleNewTodo = () => {
        setNewTodoState((prev) => !prev);
    };

    const onFormSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        onHandleSubmit({ newTodoState, newTodoText });
        setNewTodoText('');
        setNewTodoState(false);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="checkbox"
                checked={newTodoState}
                onChange={onToggleNewTodo}
                aria-label="Toggle state of new todo"
            />
            <input
                type="text"
                placeholder="Create a new todo..."
                value={newTodoText}
                onChange={handleNewTodo}
            />
        </form>
    );
}
