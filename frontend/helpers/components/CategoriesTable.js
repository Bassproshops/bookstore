import React, { useEffect, useState } from 'react'
import axios from '../../axios/CategoryAxios';


import { motion } from 'framer-motion';

import { BiEdit, BiTrash } from 'react-icons/bi';
import Swal from 'sweetalert2';
import Popop from '../Popop';

import CreateForm from './admin/categories/Create';
import EditForm from './admin/categories/Edit';

const CategoriesTable = () => {
    const [categories, SetCategories] = useState([]);
    const [createCategory, SetCreateCategory] = useState(false);
    const [editCategory, SetEditCategory] = useState(false);

    const [slug, SetSlug] = useState('');

    useEffect(() => {
        axios.getCategories(SetCategories);
        
    }, [])

    function deleteCategory(slug) {
        Swal.fire({
            title: 'Estás seguro',
            text: "No se podran revertir los cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar categoría',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.deleteCategory(SetCategories, slug)
                    .then(resp => {
                        if (resp) {
                            Swal.fire(
                                'Eliminado',
                                'La categoría ha sido eliminada correctamente.',
                                'success'
                            );

                        } else {
                            Swal.fire(
                                'Error',
                                'Hubo un error mientras tratabamos de eliminar la categoría, porfavor intenta de nuevo más tarde',
                                'error'
                            )
                        }
                    })
            }
        })

    }

    return (
        <motion.div initial={{ opacity: 0, x: 300 }} exit={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .4 }}>
            <h2 className="admin-header">Categorías</h2>
            <button className="btn btn-success create-btn" onClick={() => {
                SetCreateCategory(true);
                const body = document.querySelector('body');
                if (body) {
                    body.style.overflowY = 'hidden';
                }
            }}>Crear Categoría +</button>

            <div className="table-container">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>URL</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {
                            categories.map(category => {
                                const date = new Date(category.created_at)
                                const day = String(date.getDate()).padStart(2, '0');
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const year = String(date.getFullYear());

                                return (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.slug}</td>
                                        <td>{`${day}-${month}-${year}`}</td>
                                        <td className="actions">
                                            <div className="trash svg-action" onClick={() => {
                                                deleteCategory(category.slug);
                                            }}>
                                                <BiTrash />
                                                <span className="hover-tag">Eliminar {category.name}</span>
                                            </div>
                                            <div className="edit svg-action" onClick={() => {
                                                const body = document.querySelector('body');
                                                if (body) {
                                                    body.style.overflowY = 'hidden';
                                                }
                                                SetSlug(category.slug);
                                                SetEditCategory(true);
                                            }}>
                                                <BiEdit />
                                                <span className="hover-tag">Editar {category.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {createCategory &&
                <Popop SetForm={SetCreateCategory}>
                    <CreateForm SetForm={SetCreateCategory} SetCategories={SetCategories} />
                </Popop>
            }

            {editCategory &&
                <Popop SetForm={SetEditCategory}>
                    <EditForm SetForm={SetEditCategory} SetCategories={SetCategories} slugID={slug} />
                </Popop>
            }
        </motion.div>
    )
}

export default CategoriesTable
