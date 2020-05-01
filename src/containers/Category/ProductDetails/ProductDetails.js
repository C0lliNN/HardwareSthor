import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classes from './ProductDetails.module.css';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Product from './Product/Product';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { injectIntl } from 'react-intl';
import MyBreadcrumb from '../../../components/MyBreadcrumb/MyBreadcrumb';
import Footer from '../../../components/Footer/Footer';

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryId = props.match.params.category;
  const productId = props.match.params.product;

  const buyHandler = () => {
    if (!props.cart.find((p) => p.id === productId)) {
      props.addProduct({
        ...product,
        url: props.location.pathname
      });
      notification['success']({
        message: props.intl.formatMessage({
          id: 'ProductDetails.ProductAdded',
          defaultMessage: 'Product Added to the Cart'
        }),
        placement: 'topLeft',
        duration: 2
      });
    }
  };

  const quantityHandler = (number) => {
    setProduct({
      ...product,
      quantity: number
    });
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://firestore.googleapis.com/v1/projects/hardwaresthor/databases/(default)/documents/categories/${categoryId}/products/${productId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        const transformedProduct = {};
        transformedProduct['id'] = response.name.split('/').pop();
        transformedProduct['img'] = response.fields.img.stringValue;
        transformedProduct['quantity'] = 1;
        transformedProduct['totalPrice'] =
          response.fields.total_price.doubleValue;
        transformedProduct['title'] = response.fields.title.stringValue;
        transformedProduct['discountPrice'] =
          response.fields.discount_price.doubleValue;

        let description = null;

        if (response.fields.description.arrayValue.values) {
          description = response.fields.description.arrayValue.values.map(
            (item) => {
              let data = null;

              if (
                item.mapValue.fields.data &&
                Array.isArray(item.mapValue.fields.data.arrayValue.values)
              ) {
                data = item.mapValue.fields.data.arrayValue.values.map(
                  (subItem) => {
                    return subItem.stringValue;
                  }
                );
              }

              return {
                title: item.mapValue.fields.title.stringValue,
                data: data
              };
            }
          );
        }

        transformedProduct['description'] = description;

        setProduct(transformedProduct);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        setProduct(null);
      });
  }, [categoryId, productId]);

  const { categories, getCategories } = props;

  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, [categories, getCategories]);

  let content = null;

  if (product) {
    content = (
      <Product
        product={product}
        quantityHandler={quantityHandler}
        buyHandler={buyHandler}
      />
    );
  }

  if (isLoading) {
    content = <Spinner />;
  }

  if (error) {
    content = <ErrorMessage message={error.message} />;
  }

  return (
    <div className={classes.ProductDetails}>
      <section>
        <MyBreadcrumb />
        {content}
      </section>
      {!isLoading && <Footer />}
    </div>
  );
};

ProductDetails.propTypes = {
  addProduct: PropTypes.func,
  cart: PropTypes.array,
  categories: PropTypes.array,
  getCategories: PropTypes.func,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }),
  location: PropTypes.shape({
    pathname: PropTypes.any
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
      product: PropTypes.string
    })
  })
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    categories: state.categories.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(actionCreators.addProduct(product)),
    getCategories: () => dispatch(actionCreators.getCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withRouter(ProductDetails)));
