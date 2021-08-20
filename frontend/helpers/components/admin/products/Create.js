import React, { useEffect, useState } from 'react'
import axios from '../../../../axios/ProductsAxios';
import categoryA from '../../../../axios/CategoryAxios';

import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { RiFolderUploadFill } from 'react-icons/ri';

const Create = ({ SetProducts, SetForm, page, SetPage, stockFilter,search }) => {

    const [name, SetName] = useState('');
    const [slug, SetSlug] = useState('');
    const [price, SetPrice] = useState('');
    const [category, SetCategory] = useState('');
    const [stock, SetStock] = useState('');
    const [description, SetDescription] = useState('');
    const [image, SetImage] = useState(false);

    const [nameError, SetNameError] = useState(false);
    const [slugError, SetSlugError] = useState(false);
    const [priceError, SetPriceError] = useState(false);
    const [categoryError, SetCategoryError] = useState(false);
    const [stockError, SetStockError] = useState(false);
    const [descriptionError, SetDescriptionError] = useState(false);
    const [imageError, SetImageError] = useState(false);

    const [categories, SetCategories] = useState([]);

    useEffect(() => {
        categoryA.getCategories(SetCategories);
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            SetCategory(categories[0].id);
        }
    }, [categories])

    function handleCancel(e, SetError) {
        const alert = e.target.parentElement;
        alert.style.opacity = 0;
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            SetError(false);
        }, 500)
    }

    function handleSubmit(e) {
        e.preventDefault();
        const content = new FormData();
        content.append('name', name);
        content.append('slug', slug);
        content.append('price', price);
        content.append('category', category);
        content.append('stock', stock);
        content.append('description', description);
        content.append('image', image);
        axios.createProduct(content, SetProducts, page, stockFilter, SetPage, SetNameError, SetSlugError, SetPriceError, SetCategoryError, SetStockError, SetDescriptionError, SetImageError,search)
            .then(resp => {
                if (resp) {
                    Swal.fire(
                        'Producto Creado',
                        'El producto ha sido creado correctamente',
                        'success'
                    ).then(() => {
                        const body = document.querySelector('body');
                        if (body) {
                            body.style.overflowY = 'auto';
                        }
                        SetForm(false);

                    })
                }else{
                    const formCard = document.querySelector('.popop');
                    if(formCard){
                        formCard.scrollTo(0, 0);
                    }
                }
            });

    }
    return (
        <div className="mt container">
            <div className="container">

                <form onSubmit={handleSubmit} className="form">

                    {
                        nameError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{nameError} <span className="x" onClick={e => handleCancel(e, SetNameError)}>x</span></p>
                        </motion.div>
                    }
                    <div className="form-control">
                        <label htmlFor="name">Nombre</label>
                        <input value={name} type="text" id="name" placeholder="Nombre" onChange={e => SetName(e.target.value)} />
                    </div>

                    {
                        slugError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{slugError} <span className="x" onClick={e => handleCancel(e, SetSlugError)}>x</span></p>
                        </motion.div>
                    }
                    <div className="form-control">
                        <label htmlFor="slug">URL</label>
                        <input value={slug} type="text" id="slug" placeholder="URL" onChange={e => SetSlug(e.target.value)} />
                    </div>

                    {
                        priceError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{priceError} <span className="x" onClick={e => handleCancel(e, SetPriceError)}>x</span></p>
                        </motion.div>
                    }
                    <div className="form-control">
                        <label htmlFor="price">Precio</label>
                        <input value={price} min="0" type="number" id="price" placeholder="Precio" onChange={e => SetPrice(e.target.value)} />
                    </div>

                    {
                        stockError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{stockError} <span className="x" onClick={e => handleCancel(e, SetStockError)}>x</span></p>
                        </motion.div>
                    }
                    <div className="form-control">
                        <label htmlFor="stock">Stock</label>
                        <input value={stock} type="number" min={0} id="stock" placeholder="Stock" onChange={e => SetStock(e.target.value)} />
                    </div>

                    {
                        imageError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{imageError} <span className="x" onClick={e => handleCancel(e, SetImageError)}>x</span></p>
                        </motion.div>
                    }

                    <div className="file-input">
                        <h3>Imágen</h3>
                        <label htmlFor="imagen" className="align-svg">
                            <span className="txt">{!image ? "Subir imágen del producto" : image.name}</span>
                            <span className="svg"><RiFolderUploadFill /></span>
                        </label>
                        <input onChange={e => SetImage(e.target.files[0])} type="file" id="imagen" accept="image/png, image/jpeg, image/webp" />
                    </div>

                    {
                        descriptionError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{descriptionError} <span className="x" onClick={e => handleCancel(e, SetDescriptionError)}>x</span></p>
                        </motion.div>
                    }
                    <div className="form-control">
                        <label htmlFor="description">Descripción</label>
                        <textarea value={description} type="text" id="description" placeholder="Descripción" onChange={e => SetDescription(e.target.value)} />
                    </div>

                    {
                        categoryError &&
                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="error transition">{categoryError} <span className="x" onClick={e => handleCancel(e, SetCategoryError)}>x</span></p>
                        </motion.div>
                    }

                    <div className="form-control">
                        <label htmlFor="categoria">Categoría</label>
                        <select id="categoria" onChange={e => SetCategory(e.target.value)}>
                            {
                                categories && categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)
                            }
                        </select>
                    </div>



                    <button type="submit" className="btn btn-success mt">Crear Producto</button>
                </form>

            </div>
        </div>
    )
}

export default Create
