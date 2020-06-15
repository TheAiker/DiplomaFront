import cx from 'classnames';
import React, { ReactNode } from 'react';
import './button.styles';

export type TButtonProps = {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
};

export function Button(props: TButtonProps): JSX.Element {
    const { children, className, disabled, onClick } = props;

    return (
        <button
            className={cx('button', { 'button--disabled': disabled }, className)}
            disabled={disabled}
            onClick={onClick}
        >{children}</button>
    );
}
