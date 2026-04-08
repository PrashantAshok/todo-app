import { FaMoon, FaSun } from "react-icons/fa";

export default function TodoHeader({ onToggleTheme }) {
  return (
    <header className="">
      <h1>Todo</h1>
      <button onClick={onToggleTheme}>
        <FaSun />
        <FaMoon />
      </button>
    </header>
  );
}
