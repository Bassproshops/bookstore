import React from 'react'
import Link from 'next/link';
import {HiMail} from 'react-icons/hi'

const Footer = () => {
    return (
        <footer>
            <div className="info">

                <div className="logo-and-brand">
                    <img src="/favicon.svg" alt="logo"/>
                    <h3><Link href="/">Librería María Reyna de la Paz</Link></h3>
                </div>

            </div>

            <div className="credits">
                <h4 className ="align-svg"><span className="svg"><HiMail/></span><span className="txt">asuntosmariareina@hotmail.com</span></h4>
                <h3>
                    <a href="https://raulmirandawebdev.com">
                        <img src="/raullogo.svg" alt="raul logo"/>
                        <small>Desarrollado por Raúl Miranda </small>
                    </a>
                </h3>
            </div>
        </footer>
    )
}

export default Footer
