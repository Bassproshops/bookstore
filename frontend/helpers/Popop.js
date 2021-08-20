import React from 'react'
import { motion } from 'framer-motion';

const Popop = ({ children, SetForm }) => {

    function cancel(e) {
        if (e.target.classList.contains('popop-container')) {
            const body = document.querySelector('body');
            if(body){
                body.style.overflowY = 'auto';
            }
            e.target.classList.add('transition');
            e.target.style.opacity = 0;
            setTimeout(() => {
                SetForm(false)
            }, 600)
        }
    }

    return (
        <motion.div initial={{ scale: .3, opacity: 0 }} exit={{ scale: .3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .25 }} className="popop-container" onClick={cancel}>
            <div className="popop">
                {children}
            </div>
        </motion.div>
    )
}

export default Popop
