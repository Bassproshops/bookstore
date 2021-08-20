import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from '../../axios/OrderAxios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { baseURL } from '../../helpers/env';
import { RiTruckLine } from 'react-icons/ri';
import Popop from '../../helpers/Popop';
import userA from '../../axios/UsersAxios';
import { AnimatePresence } from 'framer-motion';
import { estados } from '../../helpers/env';
import Swal from 'sweetalert2';

const OrdenDetail = ({ user, SetUser }) => {

    const router = useRouter();
    const { id } = router.query;

    const [order, SetOrder] = useState({});
    const [factura, SetFactura] = useState(false);
    const [defaultDirection, SetDefaultDirection] = useState(true);

    const [estadoError, SetEstadoError] = useState(false);
    const [calleError, SetCalleError] = useState(false);
    const [coloniaError, SetColoniaError] = useState(false);
    const [exterior_numberError, SetExteriorNumberError] = useState(false);
    const [interior_numberError, SetInteriorNumberError] = useState(false);
    const [postal_codeError, SetPostalCodeError] = useState(false);

    const [emailError, SetEmailError] = useState(false);
    const [nombreError, SetNombreError] = useState(false);
    const [rfcError, SetRfcError] = useState(false);

    const [estado, SetEstado] = useState('');
    const [calle, SetCalle] = useState('');
    const [colonia, SetColonia] = useState('');
    const [exterior_number, SetExteriorNumber] = useState('');
    const [interior_number, SetInteriorNumber] = useState('');
    const [postal_code, SetPostalCode] = useState('');

    const [nombre, SetNombre] = useState('');
    const [email, SetEmail] = useState('');
    const [rfc, SetRfc] = useState('');
    const [formSubmited, SetFormSubmited] = useState(false);

    useEffect(() => {
        if (user) {
            SetEstado(user.estado);
            SetCalle(user.calle);
            SetColonia(user.colonia);
            SetExteriorNumber(user.exterior_number);
            SetInteriorNumber(user.interior_number);
            SetPostalCode(user.postalcode);
            SetEmail(user.email);
            SetNombre(user.nombre)

        }
    }, [user])

    useEffect(() => {
        axios.retrieveOrder(id, SetOrder);
    }, [id])

    function handleCancel(e, SetError) {
        const alert = e.target.parentElement;
        alert.style.opacity = 0;
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            SetError(false);

        }, 500)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formSubmited) {
            SetFormSubmited(true);
            if (!defaultDirection) {
                const content = { estado, calle, colonia, exterior_number, interior_number, postalcode: postal_code }
                const resp = await userA.updateUser(content, SetUser, user, SetEstadoError, SetCalleError, SetColoniaError, SetExteriorNumberError, SetInteriorNumberError, SetPostalCodeError);
                if (!resp) {
                    SetFormSubmited(false);
                    return;
                }
            }

            if (rfc.trim() === '') {
                SetRfcError('Este campo no puede estar en blanco')
                SetFormSubmited(false);

            } else {
                SetRfcError(false)
            }

            if (nombre.trim() === '') {
                SetNombreError('Este campo no puede estar en blanco')
                SetFormSubmited(false);

            } else {
                SetNombreError(false)
            }

            if (email.trim() === '') {
                SetEmailError('Este campo no puede estar en blanco');
                SetFormSubmited(false);
            } else {
                SetEmailError(false);
            }

            if (email.trim() !== '' && nombre.trim() !== '' && rfc.trim() !== '') {
                SetFormSubmited(true);
                const content = {
                    id: order.id,
                    email,
                    nombre,
                    rfc
                }
                axios.Factura(content)
                    .then(resp => {
                        if (resp) {
                            Swal.fire(
                                'Solicitud Enviada',
                                'La solicitud de la factura a sido enviada correctamente, la factura se te hará llegar por correo electrónico.',
                                'success',

                            ).then(() => {
                                axios.retrieveOrder(id, SetOrder)
                                SetFactura(false);
                            })
                        } else {
                            Swal.fire(
                                'Un Error Ocurrió',
                                'Hubo un error al solicitar la factura, porfavor intentaló más tarde',
                                'error'

                            )
                            SetFormSubmited(false)
                        }
                    });
            }

        }
    }


    return (
        user.id === order.user ?
            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="container spearate order-details">

                    <h2 className="form-header order-header">Orden #{order.id}</h2>
                    {
                        order.order_items &&
                        order['order_items'].map(item => {

                            return (
                                <Link href={`/producto/${item.product.slug}/`} key={item.product.id}>
                                    <div className="product-item">
                                        <div className="product-item-img">
                                            {item.product &&
                                                <img alt="img-preview" src={`${baseURL}${item.product.image}`} />
                                            }
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
                    <div className="factura-container">
                        {
                            !order.factura ?
                                <p className="btn  factura" onClick={() => SetFactura(true)}>Solicitar Factura Aquí</p>
                                :
                                <p className="btn  factura transparency" style={{ cursor: 'not-allowed' }}>
                                    Factura Solicitada
                                </p>
                        }
                    </div>

                    <p className="total">Total: ${order.total}</p>
                </div>
                {
                    !order.factura && factura &&
                    <Popop SetForm={SetFactura}>
                        <h2 className="form-header">Solicitar Factura</h2>
                        <form onSubmit={handleSubmit} className="separate container">
                            <motion.div initial={{ opacity: 0, y: -300 }} exit={{ opacity: 0, y: -300 }} animate={{ opacity: 1, y: 0 }}>

                                {
                                    emailError &&
                                    <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <p className="error transition">{emailError} <span className="x" onClick={e => handleCancel(e, SetEmailError)}>x</span></p>
                                    </motion.div>
                                }

                                <div className="form-control">
                                    <label htmlFor="name">Email</label>
                                    <input value={email} type="email" id="name" placeholder="Email" onChange={(e) => SetEmail(e.target.value)} />
                                </div>

                                {
                                    nombreError &&
                                    <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <p className="error transition">{nombreError} <span className="x" onClick={e => handleCancel(e, SetNombreError)}>x</span></p>
                                    </motion.div>
                                }

                                <div className="form-control">
                                    <label htmlFor="name">Nombre / Denominación Social</label>
                                    <input value={nombre} type="text" id="name" placeholder="Nombre / Denominación Social" onChange={(e) => SetNombre(e.target.value)} />
                                </div>

                                {
                                    rfcError &&
                                    <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <p className="error transition">{rfcError} <span className="x" onClick={e => handleCancel(e, SetRfcError)}>x</span></p>
                                    </motion.div>
                                }

                                <div className="form-control">
                                    <label htmlFor="name">RFC</label>
                                    <input value={rfc} type="text" id="name" placeholder="RFC" onChange={(e) => SetRfc(e.target.value)} />
                                </div>

                                <h3 className="payment-header">Dirección</h3>
                                <div className="selection-card">
                                    <label htmlFor="preDefined">Dirección - {user.calle} | {user.colonia}, #{user.exterior_number}-{user.interior_number && `#${user.exterior_number}`}</label>
                                    <input checked={defaultDirection} onChange={e => SetDefaultDirection(e.target.checked)} className="radio-input" type="radio" name="direction" id="preDefined" />
                                </div>

                                <div className="selection-card">
                                    <label htmlFor="customDir">Seleccionar otra dirección</label>
                                    <input checked={!defaultDirection} onChange={e => SetDefaultDirection(!e.target.checked)} className="radio-input" type="radio" name="direction" id="customDir" />
                                </div>
                                {
                                    !defaultDirection &&
                                    <AnimatePresence exitBeforeEnter>
                                        <motion.div initial={{ opacity: 0, y: -300 }} exit={{ opacity: 0, y: -300 }} animate={{ opacity: 1, y: 0 }}>
                                            {
                                                estadoError &&
                                                <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <p className="error transition">{estadoError} <span className="x" onClick={e => handleCancel(e, SetEstadoError)}>x</span></p>
                                                </motion.div>
                                            }

                                            <div className="form-control">
                                                <label htmlFor="estado">Estado</label>
                                                <select id="estado" onChange={e => SetEstado(e.target.value)}>
                                                    {
                                                        estados && estados.map(estado => <option selected={estado === user.estado} value={estado} key={estado}>{estado}</option>)
                                                    }
                                                </select>
                                            </div>

                                            {
                                                calleError &&
                                                <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <p className="error transition">{calleError} <span className="x" onClick={e => handleCancel(e, SetCalleError)}>x</span></p>
                                                </motion.div>
                                            }

                                            <div className="form-control">
                                                <label htmlFor="calle">Calle</label>
                                                <input value={calle} type="text" id="calle" placeholder="Calle" onChange={(e) => SetCalle(e.target.value)} />
                                            </div>

                                            {
                                                coloniaError &&
                                                <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <p className="error transition">{coloniaError} <span className="x" onClick={e => handleCancel(e, SetColoniaError)}>x</span></p>
                                                </motion.div>
                                            }

                                            <div className="form-control">
                                                <label htmlFor="colonia">Colonia</label>
                                                <input value={colonia} type="text" id="colonia" placeholder="Colonia" onChange={(e) => SetColonia(e.target.value)} />
                                            </div>

                                            {
                                                exterior_numberError &&
                                                <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <p className="error transition">{exterior_numberError} <span className="x" onClick={e => handleCancel(e, SetExteriorNumberError)}>x</span></p>
                                                </motion.div>
                                            }

                                            <div className="form-control">
                                                <label htmlFor="exterior">Número Exterior</label>
                                                <input value={exterior_number} type="number" min={1} id="exterior" placeholder="Número Exterior" onChange={(e) => SetExteriorNumber(e.target.value)} />
                                            </div>

                                            {
                                                interior_numberError &&
                                                <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <p className="error transition">{interior_numberError} <span className="x" onClick={e => handleCancel(e, SetInteriorNumberError)}>x</span></p>
                                                </motion.div>
                                            }

                                            <div className="form-control">
                                                <label htmlFor="interior">Número Interior (opcional)</label>
                                                <input value={interior_number} type="number" min={1} id="interior" placeholder="Número Interior" onChange={(e) => {
                                                    if (e.target.value === '') {
                                                        SetInteriorNumber(null);
                                                    } else {
                                                        SetInteriorNumber(e.target.value)
                                                    }
                                                }} />
                                            </div>

                                            {
                                                postal_codeError &&
                                                <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <p className="error transition">{postal_codeError} <span className="x" onClick={e => handleCancel(e, SetPostalCodeError)}>x</span></p>
                                                </motion.div>
                                            }

                                            <div className="form-control">
                                                <label htmlFor="zip">Código Postal</label>
                                                <input value={postal_code} type="number" min={1} id="zip" placeholder="Código Postal" onChange={(e) => SetPostalCode(e.target.value)} />
                                            </div>


                                        </motion.div>
                                    </AnimatePresence>
                                }

                                <button type="submit" className="btn btn-success mt" style={{ cursor: formSubmited ? 'not-allowed' : 'pointer' }} disabled={formSubmited}>
                                    {!formSubmited ?
                                        "Solicitar Factura"
                                        :
                                        <div className="loader"></div>
                                    }
                                </button>

                            </motion.div>
                        </form >
                    </Popop>
                }
                <p className="order-contact-email">¿Problemas con tu envío? Contactanos a: asuntosmariareina@hotmail.com</p>
            </motion.div>
            : null
    )
}

export default OrdenDetail
