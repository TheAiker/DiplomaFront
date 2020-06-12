import cx from 'classnames';
import React, { ReactNode } from 'react';
import './button.styles';

export type TButtonProps = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
};

export function Button(props: TButtonProps): JSX.Element {
    const { children, className, onClick } = props;

    return (
        <button className={cx('button', className)} onClick={onClick}>{children}</button>
    );
}
