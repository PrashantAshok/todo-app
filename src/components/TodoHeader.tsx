import { FaMoon } from "react-icons/fa";
import styles from "./TodoHeader.module.css";

export default function TodoHeader({ onToggleTheme }: { onToggleTheme: () => void }) {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Todo</h1>
                <button
                    className={styles.themeBtn}
                    onClick={onToggleTheme}
                    aria-label="Toggle theme"
                >
                    <FaMoon />
                </button>
            </div>
        </header>
    );
}
