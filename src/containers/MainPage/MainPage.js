import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import classes from './MainPage.module.css';
import { Carousel, Row, Col, Typography } from 'antd';
import CarouselItem from '../../components/CarouselItem/CarouselItem';
import SideBar from '../../components/SideBar/SideBar';
import ProductList from '../../components/ProductList/ProductList';
import { FormattedMessage, injectIntl } from 'react-intl';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Footer from '../../components/Footer/Footer';

const { Title } = Typography;

const GET_OFFERS_START = 'GET_OFFERS_START';
const GET_OFFERS_SUCCESS = 'GET_OFFERS_SUCCESS';
const GET_OFFERS_FAIL = 'GET_OFFERS_FAIL';

const offersInitialState = {
  offers: [],
  isLoading: false,
  error: null
};

const offersReducer = (state, action) => {
  switch (action.type) {
    case GET_OFFERS_START: {
      return {
        offers: [],
        isLoading: true,
        error: null
      };
    }
    case GET_OFFERS_SUCCESS: {
      return {
        offers: action.offers,
        isLoading: false,
        error: null
      };
    }
    case GET_OFFERS_FAIL: {
      return {
        offers: [],
        isLoading: false,
        error: action.error
      };
    }

    default:
      return state;
  }
};

const GET_FEATURED_CONTENT_START = 'GET_FEATURED_CONTENT_START';
const GET_FEATURED_CONTENT_SUCCESS = 'GET_FEATURED_CONTENT_SUCCESS';
const GET_FEATURED_CONTENT_FAIL = 'GET_FEATURED_CONTENT_FAIL';

const featuredContentInitialState = {
  products: [],
  isLoading: false,
  error: null
};

const featuredContentReducer = (state, action) => {
  switch (action.type) {
    case GET_FEATURED_CONTENT_START: {
      return {
        products: [],
        isLoading: true,
        error: null
      };
    }
    case GET_FEATURED_CONTENT_SUCCESS: {
      return {
        products: action.products,
        isLoading: false,
        error: null
      };
    }
    case GET_FEATURED_CONTENT_FAIL: {
      return {
        products: [],
        isLoading: false,
        error: action.error
      };
    }
    default:
      return state;
  }
};

const MainPage = (props) => {
  const [offersState, offersDispatch] = useReducer(
    offersReducer,
    offersInitialState
  );

  const [featuredContentState, featuredContentDispatch] = useReducer(
    featuredContentReducer,
    featuredContentInitialState
  );

  const { intl } = props;

  useEffect(() => {
    const language = intl.locale === 'pt' ? 'pt' : 'en';

    offersDispatch({ type: GET_OFFERS_START });

    fetch(
      `https://us-central1-hardwaresthor.cloudfunctions.net/getOffers?language=${language}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const offers = response.result.map((product) => {
          return {
            ...product,
            totalPrice: product.price,
            discountPrice: product.price
          };
        });

        offersDispatch({
          type: GET_OFFERS_SUCCESS,
          offers: offers
        });
      })
      .catch((error) => {
        offersDispatch({ type: GET_OFFERS_FAIL, error: error });
      });
  }, [intl]);

  useEffect(() => {
    featuredContentDispatch({ type: GET_FEATURED_CONTENT_START });

    fetch(
      'https://firestore.googleapis.com/v1/projects/hardwaresthor/databases/(default)/documents/Featured%20Products'
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        const language = intl.locale === 'pt' ? 'pt' : 'en';

        const products = response.documents
          .map((product) => {
            return {
              id: product.name.split('/').pop(),
              title: product.fields.title.stringValue,
              img: product.fields.img.stringValue,
              language: product.fields.language.stringValue,
              totalPrice: product.fields.total_price.doubleValue,
              discountPrice: product.fields.discount_price.doubleValue,
              link: product.fields.link.stringValue
            };
          })
          .filter((product) => {
            return product.language === language;
          });

        featuredContentDispatch({
          type: GET_FEATURED_CONTENT_SUCCESS,
          products: products
        });
      })
      .catch((error) => {
        featuredContentDispatch({
          type: GET_FEATURED_CONTENT_FAIL,
          error: error
        });
      });
  }, [intl]);

  let featuredContent = null;

  if (featuredContentState.isLoading) {
    featuredContent = <Spinner />;
  }

  if (featuredContentState.products.length > 0) {
    featuredContent = (
      <Carousel autoplay className={classes.Carousel}>
        {featuredContentState.products.map((product) => (
          <CarouselItem
            key={product.id}
            id={product.id}
            title={product.title}
            img={product.img}
            fullLink={product.link}
            discountPrice={product.discountPrice}
            totalPrice={product.totalPrice}
          />
        ))}
      </Carousel>
    );
  }

  if (featuredContentState.error) {
    featuredContent = (
      <ErrorMessage message={featuredContentState.error.message} />
    );
  }

  let rightSideContent = null;

  if (offersState.isLoading) {
    rightSideContent = <Spinner />;
  }

  if (offersState.offers.length > 0) {
    rightSideContent = <ProductList products={offersState.offers} />;
  }

  if (offersState.error) {
    rightSideContent = <ErrorMessage message={offersState.error.message} />;
  }

  return (
    <div>
      {featuredContent}

      <Row align="top" justify="space-between" className={classes.Content}>
        <Col xs={0} md={8}>
          <SideBar />
        </Col>
        <Col xs={24} md={15} className={classes.Offers}>
          <Title level={3}>
            <FormattedMessage id="MainPage.Offers" defaultMessage="Offers" />
          </Title>

          {rightSideContent}
        </Col>
      </Row>
      {offersState.offers.length > 0 &&
        featuredContentState.products.length > 0 && (
          <Footer position="relative" />
        )}
    </div>
  );
};

MainPage.propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string
  }).isRequired
};

export default injectIntl(MainPage);
