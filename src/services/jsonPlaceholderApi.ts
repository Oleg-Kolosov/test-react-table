import { Todo } from './types';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const fetchTodos = async ({
    sortParams,
    orderParams,
    pageParams,
    completedParams,
}: {
    sortParams: string;
    orderParams: string;
    pageParams: string;
    completedParams?: string | null;
}) => {
    const params: any = {
        _limit: 15,
        _sort: sortParams,
        _order: orderParams,
        _page: pageParams,
    };

    if (typeof completedParams === 'string') {
        params.completed = completedParams;
    }

    // if (searchValue !== '') {
    //     if (!isNaN(Number(searchValue))) {
    //         params.userId = searchValue;
    //     } else {
    //         params.title = searchValue;
    //     }
    // }

    const response = await api.get<Todo[]>('todos', { params });

    return response;
};
