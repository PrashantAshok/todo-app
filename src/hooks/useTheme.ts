import { useEffect, useState } from "react";

export default function useTheme(defaultValue = "light") {
    const [theme, setTheme] = useState(() => {
        const valueFromLS = localStorage.getItem("theme");
        return valueFromLS ?? defaultValue
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme] as const;
}
