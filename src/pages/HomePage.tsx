/* eslint-disable react-refresh/only-export-components */
import { ChangeEvent, memo, useCallback } from 'react';
import { CustomSelect } from '../components/CustomSelect';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { useQuery } from 'react-query';
import { fetchTodos } from '../services/jsonPlaceholderApi';
import { useSearchParams } from 'react-router-dom';
import { ORDER_OPTIONS, SORT_OPTIONS, COMPLETED_OPTIONS } from '../constans/options';
import { Input } from '../components/Input';
import { useInput } from '../hooks/useInput';
import {
    COLUMNS,
    DEFAULT_ORDER,
    DEFAULT_PAGE,
    QUERY_PARAMS,
    SORT_TITLE,
} from '../constans/constans';

const { SORT, ORDER, PAGE, COMPLETED, TITLE, USER_ID } = QUERY_PARAMS;

const HomePage = () => {
    const searchInput = useInput();
    const searchValue = searchInput.value;
    const [searchParams, setSearchParams] = useSearchParams();
    const sortParams = searchParams.get(SORT) || SORT_TITLE;
    const orderParams = searchParams.get(ORDER) || DEFAULT_ORDER;
    const pageParams = searchParams.get(PAGE) || DEFAULT_PAGE;
    const completedParams = searchParams.get(COMPLETED) || null;
    const titleParams = searchParams.get(TITLE) || '';
    const userIdParams = searchParams.get(USER_ID) || '';

    const { data } = useQuery(
        [
            'todos',
            searchValue,
            sortParams,
            orderParams,
            pageParams,
            completedParams,
            titleParams,
            userIdParams,
        ],
        () =>
            fetchTodos({
                titleParams,
                userIdParams,
                sortParams,
                orderParams,
                pageParams,
                completedParams,
            }),
        {
            keepPreviousData: true,
            staleTime: 5000,
        }
    );

    const { data: response, headers = {} } = data || {};
    const total = (headers['x-total-count'] as string) || 0;

    const handleSearchValue = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            searchInput.onChange(event);
            const value = event.target.value;

            const params = new URLSearchParams(searchParams);
            params.set(PAGE, DEFAULT_PAGE);

            if (value) {
                if (!isNaN(Number(value))) {
                    params.set(USER_ID, value);
                } else {
                    params.set(TITLE, value);
                }
            } else {
                params.delete(USER_ID);
                params.delete(TITLE);
            }

            setSearchParams(params);
        },
        [searchInput, searchParams, setSearchParams]
    );

    const handleCompleted = useCallback(
        (completed: boolean | null) => {
            const params = new URLSearchParams(searchParams);
            params.set(PAGE, DEFAULT_PAGE);

            if (completed !== null) {
                params.set(COMPLETED, String(completed));
            } else {
                params.delete(COMPLETED);
            }

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    const handleSort = useCallback(
        (sort: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(PAGE, DEFAULT_PAGE);
            params.set(SORT, sort);

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    const handleOrder = useCallback(
        (order: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(PAGE, DEFAULT_PAGE);
            params.set(ORDER, order);

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    const handlePage = useCallback(
        (page: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(PAGE, page);

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    return (
        <div className="max-w-2xl p-5 gap-3 flex items-center flex-col mx-auto">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                    type="text"
                    placeholder="id or title"
                    onChange={handleSearchValue}
                    value={searchValue}
                />
                <CustomSelect
                    options={ORDER_OPTIONS}
                    onChange={handleOrder}
                    defaultValue={orderParams}
                />
                <CustomSelect
                    options={COMPLETED_OPTIONS}
                    onChange={handleCompleted}
                    defaultValue={completedParams}
                />
                <CustomSelect
                    options={SORT_OPTIONS}
                    onChange={handleSort}
                    defaultValue={sortParams}
                />
            </div>
            <Table columns={COLUMNS} items={response} />
            <Pagination current={pageParams} total={total} pageSize={15} onClick={handlePage} />
        </div>
    );
};

export default memo(HomePage);
