import type { FilterName } from "../types";
import styles from "./TodoFilterBar.module.css";

interface Props {
    filterNames: FilterName[];
    setFilter: (name: FilterName) => void;
    selectedFilter: FilterName;
}

export default function TodoFilterBar({ filterNames, setFilter, selectedFilter }: Props) {
    return (
        <div className={styles.card} role="group" aria-label="Filter todos">
            {filterNames.map((name) => (
                <button
                    key={name}
                    className={`${styles.btn} ${name === selectedFilter ? styles.btnActive : ""}`}
                    onClick={() => setFilter(name)}
                    aria-pressed={name === selectedFilter}
                >
                    {name}
                </button>
            ))}
        </div>
    );
}
