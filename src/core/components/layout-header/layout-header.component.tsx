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
                <span className="layout-header__title">Just an <span>OK</span> shop</span>

                <div className="layout-header__link-group">
                    <NavLink activeClassName="layout-header__link--active" className="layout-header__link" to="/products">Продукты</NavLink>
                    <NavLink activeClassName="layout-header__link--active" className="layout-header__link" to="/about-us">О нас</NavLink>
                    <NavLink activeClassName="layout-header__link--active" className="layout-header__link" to="/admin">Админка</NavLink>
                </div>

                <div className="layout-header__shopping-cart">
                    <NavLink className="layout-header__shopping-cart-link" key={Math.random()} to="/shopping-cart">
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
