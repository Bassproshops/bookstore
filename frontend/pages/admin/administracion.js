import React, { useEffect, useState } from 'react'
import userA from '../../axios/UsersAxios';
import ProductsTable from '../../helpers/components/ProductsTable';
import CategoriesTable from '../../helpers/components/CategoriesTable';

const Administracion = ({ user, SetUser }) => {

    const [categoriesTab, SetCategiesTab] = useState(true);

    useEffect(() => {
        userA.getUser(SetUser);
    }, [])
    return (

        user && user.is_staff &&
        <div className="mt container">

            <div className="tab-toggler">
                <span className={categoriesTab ? "tab tab-active" : "tab"} onClick={() => SetCategiesTab(true)}>Categorías</span>
                <span className={categoriesTab ? "tab" : "tab tab-active"} onClick={() => SetCategiesTab(false)}>Productos</span>
            </div>

            {
                categoriesTab ?
                    <CategoriesTable />
                    :
                    <ProductsTable />
            }

        </div>

    )
}

export default Administracion
