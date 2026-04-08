export interface Todo {
    id: number;
    completed: boolean;
    text: string;
}

export type FilterName = "All" | "Active" | "Completed";
