import type { FilterName } from "../types";

interface FilterButtonProps {
    name: FilterName;
    setFilter: (name: FilterName) => void;
    isPressed: boolean;
}

function FilterButton({ name, setFilter, isPressed }: FilterButtonProps) {
    return (
        <button onClick={() => setFilter(name)} aria-pressed={isPressed}>
            <span>{name}</span>
        </button>
    );
}

interface Props {
    count: number;
    filterNames: FilterName[];
    setFilter: (name: FilterName) => void;
    selectedFilter: FilterName;
    onClearCompleted: () => void;
}

export default function TodoActionBar({
    count,
    filterNames,
    setFilter,
    selectedFilter,
    onClearCompleted,
}: Props) {
    return (
        <footer>
            <div>{count} items left</div>
            <div role="group" aria-label="Filter todos">
                {filterNames.map((name) => (
                    <FilterButton
                        name={name}
                        key={name}
                        isPressed={name === selectedFilter}
                        setFilter={setFilter}
                    />
                ))}
            </div>
            <div>
                <button onClick={onClearCompleted}>Clear completed</button>
            </div>
        </footer>
    );
}
