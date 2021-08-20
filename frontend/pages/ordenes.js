import React, { useEffect, useState } from 'react'
import axios from '../axios/OrderAxios';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Ordenes = () => {

    const [orders, SetOrders] = useState([]);


    useEffect(() => {
        axios.getUserOrders(SetOrders);
    }, [])

    return (
        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="container separate">

                {
                    orders.map(order => {
                        const date = new Date(order.created_at);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = String(date.getFullYear());
                        const hour = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        return (
                            <Link href={`orden/${order.id}/`} key={order.id}>
                                <div className="order-item" >

                                    <h3 className="price">Pedido realizado: {`${day}-${month}-${year} | ${hour}:${minutes}`}</h3>
                                    
                                    <div>
                                        {order.status === "Orden Recivida" && <p className="status-tag pending-order">Procesando Orden</p>}
                                        {order.status === 'Orden Enviada' && <p className="status-tag sent-order">Orden Enviada</p>}
                                        {order.status === 'Orden Entregada' && <p className="status-tag delivered-order">Orden Entregada</p>}
                                        <small>{order.direction}</small>
                                        <h3 className="total-payed">Total Pagado: ${order.total}</h3>
                                    </div>

                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        </motion.div>


    )
}

export default Ordenes
