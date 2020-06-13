import { AdminPage } from 'admin/components/admin-page';
import { AboutUsPage } from 'core/components/about-us-page';
import { LayoutFull } from 'core/components/layout-full';
import { ProductsPage } from 'products/components/products-page';
import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ShoppingCartPage } from 'shopping-cart/components/shopping-cart-page';

export function App(): JSX.Element {
    return (
        <>
            <HashRouter>
                <LayoutFull>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/products" />
                        </Route>

                        <Route path="/about-us" component={AboutUsPage} />
                        <Route path="/admin" component={AdminPage} />
                        <Route path="/products" component={ProductsPage} />
                        <Route path="/shopping-cart" component={ShoppingCartPage} />
                    </Switch>
                </LayoutFull>
            </HashRouter>

            <ToastContainer
                autoClose={3000}
                hideProgressBar
                newestOnTop
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                position="bottom-right"
            />
        </>
    );
}
