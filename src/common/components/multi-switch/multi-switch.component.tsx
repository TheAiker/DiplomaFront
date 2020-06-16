import cx from 'classnames';
import React, { useCallback, useState } from 'react';
import './multi-switch.styles';

type TMultiSwitchBaseItem<K extends string | number> = {
    key: K;
    label: string;
};

type TMultiSwitchItemWithValue<T, K extends string | number> = TMultiSwitchBaseItem<K> & {
    value: T;
};

export type TMultiSwitchItem<T, K extends string | number> = T extends void ? TMultiSwitchBaseItem<K> : TMultiSwitchItemWithValue<T, K>

export type TMultiSwitchProps<T, K extends string | number> = {
    className?: string;
    items: Array<TMultiSwitchItem<T, K>>;
    onSelect?: (item: TMultiSwitchItem<T, K>) => void;
    selectedKey?: K;
};

export function MultiSwitch<T, K extends string | number>(props: TMultiSwitchProps<T, K>): JSX.Element {
    const { className, items, onSelect, selectedKey } = props;
    const [selection, setSelection] = useState<K>(items[0].key);

    const onSwitchSelectClickHandler = useCallback((item: TMultiSwitchItem<T, K>) => {
        setSelection(() => item.key);

        if (onSelect) {
            onSelect(item);
        }
    }, [onSelect]);

    return (
        <div className={cx('multi-switch', className)}>
            {items.map((item: TMultiSwitchItem<T, K>) => (
                <MultiSwitchItem
                    item={item}
                    isSelected={item.key === (selectedKey || selection)}
                    onSelect={onSwitchSelectClickHandler}
                />
            ))}
        </div>
    );
}

type TMultiSwitchItemProps<T, K extends string | number> = {
    item: TMultiSwitchItem<T, K>;
    isSelected: boolean;
    onSelect: (item: TMultiSwitchItem<T, K>) => void;
};

function MultiSwitchItem<T, K extends string | number>(props: TMultiSwitchItemProps<T, K>): JSX.Element {
    const { item, isSelected, onSelect } = props;

    const onItemClickHandler = useCallback(() => {
        onSelect(item);
    }, [item]);

    return (
        <div className={cx('multi-switch__item', { 'multi-switch__item--selected': isSelected })} onClick={onItemClickHandler} tabIndex={0}>
            {item.label}
        </div>
    );
}
