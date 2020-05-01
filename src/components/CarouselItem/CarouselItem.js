import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import classes from './CarouselItem.module.css';
import { Button, Row, Col, notification, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

const { Title, Paragraph } = Typography;

const CarouselItem = (props) => {
  const {
    history,
    fullLink,
    addProduct,
    id,
    title,
    img,
    totalPrice,
    discountPrice,
    cart,
    intl
  } = props;

  const showDetails = useCallback(() => {
    history.push(fullLink);
  }, [history, fullLink]);

  const buy = useCallback(() => {
    const product = {
      id: id,
      title: title,
      img: img,
      totalPrice: totalPrice,
      quantity: 1,
      discountPrice: discountPrice,
      url: fullLink
    };

    if (!cart.find((p) => p.id === id)) {
      addProduct(product);

      notification['success']({
        message: intl.formatMessage({
          id: 'ProductDetails.ProductAdded',
          defaultMessage: 'Product Added to the Cart'
        }),
        placement: 'topLeft',
        duration: 2
      });
    }
  }, [
    addProduct,
    id,
    title,
    img,
    totalPrice,
    discountPrice,
    fullLink,
    cart,
    intl
  ]);

  return (
    <article className={classes.CarouselItem}>
      <Title level={2}>{props.title}</Title>
      <Row align="middle">
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className={classes.ImgBox}>
            <img src={props.img} alt={props.title} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className={classes.PriceBox}>
            <Title level={4} className={classes.DiscountPrice}>
              {props.intl.formatMessage({
                id: 'CarouselItem.Currency',
                defaultMessage: '$ '
              }) + props.discountPrice.toFixed(2)}
            </Title>

            <Paragraph className={classes.InCash}>
              <FormattedMessage
                id="CarouselItem.Cash"
                defaultMessage="in cash"
              />
            </Paragraph>

            <Title level={4} className={classes.TotalPrice}>
              {props.intl.formatMessage({
                id: 'CarouselItem.Currency',
                defaultMessage: '$ '
              }) + props.totalPrice.toFixed(2)}
            </Title>

            <Paragraph className={classes.InInstallments}>
              <FormattedMessage
                id="CarouselItem.Installments"
                defaultMessage="in ten installments"
              />
            </Paragraph>

            <div className={classes.ButtonBox}>
              <div>
                <Button
                  type="primary"
                  size="large"
                  className={classes.BuyButton}
                  onClick={buy}
                >
                  <FormattedMessage
                    id="CarouselItem.Buy"
                    defaultMessage="Buy"
                  />
                </Button>
              </div>

              <div>
                <Button type="primary" size="large" onClick={showDetails}>
                  <FormattedMessage
                    id="CarouselItem.Details"
                    defaultMessage="Details"
                  />
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </article>
  );
};

CarouselItem.propTypes = {
  addProduct: PropTypes.func.isRequired,
  cart: PropTypes.array,
  discountPrice: PropTypes.number,
  fullLink: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }).isRequired,
  title: PropTypes.string.isRequired,
  totalPrice: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(actionCreators.addProduct(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withRouter(CarouselItem)));
