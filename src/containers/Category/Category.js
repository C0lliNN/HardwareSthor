import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classes from './Category.module.css';
import { Row, Col } from 'antd';
import ProductList from '../../components/ProductList/ProductList';
import SideBar from '../../components/SideBar/SideBar';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { injectIntl } from 'react-intl';
import MyBreadcrumb from '../../components/MyBreadcrumb/MyBreadcrumb';
import Footer from '../../components/Footer/Footer';

const Category = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [categoryId, setCategoryId] = useState();

  const { length } = products;
  const params = props.match.params;

  const language = props.intl.locale === 'pt' ? 'pt' : 'en';

  useEffect(() => {
    if (categoryId !== params.category) {
      setIsLoading(true);

      fetch(
        `https://us-central1-hardwaresthor.cloudfunctions.net/getProducts?language=${language}&categoryId=${params.category}`
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.error) {
            throw new Error(response.error.message);
          }

          setProducts(
            response.result.map((document) => {
              return {
                id: document.id,
                img: document.img,
                title: document.title,
                totalPrice: document.total_price,
                discountPrice: document.discount_price,
                description: document.description
              };
            })
          );

          setCategoryId(params.category);
          setIsLoading(false);
        })
        .catch((error) => {
          setCategoryId(params.category);
          setIsLoading(false);
          setError(error);
        });
    }
  }, [setProducts, params, length, categoryId, language]);

  let content = null;

  if (products.length) {
    content = <ProductList products={products} />;
  }

  if (isLoading) {
    content = <Spinner />;
  }

  if (error) {
    content = <ErrorMessage message={error.message} />;
  }

  return (
    <div className={classes.Category}>
      <div>
        <MyBreadcrumb />
        <Row align="top" justify="space-between" style={{ marginTop: '20px' }}>
          <Col xs={0} md={8}>
            <SideBar />
          </Col>
          <Col xs={24} md={15} className={classes.Products}>
            {content}
          </Col>
        </Row>
      </div>

      {products.length > 0 && <Footer position="relative" />}
    </div>
  );
};

Category.propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.any
    })
  })
};

export default injectIntl(withRouter(Category));
