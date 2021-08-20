
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { estados } from '../helpers/env';
import Link from 'next/link';
import Swal from 'sweetalert2';

import userA from '../axios/UsersAxios';
import { FcAcceptDatabase, FcPackage, FcBullish } from 'react-icons/fc';
import Image from 'next/image';

const Perfil = ({ user, SetUser, cart, SetCart }) => {

    const [estadoError, SetEstadoError] = useState(false);
    const [calleError, SetCalleError] = useState(false);
    const [coloniaError, SetColoniaError] = useState(false);
    const [exterior_numberError, SetExteriorNumberError] = useState(false);
    const [interior_numberError, SetInteriorNumberError] = useState(false);
    const [postal_codeError, SetPostalCodeError] = useState(false);
    const [nameError, SetNameError] = useState(false);


    const [estado, SetEstado] = useState('');
    const [calle, SetCalle] = useState('');
    const [colonia, SetColonia] = useState('');
    const [exterior_number, SetExteriorNumber] = useState('');
    const [interior_number, SetInteriorNumber] = useState('');
    const [postal_code, SetPostalCode] = useState('');
    const [name, SetName] = useState('');

    useEffect(() => {
        userA.getUser(SetUser);


    }, [])

    useEffect(() => {
        if (user) {
            SetEstado(user.estado);
            SetCalle(user.calle);
            SetColonia(user.colonia);
            SetExteriorNumber(user.exterior_number);
            SetInteriorNumber(user.interior_number);
            SetPostalCode(user.postalcode);
            SetName(user.nombre);

        }
    }, [user])


    function handleSubmit(e) {
        e.preventDefault();
        const content = { estado, calle, colonia, exterior_number, interior_number, postalcode: postal_code, nombre: name }
        userA.updateUser(content, SetUser, user, SetEstadoError, SetCalleError, SetColoniaError, SetExteriorNumberError, SetInteriorNumberError, SetPostalCodeError, SetNameError)
            .then(resp => {
                if (resp) {
                    Swal.fire('¡Actualizado Exitosamente!', 'Tu perfil se ha sido actualizado correctamente.', 'success');
                    SetEstadoError(false);
                    SetCalleError(false);
                    SetColoniaError(false);
                    SetExteriorNumberError(false);
                    SetInteriorNumberError(false);
                    SetPostalCodeError(false);
                    SetNameError(false);
                }
            });
    }

    function handleCancel(e, SetError) {
        const alert = e.target.parentElement;
        alert.style.opacity = 0;
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            SetError(false);
        }, 500)
    }

    return (

        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {user ?
                <>
                    <div className="container mt profile-container separate">
                        <motion.div exit={{ x: -300, opacity: 1 }} transition={{ duration: 1, type: 'spring', bounce: 0.1 }} initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="card mt update-direction">
                                <h2 className="form-header">Actualizar Perfil</h2>
                                <form className="form" onSubmit={handleSubmit}>

                                    {
                                        nameError &&
                                        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <p className="error transition">{nameError} <span className="x" onClick={e => handleCancel(e, SetNameError)}>x</span></p>
                                        </motion.div>
                                    }

                                    <div className="form-control">
                                        <label htmlFor="name">Nombre Completo</label>
                                        <input value={name} type="text" id="name" placeholder="Nombre Completo" onChange={(e) => SetName(e.target.value)} />
                                    </div>

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


                                    <button type="submit" className="btn btn-success mt">Guardar Dirección</button>
                                </form>
                            </div>
                        </motion.div>

                        <motion.div initial={{ y: 300, opacity: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ y: 300, opacity: 0 }} transition={{ duration: 1, type: 'spring', bounce: 0.1 }}>
                            <Link href="/ordenes">
                                <div className="card mt update-direction order-div">
                                    <h2 className="form-header">Mis Ordenes</h2>

                                    <img src="/package.svg" alt="package" className="package-img" />

                                </div>
                            </Link>
                        </motion.div>

                    </div>
                    {user.is_staff &&
                        <motion.div initial={{ y: 300, opacity: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ y: 300, opacity: 0 }} transition={{ duration: .5 }}>
                            <div className="card admin-card">
                                <h2 className="form-header">Administración</h2>
                                <div className="admin-links-container">

                                    <Link href="/admin/ingresos">
                                        <div className="admin-link">
                                            <FcBullish />
                                            <h3>Ingresos</h3>
                                        </div>
                                    </Link>

                                    <Link href="/admin/administracion">
                                        <div className="admin-link">
                                            <FcAcceptDatabase />
                                            <h3>Categorías y Productos</h3>
                                        </div>
                                    </Link>

                                    <Link href="/admin/ordenes">
                                        <div className="admin-link">
                                            <FcPackage />
                                            <h3>Ordenes</h3>
                                        </div>
                                    </Link>




                                </div>
                            </div>

                        </motion.div>


                    }
                </>
                :
                null
            }
        </motion.div>
    )
}

export default Perfil
