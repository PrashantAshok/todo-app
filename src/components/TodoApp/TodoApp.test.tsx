import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp";
import { render, screen } from "@testing-library/react";

describe("TodoApp", () => {
    it("adds a new todo when the form is submitted", async () => {
        const user = userEvent.setup();
        render(<TodoApp />);
        const inputField = screen.getByRole("textbox", {
            name: /new todo/i,
        });
        await user.type(inputField, "First Task{enter}");
        expect(
            screen.getByRole("textbox", { name: /edit todo task/i }),
        ).toHaveValue("First Task");
        expect(inputField).toHaveValue("");
    });

    it("adds a new todo when there's an existing todo", async () => {
        const user = userEvent.setup();
        render(<TodoApp />);
        const inputField = screen.getByRole("textbox", {
            name: /new todo/i,
        });
        await user.type(inputField, "First Task{enter}");

        await user.type(inputField, "Second Task{enter}");
        // expect(screen.getByRole("textbox", { name: /todo text/i })).toHaveValue(
        //     "First Task",
        // );
        // The above would fail since there are multiple todo text textboxes.
        // Better to use queryByDisplayValue
        expect(screen.queryByDisplayValue("Second Task")).toBeInTheDocument();
        expect(inputField).toHaveValue("");
    });

    it("toggle a todo between completed and active", async () => {
        const user = userEvent.setup();
        render(<TodoApp />);

        // Add a todo first
        const inputField = screen.getByRole("textbox", {
            name: /new todo/i,
        });
        await user.type(inputField, "Walk the dog{enter}");

        const todoCheckbox = screen.getByRole("checkbox", {
            name: `Toggle completed for Walk the dog`,
        });
        expect(todoCheckbox).not.toBeChecked();

        await user.click(todoCheckbox);
        expect(todoCheckbox).toBeChecked();

        await user.click(todoCheckbox);
        expect(todoCheckbox).not.toBeChecked();
    });

    it("deletes a todo when the delete button is clicked", async () => {
        const user = userEvent.setup();
        render(<TodoApp />);

        // Add a todo first
        const inputField = screen.getByRole("textbox", {
            name: /new todo/i,
        });
        await user.type(inputField, "Walk the dog{enter}");
        await user.click(
            screen.getByRole("button", { name: /Delete "Walk the dog"/i }),
        );
        expect(
            screen.queryByDisplayValue("Walk the dog"),
        ).not.toBeInTheDocument();
    });

    it("filters todo by active and completed", async () => {
        const user = userEvent.setup();
        render(<TodoApp />);

        // Add a todo first
        const inputField = screen.getByRole("textbox", {
            name: /new todo/i,
        });
        await user.type(inputField, "First Task{enter}");
        await user.type(inputField, "Second Task{enter}");
        await user.type(inputField, "Third Task{enter}");

        const todoCheckbox = screen.getByRole("checkbox", {
            name: "Toggle completed for First Task",
        });
        await user.click(todoCheckbox);
        // assert Active filter
        await user.click(screen.getByRole("button", { name: "Active" }));
        expect(screen.queryByDisplayValue('First Task')).not.toBeInTheDocument();
        expect(screen.getByDisplayValue('Second Task')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Third Task')).toBeInTheDocument();

        // assert Completed filter
        await user.click(screen.getByRole("button", { name: "Completed" }));
        expect(screen.getByDisplayValue('First Task')).toBeInTheDocument();
        expect(screen.queryByDisplayValue('Second Task')).not.toBeInTheDocument();
    });
});
