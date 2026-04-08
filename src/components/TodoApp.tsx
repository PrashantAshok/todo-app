import { useRef, useState } from "react";
import AddNewTodo from "./AddNewTodo";
import TodoActionBar from "./TodoActionBar";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";
import type { FilterName, Todo } from "../types";

const FILTER_MAP: Record<FilterName, (task: Todo) => boolean> = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP) as FilterName[];

export default function TodoApp() {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<FilterName>("All");
    const todoIdRef = useRef(0);

    const onAddNewTodo = ({ completed, text }: { completed: boolean; text: string }) => {
        setTodoList((prev) => [
            ...prev,
            { id: todoIdRef.current++, completed, text },
        ]);
    };

    const onToggleTheme = () => {};

    const onToggleTodo = (entry: Todo) => {
        setTodoList((prev) =>
            prev.map((item) =>
                item.id === entry.id ? { ...entry, completed: !entry.completed } : item
            )
        );
    };

    const onUpdateTodo = (entry: Todo, text: string) => {
        setTodoList((prev) =>
            prev.map((item) =>
                item.id === entry.id ? { ...entry, text } : item
            )
        );
    };

    const onClearCompleted = () => {
        setTodoList((prev) => prev.filter((item) => !item.completed));
    };

    const activeCount = todoList.filter((item) => !item.completed).length;
    const filteredList = todoList.filter(FILTER_MAP[filter]);

    return (
        <div>
            <TodoHeader onToggleTheme={onToggleTheme} />
            <AddNewTodo onHandleSubmit={onAddNewTodo} />
            <TodoActionBar
                filterNames={FILTER_NAMES}
                count={activeCount}
                setFilter={setFilter}
                selectedFilter={filter}
                onClearCompleted={onClearCompleted}
            />
            <TodoList
                list={filteredList}
                onToggleTodo={onToggleTodo}
                onUpdateTodo={onUpdateTodo}
            />
        </div>
    );
}
