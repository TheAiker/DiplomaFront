import cx from 'classnames';
import React, { ChangeEvent, FormEvent, useCallback } from 'react';
import './text-field.styles';

export type TTextFieldProps = {
    className?: string;
    cols?: number;
    label?: string;
    name: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    textArea?: boolean;
    type?: 'text' | 'search';
    value?: string;
};

export function TextField(props: TTextFieldProps): JSX.Element {
    const { className, cols = 75, label, name, placeholder, onChange, textArea, type = 'text', value } = props;

    const onInputChangeHandler = useCallback((event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(event.currentTarget.value);
        }
    }, []);

    return (
        <div className={cx('text-field', className)}>
            {label ? <div className="text-field__label">{label}</div> : <></>}

            {textArea ? (
                <textarea
                    className="text-field__input"
                    cols={cols}
                    name={name}
                    placeholder={placeholder}
                    onChange={onInputChangeHandler}
                    value={value}
                />
            ) : (
                <input
                    className="text-field__input"
                    name={name}
                    placeholder={placeholder}
                    onChange={onInputChangeHandler}
                    type={type}
                    value={value}
                />
            )}
        </div>
    );
}
