import React, { useEffect, useState } from 'react'
import axios from '../../../../axios/ProductsAxios';
import categoryA from '../../../../axios/CategoryAxios';

import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { RiFolderUploadFill } from 'react-icons/ri';
import { IoMdPricetags } from 'react-icons/io';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';


const update = ({ SetProducts, SetForm, page, SetPage, stockFilter, slugID, search }) => {

    const [name, SetName] = useState('');
    const [slug, SetSlug] = useState('');
    const [price, SetPrice] = useState('');
    const [category, SetCategory] = useState('');
    const [stock, SetStock] = useState('');
    const [description, SetDescription] = useState('');
    const [image, SetImage] = useState(false);
    const [dealField, SetDealField] = useState(false);
    const [specialPrice, SetSpecialPrice] = useState('');

    const [nameError, SetNameError] = useState(false);
    const [slugError, SetSlugError] = useState(false);
    const [priceError, SetPriceError] = useState(false);
    const [categoryError, SetCategoryError] = useState(false);
    const [stockError, SetStockError] = useState(false);
    const [descriptionError, SetDescriptionError] = useState(false);
    const [imageError, SetImageError] = useState(false);
    const [specialPriceError, SetSpecialPriceError] = useState(false);

    const [categories, SetCategories] = useState([]);
    const [product, SetProduct] = useState({});

    useEffect(() => {
        categoryA.getCategories(SetCategories);
        axios.retrieveProduct(slugID, SetProduct);
    }, [])


    useEffect(() => {

        if (product.category) {
            SetName(product.name)
            SetSlug(product.slug)
            SetPrice(product.price)
            SetCategory(product.category.id)
            SetStock(product.stock)
            SetDescription(product.description)
            SetDealField(product.deal);
            SetSpecialPrice(product.special_price ? product.special_price : product.price - 1);
        }
    }, [product])

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
        content.append('deal', dealField);
        content.append('special_price', specialPrice === '' ? null : specialPrice); 
        if (image) {
            content.append('image', image);

        }

        axios.updateProduct(content, SetProducts, page, stockFilter, SetPage, SetNameError, SetSlugError, SetPriceError, SetCategoryError, SetStockError, SetDescriptionError, SetImageError, slugID, search)
            .then(resp => {
                if (resp) {
                    Swal.fire(
                        'Producto Actualizado',
                        'El producto ha sido actualizado correctamente',
                        'success'
                    ).then(() => {
                        const body = document.querySelector('body');
                        if (body) {
                            body.style.overflowY = 'auto';
                        }
                        SetForm(false);

                    })
                } else {
                    const formCard = document.querySelector('.popop');
                    if (formCard) {
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


                    <div className="img-thumbnail-for-update">
                        <img src={product.image} alt="vista previa de al imagen" />
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
                                categories && categories.map(categoryM => <option selected={categoryM.id === category} value={categoryM.id} key={categoryM.id}>{categoryM.name}</option>)
                            }
                        </select>
                    </div>

                    <div className="promotions-checkbox align-svg" onClick={() => SetDealField(!dealField)}>
                        <span className="svg">
                            {
                                !dealField ?
                                    <ImCheckboxUnchecked />
                                    :
                                    <ImCheckboxChecked />
                            }
                        </span>
                        <h3 className="label-for-checkbox txt">{dealField ? 'Desactivar Promoción' : 'Activar Promoción'}</h3>
                    </div>

                    {dealField &&
                        <>
                            {
                                specialPriceError &&
                                <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <p className="error transition">{specialPriceError} <span className="x" onClick={e => handleCancel(e, SetPriceError)}>x</span></p>
                                </motion.div>
                            }
                            <div className="form-control">
                                <label htmlFor="specialPrice">Precio Especial</label>
                                <input value={specialPrice} min="0" type="number" id="specialPrice" placeholder="Precio Especial" onChange={e => SetSpecialPrice( e.target.value)} />
                            </div>
                        </>
                    }

                    <button type="submit" className="btn btn-success mt">Actualizar Producto</button>
                </form>

            </div>
        </div>
    )
}

export default update
