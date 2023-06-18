import Select, { SingleValue } from 'react-select';

interface CustomSelectProps {
    options: any[];
    isMulti?: boolean;
    isSearchable?: boolean;
    onChange: (order: any) => void;
    defaultValue?: any;
}

export const CustomSelect = ({
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
};
