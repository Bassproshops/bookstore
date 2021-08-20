import React, { useEffect, useState } from 'react'
import { strKey } from '../env';
import Swal from 'sweetalert2';

import { useRouter } from 'next/router';

import { motion, AnimatePresence } from 'framer-motion';
import { estados } from '../env';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import userA from '../../axios/UsersAxios';
import axios from '../../axios/OrderAxios';


const CheckoutComponent = ({ user, SetUser, total }) => {

    const router = useRouter();

    const [defaultDirection, SetDefaultDirection] = useState(true);


    const [estadoError, SetEstadoError] = useState(false);
    const [calleError, SetCalleError] = useState(false);
    const [coloniaError, SetColoniaError] = useState(false);
    const [exterior_numberError, SetExteriorNumberError] = useState(false);
    const [interior_numberError, SetInteriorNumberError] = useState(false);
    const [postal_codeError, SetPostalCodeError] = useState(false);


    const [estado, SetEstado] = useState('');
    const [calle, SetCalle] = useState('');
    const [colonia, SetColonia] = useState('');
    const [exterior_number, SetExteriorNumber] = useState('');
    const [interior_number, SetInteriorNumber] = useState('');
    const [postal_code, SetPostalCode] = useState('');

    const [formSubmited, SetFormSubmited] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (user) {
            SetEstado(user.estado);
            SetCalle(user.calle);
            SetColonia(user.colonia);
            SetExteriorNumber(user.exterior_number);
            SetInteriorNumber(user.interior_number);
            SetPostalCode(user.postalcode);

        }
    }, [user])

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
        SetFormSubmited(true);
        if (!formSubmited) {
            if (!defaultDirection) {
                const content = { estado, calle, colonia, exterior_number, interior_number, postalcode: postal_code }
                const resp = await userA.updateUser(content, SetUser, user, SetEstadoError, SetCalleError, SetColoniaError, SetExteriorNumberError, SetInteriorNumberError, SetPostalCodeError);
                if (!resp) {
                    SetFormSubmited(false);
                    return;
                }
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            });
            if (!error) {
                const { id } = paymentMethod;
                await axios.checkout(id)
                    .then(resp => {
                        if (resp) {
                            Swal.fire(
                                'Pago realizado exitosamente',
                                'El pago se realizó exitosamente',
                                'success'
                            ).then(() => {
                                router.push('/ordenes');
                            })
                        } else {
                            Swal.fire(
                                'Error',
                                'El método de pago falló, porfavor revisa que tengas saldo suficiente.',
                                'error'
                            )
                            SetFormSubmited(false)
                        }
                    })

            }else{
                SetFormSubmited(false)
            }
        }


    }
    return (
        <form onSubmit={handleSubmit} className="separate container">
            <motion.div initial={{ opacity: 0, y: -300 }} exit={{ opacity: 0, y: -300 }} animate={{ opacity: 1, y: 0 }}>

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
                <h3 className="payment-header">Método de Pago</h3>
                <div className="card-component">
                    <CardElement />
                </div>
                <button type="submit" className="btn btn-success mt" style={{ cursor: formSubmited ? 'not-allowed' : 'pointer' }} disabled={formSubmited}>
                    {!formSubmited ?
                        "Pagar"
                        :
                        <div className="loader"></div>
                    }
                </button>
                <p className="total">Total: ${total}</p>
            </motion.div>
        </form >
    )
}


const StripePayment = ({ user, SetUser, total }) => {
    const stripePromise = loadStripe(strKey)

    return (
        <Elements stripe={stripePromise}>
            <CheckoutComponent user={user} SetUser={SetUser} total={total} />
        </Elements>
    )
}

export default StripePayment