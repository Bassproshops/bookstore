import React, { useState } from 'react'
import Link from 'next/link';
import { baseURL } from '../helpers/env';
import axios from '../axios/CartAxios';
import Popop from '../helpers/Popop';
import StripePayment from '../helpers/components/StripePayment';
import Image from 'next/image';

import { motion } from 'framer-motion';

const Carrito = ({ cart, user, SetCart, SetUser }) => {


    const [payPopop, SetPayPopop] = useState();

    function updateQuantity(id, quantity) {
        axios.updateCartItem(id, { quantity }, SetCart);

    }

    function deleteCartItem(id) {
        axios.deleteCartItem(id, SetCart)
    }

    let total = 0;
    if (cart) {
        for (let i of cart) {
            if (i.product.deal) {
                total += i.quantity * i.product.special_price;

            }else{
                total += i.quantity * i.product.price;
            }
        }

    }
    return (
        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} className="separate cart-container">

            {user &&
                cart && cart.length > 0 ?
                user &&
                cart.map(c => {

                    const stock = [];
                    for (let i = 1; i <= c.product.stock; i++) {
                        stock[i] = i;
                    }

                    return (
                        <div key={c.id}>
                            <div className="product-item">
                                <Link href={`/producto/${c.product.slug}/`}>
                                    <div className="product-item-img">
                                        <img src={`${baseURL}${c.product.image}`}  alt="Vista Previa del producto" />
                                    </div>
                                </Link>
                                <div className="product-item-content">
                                    <Link href={`/producto/${c.product.slug}/`}>
                                        <h3 className="product-header">{c.product.name}</h3>
                                    </Link>

                                    <Link href={`/producto/${c.product.slug}/`}>
                                        <p className="price">
                                            ${c.product.deal ? c.product.special_price : `${c.product.price}`}
                                        </p>
                                    </Link>

                                    {c.product.stock === 0 &&
                                        <p className="no-stock">Agotado</p>
                                    }


                                    <p className="delete" onClick={() => deleteCartItem(c.id)}>Eliminar</p>

                                    <select id="cantidad" className="product-quantity-stock" onChange={e => updateQuantity(c.id, e.target.value)}>
                                        {
                                            stock.map(i => <option selected={i === c.quantity} key={i} value={i}>{i}</option>)
                                        }
                                    </select>

                                </div>

                            </div>
                        </div>
                    )
                })

                :
                <h3 className="product-header not-found-any"><Link href="/">No hay productos en tu carro.</Link></h3>
            }
            {total > 0 &&
                <p className="total">Total: ${total}</p>
            }

            {cart.length > 0 &&
                <button className="btn btn-success btn-cart" onClick={() => SetPayPopop(true)}>Proceder al Pago</button>
            }

            {payPopop &&
                <Popop SetForm={SetPayPopop}>
                    <StripePayment user={user} SetUser={SetUser} total={total} />
                </Popop>
            }
        </motion.div>
    )
}

export default Carrito









