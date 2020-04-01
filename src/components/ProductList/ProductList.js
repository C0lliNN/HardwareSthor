import React from 'react'
import classes from './ProductList.module.css'
import ProductItem from './ProductItem/ProductItem';

const ProductList = props => {

    console.log(classes)

    return (
        <div className={classes.ProductList}>
            {props.products.map(product => (
                <ProductItem 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    img={product.img}
                    totalPrice={product.totalPrice}
                    discountPrice={product.discountPrice}/>
                    
            ))}
        </div>
    )
}

export default ProductList;