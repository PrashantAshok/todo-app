import styles from "./TodoActionBar.module.css";

interface Props {
    count: number;
    onClearCompleted: () => void;
}

export default function TodoActionBar({ count, onClearCompleted }: Props) {
    return (
        <div className={styles.bar}>
            <span className={styles.count}>{count} items left</span>
            <button className={styles.clearBtn} onClick={onClearCompleted}>
                Clear Completed
            </button>
        </div>
    );
}
