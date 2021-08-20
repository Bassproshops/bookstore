
import React, { useEffect, useState } from 'react'
import axios from '../../axios/ProductsAxios';

import { motion } from 'framer-motion';

import { BiEdit, BiTrash } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import {FcOk, FcCancel} from 'react-icons/fc';

import Swal from 'sweetalert2';
import Popop from '../Popop';
import { useRouter } from 'next/router';

import CreateForm from './admin/products/Create';
import EditForm from './admin/products/Edit';

const ProductsTable = () => {

    const [products, SetProducts] = useState({});

    //?Listint states
    const [page, SetPage] = useState(1);
    const [stockFilter, SetStockFilter] = useState(false);

    //?Crud states
    const [slug, SetSlug] = useState('');
    const [editProduct, SetEditProduct] = useState(false)
    const [createProduct, SetCreateProduct] = useState(false);
    const [search, SetSearch] = useState('');
    const router = useRouter();

    useEffect(() => {
        axios.getProducts(SetProducts, page, stockFilter, SetPage, search);

    }, [page, stockFilter])

    function deleteProduct(id) {
        Swal.fire({
            title: 'Estás seguro',
            text: "No se podran revertir los cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar producto',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.deleteProduct(SetProducts, id, page, stockFilter, SetPage, search)
                    .then(resp => {
                        if (resp) {
                            Swal.fire(
                                'Eliminado',
                                'El producto ha sido eliminada correctamente.',
                                'success'
                            );

                        } else {
                            Swal.fire(
                                'Error',
                                'Hubo un error mientras tratabamos de eliminar el producto, porfavor intenta de nuevo más tarde',
                                'error'
                            )
                        }
                    })
            }
        })
    }

    const pages = Math.ceil(products.count / 30);

    function handleSearch(e) {
        e.preventDefault();
        SetPage(1);

        axios.getProducts(SetProducts, page, stockFilter, SetPage, search);
    }

    async function resetForm(e) {
        e.preventDefault();
        SetPage(1);
        SetSearch('');
        await axios.getProducts(SetProducts, page, stockFilter, SetPage, '');
    }

    return (
        <motion.div initial={{ opacity: 0, x: 300 }} exit={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .4 }}>


            <h2 className="admin-header">Productos</h2>

            <button className="btn btn-success create-btn" onClick={() => {
                const body = document.querySelector('body');
                if (body) {
                    body.style.overflowY = 'hidden';
                }

                SetCreateProduct(true)
            }}>Crear Producto +</button>

            <label htmlFor="stock" id="label-for-stock">Mostrar Productos Agotados</label>
            <input type="checkbox" id="stock" onChange={e => {
                SetPage(1);
                SetStockFilter(e.target.checked);
            }} />

            <form className="search-bar-input admin-search-bar" onSubmit={handleSearch}>
                <input value={search} type="text" className="search-bar" placeholder="Buscar productos por nombre, descripción o id" onChange={e => SetSearch(e.target.value)} />
                <button><AiOutlineSearch /></button>
            </form>
            <button className="btn btn-info" onClick={resetForm}>Resetear Busqueda</button>

            <div className="table-container">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>En Promoción</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {
                            products.results &&
                            products['results'].map(product => {
                                const date = new Date(product.created_at)
                                const day = String(date.getDate()).padStart(2, '0');
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const year = String(date.getFullYear());

                                return (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td className="image-td"><img src={product.image} alt="Vista previa del producto" /></td>
                                        <td>{product.category.name}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.deal ?
                                         <FcOk/>
                                         :<FcCancel/>
                                         }</td>
                                        <td>{`${day}-${month}-${year}`}</td>
                                        <td className="actions">
                                            <div className="trash svg-action" onClick={() => {
                                                deleteProduct(product.slug);
                                            }}>
                                                <BiTrash />
                                                <span className="hover-tag">Eliminar {product.name}</span>
                                            </div>
                                            <div className="edit svg-action" onClick={() => {
                                                const body = document.querySelector('body');
                                                if (body) {
                                                    body.style.overflowY = 'hidden';
                                                }
                                                SetSlug(product.slug);
                                                SetEditProduct(true);
                                            }}>
                                                <BiEdit />
                                                <span className="hover-tag">Editar {product.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="pagination">


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

            {createProduct &&
                <Popop SetForm={SetCreateProduct}>
                    <CreateForm search={search} SetPage={SetPage} SetForm={SetCreateProduct} SetProducts={SetProducts} page={page} stockFilter={stockFilter} />
                </Popop>
            }

            {editProduct &&
                <Popop SetForm={SetEditProduct}>
                    <EditForm search={search} SetPage={SetPage} SetForm={SetEditProduct} SetProducts={SetProducts} page={page} stockFilter={stockFilter} slugID={slug} />
                </Popop>
            }

        </motion.div>
    )
}

export default ProductsTable
