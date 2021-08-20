import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from '../axios/ProductsAxios';
import Link from 'next/link';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

import 'react-awesome-slider/dist/styles.css';

export default function Home() {

  const [products, SetProducts] = useState([]);

  useEffect(() => {
    axios.getPopular(SetProducts);
  }, [])

  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <>
      {/* <div className="container separate slider">
        <div className="container " style={{ width:'60%' }}>
          <AutoplaySlider play={true} interval={6000} bullets={false} mobileTouch={true} fillParent={false} animation="cubeAnimation">
            <div style={{ backgroundImage: `url(${products[1] ? products[1].image : ''})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} />
            <div style={{ backgroundImage: `url(${products[2] ? products[2].image : ''})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} />
            <div style={{ backgroundImage: `url(${products[3] ? products[3].image : ''})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} />
            <div style={{ backgroundImage: `url(${products[4] ? products[4].image : ''})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} />
            <div style={{ backgroundImage: `url(${products[5] ? products[5].image : ''})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} />
          </AutoplaySlider>
        </div>
      </div> */}



      <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="home-header">Nuestros Productos más Populares</h2>
        <div className="product-grid container separate">

          {
            products.map(product => {
              return (
                <Link href={`/producto/${product.slug}/`} key={product.id}>
                  <div className="home-product" >

                    <div className="img-content">
                      {console.log(product.image)}
                      {product.image &&

                        <img src={product.image} alt="product-preview" />
                      }
                    </div>

                    <div className="product-content">

                      <h2>{product.name}</h2>
                      <p className="price">
                        ${product.deal ? product.special_price : `${product.price}`}
                      </p>
                      {
                        product.deal &&
                        <p className="old-price">${product.price}</p>
                      }
                    </div>

                  </div>
                </Link>
              )
            })
          }

        </div>
      </motion.div>
    </>
  )
}
