import { SocialFacebookIcon, SocialInstagramIcon, SocialVKIcon } from 'common/components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout-footer.styles';

export function LayoutFooter(): JSX.Element {
    return (
        <div className="layout-footer">
            <div className="layout-footer__wrapper">
                <div className="layout-footer__contacts">
                        Контактный телефон:
                        <br/>
                        0 777 77777 "Placeholder"
                        <br/>
                        0 777 77777 "Placeholder"
                        <br/>


                </div>
                <div className="layout-footer__external-links">
                    <a className="layout-footer__external-link layout-footer__external-link--vk" href="https://vk.com/">
                        <SocialVKIcon />
                    </a>

                    <a className="layout-footer__external-link layout-footer__external-link--ig" href="https://instagram.com/">
                        <SocialInstagramIcon />
                    </a>

                    <a className="layout-footer__external-link layout-footer__external-link--fb" href="https://facebook.com/">
                        <SocialFacebookIcon />
                    </a>
                </div>
            </div>
        </div>

    );
}
