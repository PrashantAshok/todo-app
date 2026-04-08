import { useId, useState } from "react";
import AddNewTodo from "./AddNewTodo";
import TodoActionBar from "./TodoActionBar";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";

let todoId = 0;
const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.state,
    Completed: (task) => task.state,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoApp() {
    const [todoList, setTodoList] = useState([]);
    const [filter, setFilter] = useState("All");
    const listId = useId();

    const onAddNewTodo = ({ newTodoState, newTodoText }) => {
        setTodoList((prev) => {
            return [
                ...prev,
                {
                    id: todoId++,
                    state: newTodoState,
                    text: newTodoText,
                },
            ];
        });
    };

    const onToggleTheme = () => {};

    const onToggleTodo = ({ entry }) => {
        setTodoList((prev) => {
            return prev.map((item) =>
                item.id === entry.id ? { ...entry, state: !entry.state } : item,
            );
        });
    };

    const onUpdateTodo = ({ event, entry }) => {
        setTodoList((prev) => {
            return prev.map((item) =>
                item.id === entry.id
                    ? { ...entry, text: event.target.value }
                    : item,
            );
        });
    };

    const filteredList = todoList.filter(FILTER_MAP[filter]);

    return (
        <div>
            <TodoHeader onToggleTheme={onToggleTheme} />
            <AddNewTodo onHandleSubmit={onAddNewTodo} />
            <TodoActionBar
                FILTER_NAMES={FILTER_NAMES}
                count={filteredList.length}
                setFilter={setFilter}
                selectedFilter={filter}
                listId={listId}
            />
            <TodoList
                list={filteredList}
                listId={listId}
                onToggleTodo={onToggleTodo}
                onUpdateTodo={onUpdateTodo}
            />
        </div>
    );
}
