import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

import userA from '../../axios/UsersAxios';
import cartA from '../../axios/CartAxios';
import categoryA from '../../axios/CategoryAxios';
import { motion } from 'framer-motion';

import { FiLogOut } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = ({ user, SetUser, cart, SetCart }) => {

    const [burger, SetBurger] = useState(false);
    const [categories, SetCategories] = useState([]);
    const [searchText, SetSearchText] = useState('');

    const router = useRouter();


    useEffect(() => {
        userA.getUser(SetUser);
        categoryA.getCategories(SetCategories);
        cartA.getCart(SetCart);

        const body = document.querySelector('body');
        SetBurger(false);
        if (body) {

            body.style.overflowY = 'auto';
        }

    }, [router.asPath])

    function handleBurger() {
        SetBurger(!burger);
        const body = document.querySelector('body');

        if (!burger) {
            body.style.overflowY = 'hidden';
        } else {
            body.style.overflowY = 'auto';
        }

    }

    function handleSearch(e) {
        e.preventDefault();

        if (searchText.trim() !== '') {
            router.push(`/buscar/${searchText.trim()}/`);

        }
    }
    return (
        <div className="nav-container">
            <motion.div className="navbar-search" initial={{ y: -300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} exit={{ y: -300, opacity: 0 }}>
                <nav className="navbar">

                    <div className="logo-cont">
                        <Link href="/"><img src="/logo.png" alt="Our Logo" /></Link>
                        <Link href="/"><h1 className="responsive-header" style={{ opacity: 0 }}>Librería María Reyna de la Paz</h1></Link>
                    </div>

                    <div className={burger ? "links burger-links-active" : "links"}>
                        <div className="links-container">

                            <div className="dropdown">
                                <p className="nav-link dropdown-link">Categorías</p>
                                <ul>
                                    {
                                        categories.map(category => <li key={category.id} onClick={() => router.push(`/categorias/${category.slug}/`)}>{category.name}</li>)
                                    }
                                </ul>
                            </div>
                            <Link href="/sobre-nosotros">
                                <p className="nav-link">Sobre Nosotros</p>
                            </Link>
                            {
                                user ?
                                    <>
                                        <Link href="/carrito">
                                            <p className="nav-link carrito-link">Carrito<span className="cart-items-number">{cart.length > 9 ? '+9' : cart.length}</span></p>
                                        </Link>

                                        <Link href="/perfil">
                                            <p className="nav-link">Perfil</p>
                                        </Link>


                                        <p className="nav-link align-svg" onClick={() => {
                                            userA.logout(SetUser)
                                                .then(resp => {
                                                    if (resp) {
                                                        router.push('/login');
                                                    }
                                                });
                                        }}>
                                            <span className="txt">Salir</span>
                                            <span className="svg"><FiLogOut style={{ strokeWidth: '3px' }} /></span>
                                        </p>
                                    </>
                                    :
                                    <>
                                        <Link href="/registro">
                                            <p className="nav-link">Registrate</p>
                                        </Link>

                                        <Link href="/login">
                                            <p className="nav-link align-svg">
                                                <span className="txt">Iniciar Sesión</span>
                                                <span className="svg"><FiLogOut style={{ strokeWidth: '3px' }} /></span>
                                            </p>
                                        </Link>

                                    </>
                            }
                        </div>
                    </div>

                    <div className="burger-container transition" onClick={handleBurger}>
                        <div className={burger ? "burger burger-active transition" : "burger transition"}></div>
                    </div>
                </nav>
            </motion.div>

            <div className="search-bar-container">
                <div className="search-bar-wrapper">

                    <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .7 }} exit={{ x: 300, opacity: 0 }}>
                        <h1 style={{ opacity:0 }}>Librería María Reyna de la Paz</h1>
                    </motion.div>

                    <motion.div className="motion-search" initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .8 }} exit={{ x: -300, opacity: 0 }}>
                        <form className="search-bar-input" onSubmit={handleSearch}>
                            <input value={searchText} type="text" className="search-bar" placeholder="Buscar Productos..." onChange={e => SetSearchText(e.target.value)} />
                            <button aria-label="search products" name="search products"><AiOutlineSearch /></button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div >
    )
}
export default Navbar
