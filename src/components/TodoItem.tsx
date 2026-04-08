export default function TodoItem({ entry, onToggleTodo, onChangeTodoText }) {
    return (
        <li key={entry.id}>
            <input
                type="checkbox"
                checked={entry.state}
                onChange={() => onToggleTodo({ entry })}
            />
            <input
                className={entry.state ? "done" : ""}
                type="text"
                value={entry.text}
                onChange={(event) => onChangeTodoText({ event, entry })}
            />
        </li>
    );
}
