export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface RequestParams {
    _limit: number;
    _sort: string;
    _order: string;
    _page: string;
    completed?: string | null;
    userId?: string;
    title_like?: string;
}
