import { LayoutHeader } from 'core/components/layout-header';
import React, { ReactNode } from 'react';
import './layout-full.styles';
import { LayoutFooter } from '../layout-footer';

const bannerImg = require('assets/images/banner.png');

export type TLayoutFullProps = {
    children: ReactNode;
};

export function LayoutFull(props: TLayoutFullProps): JSX.Element {
    const { children } = props;

    return (
        <div className="layout-full">
            <LayoutHeader />

            <div className="layout-full__banner">
                <img className="layout-full__banner-image" src={bannerImg} alt="Banner"/>
            </div>

            <div className="layout-full__divider"></div>

            <div className="layout-full__wrapper">
                {children}
            </div>

            <LayoutFooter />
        </div>
    );
}
