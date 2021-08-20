import React, { useEffect, useState } from 'react'
import axios from '../../axios/ProductsAxios';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import { FaTimes, FaFilter } from 'react-icons/fa';

const ProductsListComponent = ({ category }) => {

    const [products, SetProducts] = useState({});

    const [page, SetPage] = useState(1);
    const [maxPrice, SetMaxPrice] = useState('');
    const [minPrice, SetMinPrice] = useState('');
    const [ordering, SetOrdering] = useState('-popularity');
    const [promotionFilter, SetPromotionFilter] = useState(false);
    const [displayFilters, SetDisplayFilters] = useState(false);

    const [priceTag, SetPriceTag] = useState(false);

    useEffect(() => {
        SetPage(1);
    }, [category])

    const router = useRouter();

    useEffect(() => {

        if (category) {
            axios.listProducts(SetProducts, page, maxPrice, minPrice, false, ordering, promotionFilter, category.id);

        }
    }, [page, category, router.asPath])


    function handlePriceChange(e) {
        SetPage(1);
        e.preventDefault();
        SetDisplayFilters(false);
        SetPriceTag(true);
        if (minPrice.trim() === '' || maxPrice.trim() === '') {
            SetMinPrice('');
            SetMaxPrice('');
            SetPriceTag(false)
        }
        axios.listProducts(SetProducts, 1, maxPrice, minPrice, false, ordering, promotionFilter, category ? category.id : false);

    }

    function handlePriceFilterDelete(e) {
        SetPage(1);
        SetPriceTag(false);
        SetDisplayFilters(false);
        SetMinPrice('');
        SetMaxPrice('');
        axios.listProducts(SetProducts, 1, '', '', false, ordering, promotionFilter, category ? category.id : false);

    }

    function changeInOrder(e) {
        SetPage(1);
        SetOrdering(e.target.value);
        SetDisplayFilters(false);
        axios.listProducts(SetProducts, 1, maxPrice, minPrice, false, e.target.value, promotionFilter, category ? category.id : false);
    }

    function handlePromotionChange(e) {
        axios.listProducts(SetProducts, 1, maxPrice, minPrice, false, ordering, !promotionFilter, category ? category.id : false);
        SetPromotionFilter(!promotionFilter);
        SetPage(1);
        SetDisplayFilters(false);

    }

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) {
            function cancelForm(e) {
                const next = document.querySelector('#__next');
                if (e.target.classList.contains('search-bar-container') || e.target.classList.contains('navbar-search') || e.target.classList.contains('product-cont') || e.target.classList.contains('logo-cont') || e.target.classList.contains('search-bar-wrapper') || e.target.classList.contains('search-bar') || e.target === next) {
                    SetDisplayFilters(false);
                }

            }
            if (displayFilters) {
                body.style.overflowY = 'hidden';

                body.addEventListener('click', cancelForm)
            } else if (!displayFilters) {
                body.style.overflowY = 'auto';
                body.removeEventListener('click', cancelForm)

            }
        }
    }, [displayFilters])


    const pages = Math.ceil(products.count / 30)
    return (
        <div className="container separate product-cont">
            <h3 className="align-svg toggle-filters" onClick={() => SetDisplayFilters(!displayFilters)}>
                <span className="txt">Filtros</span>
                <span className="svg"><FaFilter /></span>
            </h3>
            <div className="products-list-container">

                <div className={displayFilters ? "filters display-filters" : "filters"}>
                    <FaTimes className="cancel-filters" onClick={() => SetDisplayFilters(false)} />

                    {
                        category && <h2 className="search-result-filters">Categoría: "{category.name}"</h2>
                    }

                    <h2 className="filter-header">Precio</h2>

                    <form className="filter-price" onSubmit={handlePriceChange}>

                        <input placeholder="Mínimo" className="min price-filter-inputs" value={minPrice} type="number" max={maxPrice} onChange={e => SetMinPrice(e.target.value)} />
                        <input placeholder="Máximo" className="max price-filter-inputs" value={maxPrice} type="number" min={minPrice} onChange={e => SetMaxPrice(e.target.value)} />
                        {priceTag &&
                            <span className="filter-delete-tag align-svg">
                                <span className="cancel-btn svg" onClick={handlePriceFilterDelete}><FaTimes /></span>
                                <span className="delete-tag-txt txt">Eliminar Filtro</span>
                            </span>}
                        <button type="submit" className="btn btn-success submit-filter">Aceptar</button>
                    </form>

                    <h2 className="filter-header">Orden</h2>
                    <div className="form-control">
                        <select id="estado" className="order-filter-select" onChange={changeInOrder}>
                            <option value="-popularity">Más Destacados</option>
                            <option value="-price">Precio: de más alto a más bajo</option>
                            <option value="price">Precio: de más bajo a más alto</option>
                            <option value="-created_at">Lo más Nuevo</option>
                        </select>
                    </div>

                    <h2 className="filter-header">Promociones</h2>
                    <div className="promotions-checkbox align-svg" onClick={handlePromotionChange}>
                        <span className="svg">
                            {
                                !promotionFilter ?
                                    <ImCheckboxUnchecked />
                                    :
                                    <ImCheckboxChecked />
                            }
                        </span>
                        <h3 className="label-for-checkbox txt">Promociones</h3>
                    </div>

                </div>

                <div className="products-list">
                    {
                        products.results && products['results'].length > 0 ?
                            products['results'].map(product => {
                                return (
                                    <Link href={`/producto/${product.slug}/`} key={product.id}>
                                        <div className="product-item">
                                            <div className="product-item-img">
                                                <img src={product.image}  alt="Vista Previa del producto"/>
                                            </div>
                                            <div className="product-item-content">
                                                <h3 className="product-header">{product.name}</h3>
                                                <p className="price">
                                                    ${product.deal ? product.special_price : `${product.price}`}
                                                </p>
                                                {
                                                    product.deal &&
                                                    <p className="old-price">${product.price}</p>
                                                }

                                                {product.stock === 0 &&
                                                    <p className="no-stock">Agotado</p>
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                            :
                            <h3 className="product-header not-found-any">No hemos encontrado ningún producto que coincida con tus parametros.</h3>
                    }
                </div>
            </div>
            <div className="pagination product-pags">
                {
                    products.previous &&

                    <p className="pagination-element" onClick={() => SetPage(page - 1)}>{'<<'}</p>

                }

                {
                    page - 2 > 0 &&
                    <p className="pagination-element" onClick={() => SetPage(page - 2)}>{page - 2}</p>
                }

                {
                    page - 1 > 0 &&

                    <p className="pagination-element" onClick={() => SetPage(page - 1)}>{page - 1}</p>

                }
                <p className="pagination-element selected-page">{page}</p>

                {
                    page + 1 <= pages &&
                    <p className="pagination-element" onClick={() => SetPage(page + 1)}>{page + 1}</p>
                }

                {
                    page + 2 <= pages &&
                    <p className="pagination-element" onClick={() => SetPage(page + 2)}>{page + 2}</p>
                }

                {
                    products.next &&
                    <p className="pagination-element" onClick={() => SetPage(page + 1)}>{'>>'}</p>
                }

            </div>
        </div>
    )
}

export default ProductsListComponent
