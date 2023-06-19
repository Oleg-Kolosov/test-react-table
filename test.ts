const params = useMemo(
    () => ({ page: '1', sort: sortParams, order: orderParams, completed: completedParams }),
    [sortParams, orderParams, completedParams]
);

const handleCompleted = useCallback(
    completed => {
        setSearchParams({
            ...params,
            completed: completed !== null ? String(completed) : undefined,
        });
    },
    [setSearchParams, params]
);

const handleSort = useCallback(
    sort => {
        setSearchParams({ ...params, sort });
    },
    [setSearchParams, params]
);

const handleOrder = useCallback(
    order => {
        setSearchParams({ ...params, order });
    },
    [setSearchParams, params]
);

const handlePage = useCallback(
    page => {
        setSearchParams({ ...params, page });
    },
    [setSearchParams, params]
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
