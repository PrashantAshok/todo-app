import { useState, type ChangeEvent, type SubmitEvent } from "react";

interface Props {
    onHandleSubmit: (data: { completed: boolean; text: string }) => void;
}

export default function AddNewTodo({ onHandleSubmit }: Props) {
    const [text, setText] = useState("");
    const [completed, setCompleted] = useState(false);

    const onFormSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onHandleSubmit({ completed, text: text.trim() });
        setText("");
        setCompleted(false);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => setCompleted((prev) => !prev)}
                aria-label="Mark new todo as completed"
            />
            <label htmlFor="new-todo-input" className="sr-only">
                New todo
            </label>
            <input
                id="new-todo-input"
                type="text"
                placeholder="Create a new todo..."
                value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}
