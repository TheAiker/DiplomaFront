import React, { FormEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import './select-field.styles';

export type TSelectItem<T> = {
    id: string;
    label: string;
    value: T;
};

export type TSelectFieldProps<T> = {
    items: Array<TSelectItem<T>>;
    label?: string;
    name?: string;
    onSelect: (value: T) => void
};

export function SelectField<T>(props: TSelectFieldProps<T>): JSX.Element {
    const { items, label, name, onSelect } = props;

    const onSelectHandler = useCallback((event: FormEvent<HTMLSelectElement>) => {
        const selectedId = event.currentTarget.value;
        const selectedItem = items.find((item: TSelectItem<T>) => item.id === selectedId);

        if (!selectedItem) {
            toast(`Не удалость найти выбранный item для поля '${name}'`, { type: 'error' });
            return;
        }

        onSelect(selectedItem.value);
    }, [items]);

    return (
        <div className="select-field">
            {label ? <div className="select-field__label">{label}</div> : <></>}

            <select className="select-field__input" name={name} onChange={onSelectHandler}>
                {items.map((item: TSelectItem<T>) => (
                    <option className="select-field__item" key={item.id} value={item.id}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}
