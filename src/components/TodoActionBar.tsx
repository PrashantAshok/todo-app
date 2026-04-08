function FilterButton({ name, setFilter, isPressed }) {
    return (
        <button onClick={() => setFilter(name)} aria-pressed={isPressed}>
            <span>{name}</span>
        </button>
    );
}

export default function TodoActionBar({
    count,
    FILTER_NAMES,
    setFilter,
    listId,
    selectedFilter,
}) {
    return (
        <footer>
            <div id={listId}>{count} items left</div>
            <div>
                {FILTER_NAMES.map((name) => (
                    <FilterButton
                        name={name}
                        key={name}
                        isPressed={name === selectedFilter}
                        setFilter={setFilter}
                    />
                ))}
            </div>
            <div>
                <button>Clear completed</button>
            </div>
        </footer>
    );
}
