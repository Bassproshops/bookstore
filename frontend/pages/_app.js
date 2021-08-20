import '../styles/globals.css';
import '../styles/navbar.css';
import '../styles/form.css';
import '../styles/buttons.css';
import '../styles/perfil.css';
import '../styles/admin.css';
import '../styles/products.css';
import '../styles/cart.css';
import '../styles/orders.css';
import '../styles/about.css';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../helpers/components/Navbar';
import Head from 'next/head';
import Footer from '../helpers/components/Footer';

function MyApp({ Component, pageProps, router }) {

  const [user, SetUser] = useState(false);
  const [cart, SetCart] = useState([])


  return (
    <>
      <Head>

        <title>María Reyna de la Paz</title>
        <meta name="description" content="María Reyna de la Paz, librería y artículos religiosos" />
        <link rel="icon" href="/favicon2.svg" type="image/svg+xml"/>

        <meta name="description" content="Librería María Reyna de la Paz, librería y artículos religiosos."/>
        <meta name="keywords" content="Jesús, libros, Virgen María, religiosos, cátolico, maría reina de la paz, librería, librería maría reina de la paz, libreriamariareinadelapaz"/>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Courgette&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/favicon.ico"></link>

      </Head>

      <Navbar user={user} SetUser={SetUser} cart={cart} SetCart={SetCart} />

      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} user={user} key={router.route} SetUser={SetUser} cart={cart} SetCart={SetCart} />
      </AnimatePresence>
      <Footer/>
    </>
  )
}

export default MyApp
