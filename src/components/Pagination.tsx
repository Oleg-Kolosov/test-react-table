import { memo } from 'react';

interface PaginationProps {
    current: string;
    total: string;
    pageSize: number;
    onClick: (page: string) => void;
}

export const Pagination = memo(({ current, total, pageSize, onClick }: PaginationProps) => {
    if (+total === 0) {
        return;
    }
    return (
        <ul className="flex gap-2 flex-wrap">
            {Array.from({ length: Math.ceil(+total / pageSize) }, (_, i) => i + 1).map(i => {
                return (
                    <li key={i}>
                        <button
                            onClick={() => onClick(String(i))}
                            className={`inline-flex items-center px-2 py-1 text-xs md:text-base font-semibold border rounded-sm transition hover:bg-blue-500 hover:text-white hover:ease-in ${
                                i === +current && 'bg-blue-600 text-white'
                            }`}
                        >
                            {i}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
});
