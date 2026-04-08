# Test Cases Plan — TodoApp Integration Tests

## Context

The user is learning Vitest + Testing Library and wants 5 high-priority integration test cases for their todo app. All tests render `<TodoApp />` (the root component) and interact with it like a user would — no mocking of child components. This is the best way to learn Testing Library's philosophy: **test behavior, not implementation**.

## Test file

`src/components/TodoApp/TodoApp.test.tsx`

All 5 tests live in one file since they all render the full `<TodoApp />`.

## Setup

Each test uses `userEvent` (not `fireEvent`) for realistic user interactions. The existing `tests/setup.ts` handles cleanup.

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp";
```

---

## Test 1: Add a new todo

**What it tests:** User types into the input, submits the form, and the new todo appears in the list.

**Key concepts:** `getByPlaceholderText`, `getByRole`, `userEvent.type`, `userEvent.keyboard`, form submission.

```tsx
it("adds a new todo when the form is submitted", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  const input = screen.getByPlaceholderText("Create a new todo...");
  await user.type(input, "Buy groceries");
  await user.keyboard("{Enter}");

  expect(screen.getByDisplayValue("Buy groceries")).toBeInTheDocument();
  expect(input).toHaveValue("");  // input resets after submit
});
```

---

## Test 2: Toggle a todo's completed state

**What it tests:** User adds a todo, then clicks its checkbox to mark it complete.

**Key concepts:** `getByRole("checkbox")`, `userEvent.click`, checking the `checked` attribute.

```tsx
it("toggles a todo between completed and active", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  // Add a todo first
  const input = screen.getByPlaceholderText("Create a new todo...");
  await user.type(input, "Walk the dog");
  await user.keyboard("{Enter}");

  // The todo's checkbox (not the form's checkbox) — find by aria-labelledby
  const todoCheckbox = screen.getByRole("checkbox", { name: "Walk the dog" });
  expect(todoCheckbox).not.toBeChecked();

  await user.click(todoCheckbox);
  expect(todoCheckbox).toBeChecked();

  await user.click(todoCheckbox);
  expect(todoCheckbox).not.toBeChecked();
});
```

---

## Test 3: Delete a todo

**What it tests:** User adds a todo, clicks the delete button, and the todo disappears.

**Key concepts:** `getByRole("button", { name })`, `queryByDisplayValue` (returns null when not found).

```tsx
it("deletes a todo when the delete button is clicked", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  const input = screen.getByPlaceholderText("Create a new todo...");
  await user.type(input, "Clean the house");
  await user.keyboard("{Enter}");

  expect(screen.getByDisplayValue("Clean the house")).toBeInTheDocument();

  const deleteBtn = screen.getByRole("button", { name: /delete "Clean the house"/i });
  await user.click(deleteBtn);

  expect(screen.queryByDisplayValue("Clean the house")).not.toBeInTheDocument();
});
```

---

## Test 4: Filter todos by Active / Completed

**What it tests:** User adds two todos, completes one, then uses filter buttons to view only active or only completed todos.

**Key concepts:** `getByRole("button", { name })`, `queryByDisplayValue`, `aria-pressed`, filtering logic.

```tsx
it("filters todos by active and completed", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  const input = screen.getByPlaceholderText("Create a new todo...");

  // Add two todos
  await user.type(input, "Todo A");
  await user.keyboard("{Enter}");
  await user.type(input, "Todo B");
  await user.keyboard("{Enter}");

  // Complete "Todo A"
  const checkboxA = screen.getByRole("checkbox", { name: "Todo A" });
  await user.click(checkboxA);

  // Filter: Active — only "Todo B" visible
  await user.click(screen.getByRole("button", { name: "Active" }));
  expect(screen.queryByDisplayValue("Todo A")).not.toBeInTheDocument();
  expect(screen.getByDisplayValue("Todo B")).toBeInTheDocument();

  // Filter: Completed — only "Todo A" visible
  await user.click(screen.getByRole("button", { name: "Completed" }));
  expect(screen.getByDisplayValue("Todo A")).toBeInTheDocument();
  expect(screen.queryByDisplayValue("Todo B")).not.toBeInTheDocument();

  // Filter: All — both visible
  await user.click(screen.getByRole("button", { name: "All" }));
  expect(screen.getByDisplayValue("Todo A")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Todo B")).toBeInTheDocument();
});
```

---

## Test 5: Clear completed todos

**What it tests:** User adds todos, completes some, clicks "Clear Completed", and only active todos remain. Also verifies the items-left count updates.

**Key concepts:** `getByText` (for the count), `getByRole("button", { name })`, verifying multiple elements.

```tsx
it("clears all completed todos and updates the count", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  const input = screen.getByPlaceholderText("Create a new todo...");

  // Add 3 todos
  await user.type(input, "Task 1");
  await user.keyboard("{Enter}");
  await user.type(input, "Task 2");
  await user.keyboard("{Enter}");
  await user.type(input, "Task 3");
  await user.keyboard("{Enter}");

  expect(screen.getByText("3 items left")).toBeInTheDocument();

  // Complete Task 1 and Task 3
  await user.click(screen.getByRole("checkbox", { name: "Task 1" }));
  await user.click(screen.getByRole("checkbox", { name: "Task 3" }));
  expect(screen.getByText("1 items left")).toBeInTheDocument();

  // Clear completed
  await user.click(screen.getByRole("button", { name: /clear completed/i }));

  // Only Task 2 remains
  expect(screen.getByDisplayValue("Task 2")).toBeInTheDocument();
  expect(screen.queryByDisplayValue("Task 1")).not.toBeInTheDocument();
  expect(screen.queryByDisplayValue("Task 3")).not.toBeInTheDocument();
  expect(screen.getByText("1 items left")).toBeInTheDocument();
});
```

---

## Key patterns to note

| Pattern | When to use |
|---|---|
| `getBy*` | Element must exist, test fails immediately if not found |
| `queryBy*` | Assert element does NOT exist (returns `null`) |
| `findBy*` | Wait for element to appear (async, useful with lazy loading) |
| `userEvent` over `fireEvent` | More realistic — fires all intermediate events (focus, keydown, input, etc.) |
| `screen` over destructuring render | Cleaner, no need to destructure `{ getByText }` from render |

## Verification

```bash
npm test -- --run TodoApp
```
