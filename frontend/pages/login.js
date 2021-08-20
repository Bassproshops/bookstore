import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import userA from '../axios/UsersAxios';

import Link from 'next/link';

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { useRouter } from 'next/router';

const Login = ({ SetUser }) => {

    const [eye, SetEye] = useState(false);
    const [error, SetError] = useState(false);

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const router = useRouter();
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
        userA.login({ email, password }, SetUser, SetError)
            .then(resp => {
                if (resp) {
                    if (window.location.search) {
                        router.push(window.location.search.split('=')[1]);
                    } else {
                        router.push('/');
                    }
                }
            });
    }

    function handleCancel(e) {
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
                    <h2 className="form-header">Inicia Sesión</h2>
                    <form className="form" onSubmit={handleSubmit}>

                        {
                            error &&
                            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p className="error transition">{error} <span className="x" onClick={handleCancel}>x</span></p>
                            </motion.div>
                        }
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input value={email} type="email" id="email" placeholder="email@email.com" onChange={(e) => SetEmail(e.target.value)} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="password">Contraseña</label>

                            <div className="password-input">
                                <input onChange={e => SetPassword(e.target.value)} value={password} type={eye ? "text" : "password"} id="password" placeholder="Contraseña" />
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
                        <button type="submit" className="btn btn-success mt">¡Iniciar Sesión!</button>
                    </form>
                    <Link href="/registro"><p className="form-footer">¿No tienes cuenta?</p></Link>

                </div>
            </div>
        </motion.div>
    )
}

export default Login
