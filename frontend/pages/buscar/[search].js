import React from 'react'

import { useRouter } from 'next/router';
import {motion} from 'framer-motion';

import ProductsListComponent from '../../helpers/components/ProductsListComponent';
const Search = () => {
    const router = useRouter();
    const { search } = router.query;

    return (
        <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ProductsListComponent search={search} />
        </motion.div>
    )
}

export default Search
