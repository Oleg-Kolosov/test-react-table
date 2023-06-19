import { ChangeEvent, useCallback, useMemo } from 'react';
import { CustomSelect } from '../components/CustomSelect';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { useQuery } from 'react-query';
import { fetchTodos } from '../services/jsonPlaceholderApi';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { completedOptions, orderOptions, sortOptions } from '../options/options';
import { Input } from '../components/Input';
import { useInput } from '../hooks/useInput';

export const HomePage = () => {
    const searchInput = useInput();
    const searchValue = searchInput.value;
    const [searchParams, setSearchParams] = useSearchParams();
    const sortParams = searchParams.get('sort') || 'title';
    const orderParams = searchParams.get('order') || 'asc';
    const pageParams = searchParams.get('page') || '1';
    const completedParams = searchParams.get('completed') || null;
    const titleParams = searchParams.get('title') || '';
    const userIdParams = searchParams.get('userId') || '';

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

    const handleSearchValue = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            searchInput.onChange(event);

            const params: URLSearchParamsInit = {
                page: '1',
                sort: sortParams,
                order: orderParams,
            };
            if (completedParams) {
                params.completed = completedParams;
            }
            if (event.target.value !== '') {
                if (!isNaN(Number(event.target.value))) {
                    params.userId = event.target.value;
                } else {
                    params.title = event.target.value;
                }
            }

            setSearchParams(params);
        },
        [completedParams, orderParams, searchInput, setSearchParams, sortParams]
    );

    const handleCompleted = useCallback(
        (completed: boolean | null) => {
            const params: URLSearchParamsInit = { page: '1', sort: sortParams, order: orderParams };

            if (completed !== null) {
                params.completed = String(completed);
            }

            if (searchValue !== '') {
                if (!isNaN(Number(searchValue))) {
                    params.userId = searchValue;
                } else {
                    params.title = searchValue;
                }
            }
            setSearchParams(params);
        },
        [setSearchParams, orderParams, sortParams, searchValue]
    );

    const handleSort = useCallback(
        (sort: string) => {
            const params: URLSearchParamsInit = { page: '1', sort, order: orderParams };

            if (completedParams) {
                params.completed = completedParams;
            }
            if (searchValue !== '') {
                if (!isNaN(Number(searchValue))) {
                    params.userId = searchValue;
                } else {
                    params.title = searchValue;
                }
            }

            setSearchParams(params);
        },
        [orderParams, completedParams, searchValue, setSearchParams]
    );

    const handleOrder = useCallback(
        (order: string) => {
            const params: URLSearchParamsInit = { page: '1', sort: sortParams, order };

            if (completedParams) {
                params.completed = completedParams;
            }
            if (searchValue !== '') {
                if (!isNaN(Number(searchValue))) {
                    params.userId = searchValue;
                } else {
                    params.title = searchValue;
                }
            }

            setSearchParams(params);
        },
        [sortParams, completedParams, searchValue, setSearchParams]
    );

    const handlePage = useCallback(
        (page: string) => {
            const params: URLSearchParamsInit = {
                page,
                sort: sortParams,
                order: orderParams,
            };

            if (completedParams) {
                params.completed = completedParams;
            }
            if (searchValue !== '') {
                if (!isNaN(Number(searchValue))) {
                    params.userId = searchValue;
                } else {
                    params.title = searchValue;
                }
            }

            setSearchParams(params);
        },
        [sortParams, orderParams, completedParams, searchValue, setSearchParams]
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
                    options={orderOptions}
                    onChange={handleOrder}
                    defaultValue={orderParams}
                />
                <CustomSelect
                    options={completedOptions}
                    onChange={handleCompleted}
                    defaultValue={completedParams}
                />
                <CustomSelect
                    options={sortOptions}
                    onChange={handleSort}
                    defaultValue={sortParams}
                />
            </div>

            <Table columns={['Id', 'Name', 'Title', 'Completed']} items={data?.data} />
            <Pagination
                current={pageParams}
                total={data?.headers['x-total-count']}
                pageSize={15}
                onClick={handlePage}
            />
        </div>
    );
};
