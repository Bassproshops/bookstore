import React from 'react'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { estados } from '../helpers/env';
import userA from '../axios/UsersAxios';

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Registro = ({ SetUser, user, SetCart, cart }) => {

    const [emailError, SetEmailError] = useState(false);
    const [passwordError, SetPasswordError] = useState(false);
    const [estadoError, SetEstadoError] = useState(false);
    const [calleError, SetCalleError] = useState(false);
    const [coloniaError, SetColoniaError] = useState(false);
    const [exterior_numberError, SetExteriorNumberError] = useState(false);
    const [interior_numberError, SetInteriorNumberError] = useState(false);
    const [postal_codeError, SetPostalCodeError] = useState(false);
    const [nameError, SetNameError] = useState(false);


    const [eye, SetEye] = useState(false);

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [estado, SetEstado] = useState('Aguascalientes');
    const [calle, SetCalle] = useState('');
    const [colonia, SetColonia] = useState('');
    const [exterior_number, SetExteriorNumber] = useState('');
    const [interior_number, SetInteriorNumber] = useState(null);
    const [postal_code, SetPostalCode] = useState('');
    const [name, SetName] = useState('');

    const router = useRouter('/');

    useEffect(() => {
        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');

        if (emailInput) {
            SetEmail(emailInput.value)
        }

        if (passwordInput) {
            SetPassword(passwordInput.value)
        }

    }, [])


    function handleSubmit(e) {
        e.preventDefault();
        const content = {
            email,
            password,
            estado,
            calle,
            colonia,
            exterior_number,
            interior_number,
            postalcode: postal_code,
            nombre: name
        }
        userA.register(content, SetUser, SetEmailError, SetPasswordError, SetEstadoError, SetCalleError, SetColoniaError, SetExteriorNumberError, SetInteriorNumberError, SetPostalCodeError, SetNameError)
            .then(resp => {
                if (resp) {
                    router.push('/');
                } else {
                    window.scrollTo(0, 200);

                }
            })
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
            <div className="container">
                <div className="card mt">
                    <h2 className="form-header">Registrate</h2>
                    <form className="form" onSubmit={handleSubmit}>

                        {
                            nameError &&
                            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p className="error transition">{nameError} <span className="x" onClick={e => handleCancel(e, SetNameError)}>x</span></p>
                            </motion.div>
                        }

                        <div className="form-control">
                            <label htmlFor="name">Nombre Completo</label>
                            <input value={name} id="name" placeholder="Nombre Completo" onChange={(e) => SetName(e.target.value)} />
                        </div>
                        
                        {
                            emailError &&
                            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p className="error transition">{emailError} <span className="x" onClick={e => handleCancel(e, SetEmailError)}>x</span></p>
                            </motion.div>
                        }
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input value={email} type="email" id="email" placeholder="email@email.com" onChange={(e) => SetEmail(e.target.value)} />
                        </div>


                        {
                            passwordError &&
                            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p className="error transition">{passwordError} <span className="x" onClick={e => handleCancel(e, SetPasswordError)}>x</span></p>
                            </motion.div>
                        }

                        <div className="form-control">
                            <label htmlFor="password">Contraseña</label>

                            <div className="password-input">
                                <input value={password} onChange={e => SetPassword(e.target.value)} type={eye ? "text" : "password"} id="password" placeholder="Contraseña" />
                                <div className="eye-container" onClick={() => SetEye(!eye)}>
                                    {
                                        eye ?
                                            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <AiOutlineEyeInvisible />
                                            </motion.div>
                                            :
                                            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <AiOutlineEye />
                                            </motion.div>
                                    }
                                </div>
                            </div>
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
                                    estados && estados.map(estado => <option value={estado} key={estado}>{estado}</option>)
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


                        <button type="submit" className="btn btn-success mt">¡Registrate!</button>
                    </form>
                    <Link href="/login"><p className="form-footer">¿Ya tienes una cuenta?</p></Link>
                </div>
            </div>
        </motion.div>
    )
}

export default Registro
