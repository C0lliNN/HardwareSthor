import PropTypes from "prop-types";
import React from "react";
import classes from "./ProductList.module.css";
import ProductItem from "./ProductItem/ProductItem";

const ProductList = (props) => {
  return (
    <div className={classes.ProductList}>
      {props.products.map((product) => (
        <ProductItem
          key={product.id}
          imgHolderWidth={props.imgHolderWidth}
          id={product.id}
          link={product.link}
          title={product.title}
          img={product.img}
          totalPrice={product.totalPrice}
          discountPrice={product.discountPrice}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  imgHolderWidth: PropTypes.string,
  products: PropTypes.array,
};

export default ProductList;
