import { memo } from 'react';
import Select, { SingleValue } from 'react-select';

interface CustomSelectProps {
    options: any[];
    isMulti?: boolean;
    isSearchable?: boolean;
    onChange: (value: any) => void;
    defaultValue?: string | null;
}

export const CustomSelect = memo(
    ({
        options,
        isMulti = false,
        isSearchable = false,
        onChange,
        defaultValue,
    }: CustomSelectProps) => {
        const getDefaultValue = () => {
            return options.find(option => option.value === defaultValue);
        };

        const handleSelect = (option: SingleValue<(typeof options)[0]>) => {
            onChange(option.value);
        };

        return (
            <Select
                options={options}
                isMulti={isMulti}
                isSearchable={isSearchable}
                onChange={handleSelect}
                defaultValue={getDefaultValue()}
            />
        );
    }
);
