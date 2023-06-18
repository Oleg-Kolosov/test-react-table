export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface RequestParams {
    sort: string;
    order: string;
    page: string;
    completed?: string | null;
}
