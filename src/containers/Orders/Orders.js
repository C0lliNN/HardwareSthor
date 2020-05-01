import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classes from './Orders.module.css';
import { Typography } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Switch, Route } from 'react-router-dom';
import OrderDetails from './OrderDetails/OrderDetails';

const { Title } = Typography;

const Orders = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  const { userId, token } = props;

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://firestore.googleapis.com/v1/projects/hardwaresthor/databases/(default)/documents/users/${userId}/orders/`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        if (response.documents && Array.isArray(response.documents)) {
          setOrders(
            response.documents.map((document) => {
              return {
                id: document.name.split('/').pop(),
                date: new Date(document.createTime),
                address: {
                  country:
                    document.fields.address.mapValue.fields.country.stringValue,
                  state:
                    document.fields.address.mapValue.fields.state.stringValue,
                  city:
                    document.fields.address.mapValue.fields.city.stringValue,
                  postalCode:
                    document.fields.address.mapValue.fields.postalCode
                      .stringValue,
                  street:
                    document.fields.address.mapValue.fields.street.stringValue,
                  houseNumber:
                    document.fields.address.mapValue.fields.houseNumber
                      .stringValue
                },
                userId: document.fields.userId.stringValue,
                orderInformation: {
                  products: document.fields.orderInformation.mapValue.fields.products.arrayValue.values.map(
                    (product) => {
                      return {
                        id: product.mapValue.fields.id.stringValue,
                        quantity: product.mapValue.fields.quantity.integerValue,
                        title: product.mapValue.fields.title.stringValue,
                        unitPrice:
                          product.mapValue.fields.unitPrice.doubleValue,
                        url: product.mapValue.fields.url.stringValue,
                        img: product.mapValue.fields.img.stringValue
                      };
                    }
                  ),
                  totalAmount:
                    document.fields.orderInformation.mapValue.fields.totalAmount
                      .doubleValue,
                  transactionId:
                    document.fields.orderInformation.mapValue.fields
                      .transactionId.stringValue
                }
              };
            })
          );
        } else {
          setOrders([]);
        }

        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setOrders(null);
        setIsLoading(false);
        setError(error);
      });
  }, [userId, token]);

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  }

  if (orders) {
    if (orders.length) {
      const sortedOrders = orders.sort((a, b) => b.date - a.date);

      content = (
        <ul className={classes.OrdersList}>
          {sortedOrders.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </ul>
      );
    } else {
      content = (
        <Title level={4} className={classes.Empty}>
          <FormattedMessage id="CartItem.Empty" defaultMessage="Empty" />
        </Title>
      );
    }
  }

  if (error) {
    content = <ErrorMessage message={error.message} />;
  }

  return (
    <section className={classes.Orders}>
      <div>
        <Switch>
          <Route
            path="/orders/:id"
            render={() => <OrderDetails orders={orders} />}
          />
          <Route
            path="/orders"
            render={() => (
              <div>
                <Title level={2}>
                  <FormattedMessage
                    id="LinkList.Orders"
                    defaultMessage="Orders"
                  />
                </Title>
                {content}
              </div>
            )}
          />
        </Switch>
      </div>
    </section>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps)(injectIntl(Orders));
