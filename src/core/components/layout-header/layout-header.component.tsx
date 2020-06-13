import { ShoppingCartIcon } from 'common/components';
import { shoppingListService, TShoppingItem } from 'common/services';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useObservable } from 'utils';
import './layout-header.styles';

export function LayoutHeader(): JSX.Element {
    const cartItems = useObservable(shoppingListService.contents$, []);

    return (
        <div className="layout-header">
            <div className="layout-header__wrapper">
                <div className="layout-header__title">
                    <NavLink activeClassName="layout-header__link--active" className="layout-header__link layout-header__link--title" to="/products">
                        <span className="layout-header__title-label">Just an <span>OK</span> shop</span>
                    </NavLink>
                </div>

                <div className="layout-header__link-group">
                    <NavLink activeClassName="layout-header__link--active" className="layout-header__link" to="/products">Продукты</NavLink>
                    <NavLink activeClassName="layout-header__link--active" className="layout-header__link" to="/about-us">О нас</NavLink>
                </div>

                <div className="layout-header__shopping-cart">
                    <NavLink activeClassName="layout-header__link--active" className="layout-header__link" to="/shopping-cart">
                        <ShoppingCartIcon />

                        <div className="layout-header__shopping-cart-nudge">
                            {cartItems.length}
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
