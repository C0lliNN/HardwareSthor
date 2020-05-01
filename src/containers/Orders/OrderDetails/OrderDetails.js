import PropTypes from 'prop-types';
import React from 'react';
import classes from './OrderDetails.module.css';
import { Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ProductList from '../../../components/ProductList/ProductList';

const { Title, Paragraph, Text } = Typography;

const OrderDetails = (props) => {
  const order = props.orders.find((item) => item.id === props.match.params.id);

  if (order) {
    order.orderInformation.products = order.orderInformation.products.map(
      (product) => {
        return {
          ...product,
          totalPrice: product.unitPrice,
          link: product.url
        };
      }
    );
  }

  return (
    <section className={classes.OrderDetails}>
      {order && (
        <React.Fragment>
          <Title level={2}>
            <FormattedMessage id="OrderDetails.Order" defaultMessage="Order" />
            &nbsp;#{props.match.params.id}
          </Title>

          <Paragraph className={classes.Paragraph}>
            ID: <Text>{props.match.params.id}</Text>
          </Paragraph>

          <Paragraph className={classes.Paragraph}>
            <FormattedMessage
              id="OrderDetails.Products"
              defaultMessage="Products"
            />
          </Paragraph>

          <ProductList
            products={order.orderInformation.products}
            imgHolderWidth="15%"
          />

          <Paragraph className={classes.Paragraph}>
            <FormattedMessage
              id="CheckoutSteps.Address"
              defaultMessage="Address"
            />
            :&nbsp;
            <Text>{`${order.address.country}/${order.address.state} - ${order.address.city}, ${order.address.postalCode}, ${order.address.street}, ${order.address.houseNumber}`}</Text>
          </Paragraph>
        </React.Fragment>
      )}
    </section>
  );
};

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  orders: PropTypes.array
};

export default withRouter(OrderDetails);
