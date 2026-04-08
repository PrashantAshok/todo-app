import { render, screen } from "@testing-library/react";
import TodoHeader from "./TodoHeader";
import userEvent from "@testing-library/user-event";

describe("TodoHeader Component", () => {
    it("renders light theme", async () => {
        const { container } = render(
            <TodoHeader theme="light" onToggleTheme={vi.fn()} />,
        );
        expect(container).toMatchSnapshot();
    });

    it("renders dark theme", async () => {
        const { container } = render(
            <TodoHeader theme="dark" onToggleTheme={vi.fn()} />,
        );
        expect(container).toMatchSnapshot();
    });

    it("calls onToggleTheme when the theme button is clicked", async () => {
        const user = userEvent.setup();
        const mockToggle = vi.fn();

        render(<TodoHeader theme="light" onToggleTheme={mockToggle} />);
        await user.click(screen.getByRole("button", { name: /Toggle Theme/i }));
        expect(mockToggle).toHaveBeenCalled();
    });
});
