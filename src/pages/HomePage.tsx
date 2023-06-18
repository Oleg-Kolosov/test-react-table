import { useCallback } from 'react';
import { CustomSelect } from '../components/CustomSelect';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { useQuery } from 'react-query';
import { fetchTodos } from '../services/jsonPlaceholderApi';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { completedOptions, orderOptions, sortOptions } from '../options/options';

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortParams = searchParams.get('sort') || 'title';
    const orderParams = searchParams.get('order') || 'asc';
    const pageParams = searchParams.get('page') || '1';
    const completedParams = searchParams.get('completed') || null;

    const { data } = useQuery(
        ['todos', sortParams, orderParams, pageParams, completedParams],
        () => fetchTodos({ sortParams, orderParams, pageParams, completedParams }),
        {
            keepPreviousData: true,
        }
    );

    const handleCompleted = useCallback(
        (completed: boolean | null) => {
            const params: URLSearchParamsInit = { page: '1', sort: sortParams, order: orderParams };

            if (completed !== null) {
                params.completed = String(completed);
            }
            setSearchParams(params);
        },
        [setSearchParams, orderParams, sortParams]
    );

    const handleSort = useCallback(
        (sort: string) => {
            const params: URLSearchParamsInit = { page: '1', sort, order: orderParams };

            if (completedParams) {
                params.completed = completedParams;
            }

            setSearchParams(params);
        },
        [setSearchParams, orderParams, completedParams]
    );

    const handleOrder = useCallback(
        (order: string) => {
            const params: URLSearchParamsInit = { page: '1', sort: sortParams, order };

            if (completedParams) {
                params.completed = completedParams;
            }

            setSearchParams(params);
        },
        [setSearchParams, sortParams, completedParams]
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

            setSearchParams(params);
        },
        [setSearchParams, sortParams, orderParams, completedParams]
    );

    return (
        <div className="max-w-2xl p-5 gap-3 flex items-center flex-col mx-auto">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="id or title" />
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
