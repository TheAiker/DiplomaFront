import { AdminCategories } from 'admin/components/admin-categories';
import { AdminCreateCategory } from 'admin/components/admin-create-category';
import { AdminCreateProduct } from 'admin/components/admin-create-product';
import { AdminLogin } from 'admin/components/admin-login';
import { AdminProducts } from 'admin/components/admin-products';
import { adminAuthService } from 'admin/services';
import { LayoutFull } from 'core/components/layout-full';
import React, { useCallback, useState } from 'react';
import './admin-page.styles';

export function AdminPage(): JSX.Element {
    const [hasAuthorized, setHasAuthorized] = useState<boolean>(adminAuthService.isAuthorized);

    const onAuthorizationSuccessHandler = useCallback(() => {
        setHasAuthorized(() => true);
    }, []);

    return hasAuthorized ? (
        <div>
            <div className="admin-page__wrapper">
                <AdminCreateCategory />
                <AdminCreateProduct />
            </div>

            <div className="admin-page__wrapper">
                <AdminCategories />
                <AdminProducts />
            </div>
        </div>
    ) : (
        <div className="admin-page__wrapper">
            <AdminLogin onSuccess={onAuthorizationSuccessHandler} />
        </div>
    );
}
