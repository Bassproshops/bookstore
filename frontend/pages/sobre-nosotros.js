import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';

import { BsArrowRight } from 'react-icons/bs';
import { FaMapMarkerAlt, FaPhone, FaCalendarDay } from 'react-icons/fa';

const SobreNosotros = () => {

    return (
        <>

            <motion.div className="about-us-cont" initial={{ opacity: 0, }} transition={{ duration: 1, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }}>
                <h2 className="home-header">Misión</h2>
                <div className="container">
                    <div className="history">
                        <p>María Reyna de la Paz es una tienda y librería católica, no lucrativa, que desde 2015 tiene como objetivo principal surtir a los fieles católicos con artículos y libros que apoyan su fe y la fortalecen y a la vez apoyar, dentro de sus posibilidades, con donativos a diferentes instituciones del a Iglesia Católica.</p>
                    </div>
                </div>

                <h2 className="home-header">Nuestros Locales</h2>
                <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-container">
                    <AnimatePresence>
                        <motion.div initial={{ opacity: 0, }} transition={{ duration: .5, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} className="about-us-card">
                            <div className="image-content">
                                <img alt="Our Logo" src="/white-logo.svg" />
                            </div>
                            <p className="align-svg">
                                <span className="txt"><FaMapMarkerAlt /></span>
                                <span className="svg">Sucursal Prado Norte</span>
                            </p>
                            <p>Cto. Comercial Casa Prado, local 6</p>
                            <p>Ave. Prado Norte #565</p>
                            <p>Lomas de Chapultepec</p>
                            <br />
                            <br />
                            <p className="align-svg">
                                <span className="svg"><FaPhone /></span>
                                <span className="txt">55 55 20 98 36</span>
                            </p>
                            <p className="align-svg">
                                <span className="svg"><FaCalendarDay /></span>
                                <span className="txt"> lunes a viernes de 10 a 5; sábado de 10 a 2</span>
                            </p>
                            <p>Email: mariareynapn@gmail.com</p>
                            <p></p>
                            <a href="https://www.instagram.com/mariareynadelapazpradonorte/?hl=es" className="align-svg"><span className="txt">Instagram: @mariareynadelapazpradonorte</span></a>


                            <a href="https://www.google.com.mx/maps/place/Librer%C3%ADa+Mar%C3%ADa+Reyna+de+la+Paz+Casa+Prado/@19.4218505,-99.2185081,13.5z/data=!4m9!1m2!2m1!1smar%C3%ADa+reyna+de+la+paz!3m5!1s0x85d201d83e71b8ff:0x5f8cb2e6ce12d77c!8m2!3d19.4268599!4d-99.2141528!15sChZtYXLDrWEgcmV5bmEgZGUgbGEgcGF6WhgiFm1hcsOtYSByZXluYSBkZSBsYSBwYXqSARRyZWxpZ2lvdXNfYm9va19zdG9yZQ">
                                <div className="btn-link">
                                    <p className="align-svg">
                                        <span className="txt">Ver Ubicación</span>
                                        <span className="svg"><BsArrowRight /></span>
                                    </p>
                                </div>
                            </a>

                        </motion.div>

                        <motion.div initial={{ opacity: 0, }} transition={{ duration: .5, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} className="about-us-card">
                            <div className="image-content">
                                <img alt="Our Logo" src="/white-logo.svg" />
                            </div>
                            <p className="align-svg">
                                <span className="svg"><FaMapMarkerAlt /></span>
                                <span className="txt">Centro Comercial Shopping Plaza.</span>
                            </p>
                            <p>Ave.Lomas Verdes 640, local 60.</p>
                            <p>Lomas Verdes 1a sección.</p>
                            <p>Naucalpan, Edo. de México, CP 53120</p>
                            <br />
                            <p className="align-svg">
                                <span className="svg"><FaPhone /></span>
                                <span className="txt">55 55 62 87 77</span>
                            </p>
                            <p className="align-svg">
                                <span className="svg"><FaCalendarDay /></span>
                                <span className="txt"> lunes a viernes de 10 a 5; sábado de 10 a 2</span>
                            </p>
                            <p>Email: asuntosmariareina@hotmail.com</p>
                            <p>Whatsapp: 55 4551 4962</p>

                            <p className="align-svg"><span className="txt">Instagram: @libreriamariareinadelapaz</span></p>

                            <a href="https://www.google.com.mx/maps/place/Librer%C3%ADa+Mar%C3%ADa+Reyna+de+la+Paz,+suc.+Lomas+Verdes/@19.4664561,-99.2716979,13z/data=!4m9!1m2!2m1!1smar%C3%ADa+reyna+de+la+paz!3m5!1s0x85d2033ed1bdf5ad:0x26f4e394cd6f071c!8m2!3d19.5061052!4d-99.2592507!15sChZtYXLDrWEgcmV5bmEgZGUgbGEgcGF6WhgiFm1hcsOtYSByZXluYSBkZSBsYSBwYXqSARRyZWxpZ2lvdXNfYm9va19zdG9yZQ">
                                <div className="btn-link">
                                    <p className="align-svg">
                                        <span className="txt">Ver Ubicación</span>
                                        <span className="svg"><BsArrowRight /></span>
                                    </p>
                                </div>
                            </a>
                        </motion.div>

                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </>
    )
}

export default SobreNosotros
