import React from 'react'
import OrderMotion from '../../helpers/components/OrdersTable';
import { motion } from 'framer-motion'

const Ordenes = ({ user }) => {
    return (
        <motion.div className="container separate" initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {user.is_staff &&
                <OrderMotion />
            }
        </motion.div>
    )
}

export default Ordenes
