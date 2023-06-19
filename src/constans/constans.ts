const QUERY_PARAMS = {
    SORT: 'sort',
    ORDER: 'order',
    PAGE: 'page',
    COMPLETED: 'completed',
    TITLE: 'title',
    USER_ID: 'userId',
};

const DEFAULT_PAGE = '1';
const DEFAULT_ORDER = 'asc';
const SORT_TITLE = 'title';

const COLUMNS_IDS = {
    ID: 'Id',
    NAME: 'Name',
    TITLE: 'Title',
    COMPLETED: 'Completed',
};
const { ID, NAME, TITLE, COMPLETED } = COLUMNS_IDS;

const COLUMNS = [ID, NAME, TITLE, COMPLETED];

export { QUERY_PARAMS, DEFAULT_PAGE, COLUMNS, DEFAULT_ORDER, SORT_TITLE };
