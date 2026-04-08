import { useState, type ChangeEvent, type SubmitEvent } from "react";
import styles from "./AddNewTodo.module.css";

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
        <form className={styles.form} onSubmit={onFormSubmit}>
            <label className={styles.checkboxWrapper}>
                <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    checked={completed}
                    onChange={() => setCompleted((prev) => !prev)}
                    aria-label="Mark new todo as completed"
                />
                <span className={styles.checkboxCustom} aria-hidden="true" />
            </label>
            <label htmlFor="new-todo-input" className="sr-only">
                New todo
            </label>
            <input
                id="new-todo-input"
                className={styles.input}
                type="text"
                placeholder="Create a new todo..."
                value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />
            <button type="submit" className="sr-only">Add</button>
        </form>
    );
}
