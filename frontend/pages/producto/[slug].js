import React, { useEffect, useState } from 'react'
import axios from '../../axios/ProductsAxios';
import cart from '../../axios/CartAxios';

import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';



const Slug = ({ user }) => {

    const router = useRouter();
    const { slug } = router.query;

    const [product, SetProduct] = useState({});

    const [quantity, SetQuantity] = useState(1);

    useEffect(() => {
        if (slug) {
            axios.retrieveProduct(slug, SetProduct);
            axios.increasePopularity(slug);
        }



    }, [slug])

    useEffect(() => {
        if (product.description) {
            const descParagraph = document.querySelector('.product-description');
            if (descParagraph) {
                descParagraph.innerHTML = product.description;
            }
        }
    }, [product])

    const stock = [];
    if (product.stock) {
        for (let i = 1; i <= product['stock']; i++) {
            stock[i] = i;
        }
    }

    function addToCart() {
        if (!user) {

            router.push(`/login?next=${router.asPath}`)
        } else {
            const content = {
                quantity,
                product: slug
            }
            cart.addToCart(content)
                .then(resp => {
                    if (resp) {
                        axios.increasePopularity(slug);
                        router.push('/carrito')
                    }
                })
        }
    }


    return (
        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} className="container separate">
            {product.price &&
                <div className="product-detail">
                    <AnimatePresence>

                        <motion.div key={1} initial={{ opacity: 0, x: -300 }} transition={{ duration: .4, delay: .2 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }}>
                            <div className="product-detail-img-container" style={{ backgroundImage: `url(${product.image})` }}>

                            </div>
                        </motion.div>

                        <motion.div key={2} initial={{ opacity: 0, x: -300 }} transition={{ duration: .4, delay: .2 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }}>
                            <div className="product-detail-content">
                                <div>
                                    <h2 className="product-detail-header">{product.name}</h2>
                                    <p className="price">${product.deal ? product.special_price : product.price}</p>
                                    {product.deal &&
                                        <p className="old-price">${product.price}</p>
                                    }
                                </div>

                                <div className="cart-add-cont">
                                    {product.stock > 0 ?
                                        <>
                                            <div className="quantity-select">
                                                <label htmlFor="cantidad" className="quantity-label">Cantidad:</label>
                                                <select id="cantidad" className="product-quantity-stock" onChange={e => SetQuantity(e.target.value > 0 ? parseInt(e.target.value) : 1)}>
                                                    {
                                                        stock.map(i => <option key={i} value={i}>{i}</option>)
                                                    }
                                                </select>
                                            </div>

                                            <button className="btn btn-success submit-filter" onClick={addToCart}>Agregar al Carrito</button>
                                        </>
                                        :

                                        <p className="no-stock">Agotado</p>
                                    }
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="description" initial={{ opacity: 0, y: 300 }} exit={{ opacity: 0, y: 300 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .2 }}>
                            <h3 className="separate">Descripción</h3>
                            <p className="product-description">

                            </p>
                        </motion.div>

                    </AnimatePresence>
                </div>
            }
        </motion.div>
    )
}

export default Slug
