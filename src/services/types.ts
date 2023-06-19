interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface RequestQueryParams {
    _limit: number;
    _sort: string;
    _order: string;
    _page: string;
    completed?: string | null;
    userId?: string;
    title_like?: string;
}

interface RequestParams {
    titleParams: string;
    userIdParams: string;
    sortParams: string;
    orderParams: string;
    pageParams: string;
    completedParams: string | null;
}

export type { Todo, RequestQueryParams, RequestParams };
