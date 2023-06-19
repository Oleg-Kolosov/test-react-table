import { ChangeEvent, memo, useCallback } from 'react';
import { CustomSelect } from '../components/CustomSelect';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { useQuery } from 'react-query';
import { fetchTodos } from '../services/jsonPlaceholderApi';
import { useSearchParams } from 'react-router-dom';
import { completedOptions, orderOptions, sortOptions } from '../options/options';
import { Input } from '../components/Input';
import { useInput } from '../hooks/useInput';

export const HomePage = memo(() => {
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

            const params = new URLSearchParams(searchParams);
            params.set('page', '1');

            if (event.target.value !== '') {
                if (!isNaN(Number(event.target.value))) {
                    params.set('userId', event.target.value);
                } else {
                    params.set('title', event.target.value);
                }
            } else {
                params.delete('userId');
                params.delete('title');
            }

            setSearchParams(params);
        },
        [searchInput, searchParams, setSearchParams]
    );

    const handleCompleted = useCallback(
        (completed: boolean | null) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1');

            if (completed !== null) {
                params.set('completed', String(completed));
            } else {
                params.delete('completed');
            }

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    const handleSort = useCallback(
        (sort: string) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1');
            params.set('sort', sort);

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    const handleOrder = useCallback(
        (order: string) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1');
            params.set('order', order);

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    const handlePage = useCallback(
        (page: string) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', page);

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
});
