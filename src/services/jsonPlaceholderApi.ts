import { RequestParams, RequestQueryParams, Todo } from './types';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const fetchTodos = async ({
    titleParams,
    userIdParams,
    sortParams,
    orderParams,
    pageParams,
    completedParams,
}: RequestParams) => {
    const params: RequestQueryParams = {
        _limit: 15,
        _sort: sortParams,
        _order: orderParams,
        _page: pageParams,
    };

    if (completedParams !== null) {
        params.completed = completedParams;
    }

    if (userIdParams !== '') {
        if (!isNaN(Number(userIdParams))) {
            params.userId = userIdParams;
        }
    }
    if (titleParams !== '') {
        if (isNaN(Number(titleParams))) {
            params.title_like = titleParams;
        }
    }

    const response = await api.get<Todo[]>('todos', { params });

    return response;
};
