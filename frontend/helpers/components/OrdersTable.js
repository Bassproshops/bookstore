
import React, { useEffect, useState } from 'react'
import axios from '../../axios/OrderAxios';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { RiTruckFill, RiHome2Fill } from 'react-icons/ri';
import { IoReceiptSharp } from 'react-icons/io5';

import Popop from '../Popop';
import { useRouter } from 'next/router';

import { RiTruckLine } from 'react-icons/ri';

const ProductsTable = () => {

    const [deliveredFilter, SetDeliveredFilter] = useState('');
    const [sentFilter, SetSentFilter] = useState('');
    const [processedFilter, SetProcessedFilter] = useState('');

    const [detail, SetDetail] = useState('');
    const [order, SetOrder] = useState({});
    const [orders, SetOrders] = useState({});
    const [page, SetPage] = useState(1);

    useEffect(() => {

        axios.getAllOrders(SetOrders, page, deliveredFilter, sentFilter, processedFilter);
    }, [page, deliveredFilter, sentFilter, processedFilter])

    let pages = 1;
    if (orders) {
        pages = Math.ceil(orders.count / 100)

    }

    const router = useRouter();


    return (
        <motion.div initial={{ opacity: 0, x: 300 }} exit={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .4 }}>


            <h2 className="admin-header">Ordenes</h2>

            <div className="orderFilter">
                <label htmlFor="res-order" id="label-for-stock">Ordenes Pendientes</label>
                <input checked={processedFilter} type="checkbox" id="res-order" onChange={e => {
                    SetPage(1);
                    SetDeliveredFilter(false);
                    SetSentFilter(false);
                    SetProcessedFilter(!processedFilter);

                }} />
            </div>

            <div className="orderFilter">
                <label htmlFor="sen-order" id="label-for-stock">Ordenes Enviadas</label>
                <input checked={sentFilter} type="checkbox" name="filter" id="sen-order" onChange={e => {
                    SetPage(1);
                    SetSentFilter(!sentFilter);
                    SetProcessedFilter(false);
                    SetDeliveredFilter(false)
                }} />
            </div>

            <div className="orderFilter">
                <label htmlFor="del-order" id="label-for-stock">Ordenes Entregadas</label>
                <input checked={deliveredFilter} type="checkbox" name="filter" id="del-order" onChange={e => {
                    SetPage(1);
                    SetDeliveredFilter(!deliveredFilter);
                    SetSentFilter(false);
                    SetProcessedFilter(false);
                }} />
            </div>


            <div className="table-container order-table">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Dirección</th>
                        <th>Detalles del Pedido</th>
                        <th>Status del Envío</th>
                        <th>Cambiar Status de el Envío</th>

                    </thead>
                    <tbody>
                        {
                            orders.results &&
                            orders['results'].map(order => {

                                const date = new Date(order.created_at)
                                const day = String(date.getDate()).padStart(2, '0');
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const year = String(date.getFullYear());

                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>

                                        <td>{`${day}-${month}-${year}`}</td>
                                        <td className="direction"><p>{order.direction}</p></td>
                                        <td><p className="order-details" onClick={() => {
                                            SetOrder(order);
                                            SetDetail(true);
                                        }}>Ver Detalles</p></td>
                                        <td >
                                            <div className="svg-action">
                                                {
                                                    order.status === 'Orden Recivida' && <p className="status-table res">Orden Recibida</p> ||
                                                    order.status === 'Orden Enviada' && <p className="status-table env">Orden Enviada</p> ||
                                                    order.status === 'Orden Entregada' && <p className="status-table ent">Orden Entregada</p>
                                                }
                                                <span className="hover-tag">

                                                    {
                                                        order.status === 'Orden Recivida' && "Procesando orden" ||
                                                        order.status === 'Orden Enviada' && "Orden enviada" ||
                                                        order.status === 'Orden Entregada' && "Orden entregada"
                                                    }
                                                </span>
                                            </div>
                                        </td>
                                        <td className="actions">
                                            <div className="order-actions">
                                                <div className="recepit svg-action" onClick={() => {
                                                    axios.updateOrder({ 'status': 'Orden Recivida' }, order.id, SetOrders, page, deliveredFilter, sentFilter, processedFilter);
                                                }}>
                                                    <IoReceiptSharp />
                                                    <span className="hover-tag">Orden Recibida</span>
                                                </div>
                                                <div className="sent svg-action" onClick={() => {
                                                    axios.updateOrder({ 'status': 'Orden Enviada' }, order.id, SetOrders, page, deliveredFilter, sentFilter, processedFilter);
                                                }}>
                                                    <RiTruckFill />
                                                    <span className="hover-tag">Orden Enviada</span>
                                                </div>
                                                <div className="delivered svg-action" onClick={() => {
                                                    axios.updateOrder({ 'status': 'Orden Entregada' }, order.id, SetOrders, page, deliveredFilter, sentFilter, processedFilter);
                                                }}>
                                                    <RiHome2Fill />
                                                    <span className="hover-tag">Orden Entregada</span>
                                                </div>
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
                        orders.previous &&

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
                        orders.next &&
                        <p className="pagination-element" onClick={() => SetPage(page + 1)}>{'>>'}</p>
                    }

                </div>
            </div>
            {detail &&
                <Popop SetForm={SetDetail}>
                    <div className="container spearate order-details">

                        <h2 className="form-header order-header">Orden #{order.id}</h2>
                        <h2 className="form-header">Nombre del Usuario: {order.user.nombre}</h2>
                        {
                            order.order_items &&
                            order['order_items'].map(item => {

                                return (<>
                                    <Link href={`/producto/${item.product.slug}/`} key={item.product.id}>
                                        <div className="product-item">
                                            <div className="product-item-img">
                                                <img alt="img-preview" src={`${item.product.image}`} alt="Vista Previa del producto" />
                                            </div>
                                            <div className="product-item-content">
                                                <h3 className="product-header">{item.product.name}</h3>
                                                <p className="price">Cantidad: {item.quantity} </p>
                                                <p className="price">
                                                    Total: ${item.total}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                                )
                            })
                        }

                        <div className="progress-bar svg-action">
                            <div className={
                                order.status === 'Orden Recivida' && "progress recieved-p" ||
                                order.status === 'Orden Enviada' && "progress sent-p" ||
                                order.status === 'Orden Entregada' && "progress delivered-p"
                            }>
                                <span className="hover-tag">

                                    {
                                        order.status === 'Orden Recivida' && "Procesando orden" ||
                                        order.status === 'Orden Enviada' && "Orden enviada" ||
                                        order.status === 'Orden Entregada' && "Orden entregada"
                                    }
                                </span>
                                <RiTruckLine className="img-truck" />
                            </div>
                        </div>
                        <p className="total">Total: ${order.total}</p>
                    </div>
                </Popop>
            }

        </motion.div>
    )
}

export default ProductsTable
