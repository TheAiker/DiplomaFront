import { LayoutHeader } from 'core/components/layout-header';
import React, { ReactNode } from 'react';
import './layout-full.styles';
import { LayoutFooter } from '../layout-footer';

const bannerImg = require('assets/images/banner.png');

export type TLayoutFullProps = {
    children: ReactNode;
    withBanner?: boolean;
};

export function LayoutFull(props: TLayoutFullProps): JSX.Element {
    const { children, withBanner } = props;

    return (
        <div className="layout-full">
            <LayoutHeader />

            {withBanner ? (
                <>
                    <div className="layout-full__banner">
                        <img className="layout-full__banner-image" src={bannerImg} alt="Banner"/>
                    </div>

                    <div className="layout-full__divider"></div>
                </>
            ) : <></>}

            <div className="layout-full__wrapper">
                {children}
            </div>

            <LayoutFooter />
        </div>
    );
}
