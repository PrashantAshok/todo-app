import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./TodoHeader.module.css";

export default function TodoHeader({
    theme,
    onToggleTheme,
}: {
    theme: string;
    onToggleTheme: () => void;
}) {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Todo</h1>
                <button
                    className={styles.themeBtn}
                    onClick={onToggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </header>
    );
}
