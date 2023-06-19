import { Todo } from '../services/types';
import { truncateString } from '../helpers/truncatString';
import { memo } from 'react';

interface TableProps {
    columns: string[];
    items: Todo[] | undefined;
}

export const Table = memo(({ columns, items }: TableProps) => {
    return (
        <table className="grid grid-cols-1 w-full border-collapse border border-slate-300">
            <thead>
                <tr className="grid grid-cols-[50px_60px_4fr_100px] text-xs md:text-base">
                    {columns.map(column => (
                        <th key={column} className="p-1 border border-slate-300 ">
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items?.map(({ id, userId, title, completed }) => {
                    return (
                        <tr
                            className="grid grid-cols-[50px_60px_4fr_100px] text-xs md:text-base"
                            key={id}
                        >
                            <td className="p-1 border border-slate-300">{id}</td>
                            <td className="p-1 border border-slate-300">{userId}</td>
                            <td className="p-1 border border-slate-300" title={title}>
                                {truncateString(title, 50)}
                            </td>
                            <td className="p-1 border border-slate-300">{String(completed)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
});
