import React, { useEffect, useState } from 'react'
import ProductsListComponent from '../../helpers/components/CategoryProductsListComponent';
import axios from '../../axios/CategoryAxios';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
const Category = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [category, SetCategory] = useState(false);


    useEffect(() => {
        if (slug) {
            axios.retrieveCategory(slug, SetCategory);

        }
    }, [slug, router.asPath])


    return (
        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ProductsListComponent category={category}  />
        </motion.div>
    )
}

export default Category
