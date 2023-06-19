import { RequestParams, RequestQueryParams, Todo } from './types';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const fetchTodos = async ({
    titleParams = '',
    userIdParams = '',
    sortParams,
    orderParams,
    pageParams,
    completedParams,
}: RequestParams) => {
    const { completed = null, ...rest } = {
        completed: completedParams,
        ...(userIdParams !== '' && !isNaN(Number(userIdParams)) && { userId: userIdParams }),
        ...(titleParams !== '' && isNaN(Number(titleParams)) && { title_like: titleParams }),
    };

    const params: RequestQueryParams = {
        _limit: 15,
        _sort: sortParams,
        _order: orderParams,
        _page: pageParams,
        ...(completed !== null && { completed }),
        ...rest,
    };

    const response = await api.get<Todo[]>('todos', { params });

    return response;
};
