import { AdminCreateCategory } from 'admin/components/admin-create-category';
import { AdminCreateProduct } from 'admin/components/admin-create-product';
import { LayoutFull } from 'core/components/layout-full';
import React from 'react';
import './admin-page.styles';

export function AdminPage(): JSX.Element {
    return (
        <LayoutFull>
            <div className="admin-page__wrapper">
                <AdminCreateCategory />
                <AdminCreateProduct />
            </div>
        </LayoutFull>
    );
}
