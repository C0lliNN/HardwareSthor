import PropTypes from 'prop-types';
import React from 'react';
import classes from './Payment.module.css';
import PaypalButtons from '../../../components/PaypalButtons/PaypalButtons';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import OrderInformation from '../../../components/OrderInformation/OrderInformation';
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

const Payment = (props) => {
  const currencyCode =
    window.navigator.language.split('-')[0] === 'pt' ? 'BRL' : 'USD';

  const createOrder = (data, actions) => {
    let totalAmount = 0;

    for (const product of props.cart) {
      totalAmount += product.totalPrice * product.quantity;
    }

    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currencyCode,
            value: totalAmount
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      if (details.status === 'COMPLETED') {
        let totalAmount = 0;

        for (const product of props.cart) {
          totalAmount += product.totalPrice * product.quantity;
        }
        const orderInformation = {
          products: props.cart,
          totalAmount: totalAmount,
          transactionId: details.id
        };

        props.saveOrderInFirestore(orderInformation);
      }
    });
  };

  return (
    <div className={classes.Payment}>
      <Title level={3}>
        <FormattedMessage id="CheckoutSteps.Payment" defaultMessage="Payment" />
      </Title>
      <OrderInformation products={props.cart} />
      <PaypalButtons
        cart={props.cart}
        currencyCode={currencyCode}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  );
};

Payment.propTypes = {
  cart: PropTypes.array,
  saveOrderInFirestore: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Payment)));
