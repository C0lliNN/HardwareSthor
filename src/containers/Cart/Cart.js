import PropTypes from 'prop-types';
import React from 'react';
import classes from './Cart.module.css';
import { Card, Button } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';

const Cart = (props) => {
  const productsElements = props.cart.map((product) => (
    <CartItem
      key={product.id}
      id={product.id}
      title={product.title}
      unitPrice={product.totalPrice}
      quantity={product.quantity}
      img={product.img}
      url={product.url}
      width="100%"
    />
  ));

  const buyNowHandler = () => {
    props.history.push('/checkout');
  };

  return (
    <section className={classes.Cart}>
      <Card
        title={props.intl.formatMessage({
          id: 'Cart.Cart',
          defaultMessage: 'Cart'
        })}
        headStyle={{
          fontSize: '1.8em',
          textAlign: 'center'
        }}
        style={{
          boxShadow: '0px 0px 2px rgba(48, 48, 48, 0.3)'
        }}
      >
        <ul>{productsElements}</ul>

        {props.cart.length > 0 ? (
          <div className={classes.BuyNowDiv}>
            <Button
              type="primary"
              size="large"
              onClick={buyNowHandler}
              className={classes.BuyNow}
            >
              <FormattedMessage id="Cart.BuyNow" defaultMessage="Buy Now" />
            </Button>
          </div>
        ) : (
          <div className={classes.Empty}>
            <FormattedMessage id="CartItem.Empty" defaultMessage="Empty" />
          </div>
        )}
      </Card>
    </section>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func
  }).isRequired
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Cart)));
