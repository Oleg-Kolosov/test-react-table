import { RequestParams, Todo } from './types';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const fetchTodos = async ({
    text,
    sortParams,
    orderParams,
    pageParams,
    completedParams,
}: {
    text: string;
    sortParams: string;
    orderParams: string;
    pageParams: string;
    completedParams?: string | null;
}) => {
    const params: RequestParams = {
        _limit: 15,
        _sort: sortParams,
        _order: orderParams,
        _page: pageParams,
    };

    if (completedParams !== null) {
        params.completed = completedParams;
    }

    if (text !== '') {
        if (!isNaN(Number(text))) {
            params.userId = text;
        } else {
            params.title_like = text;
        }
    }

    const response = await api.get<Todo[]>('todos', { params });

    return response;
};
