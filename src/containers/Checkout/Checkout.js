import PropTypes from 'prop-types';
import React, { useState, lazy, Suspense, useEffect } from 'react';
import classes from './Checkout.module.css';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { withRouter, Route, Switch } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Login = lazy(() => import('./Login/Login'));
const Address = lazy(() => import('./Address/Address'));
const Payment = lazy(() => import('./Payment/Payment'));
const Done = lazy(() => import('./Done/Done'));

const Checkout = (props) => {
  const [checkoutInformation, setCheckoutInformation] = useState({
    userId: null,
    address: {},
    paid: false
  });

  const [error, setError] = useState(null);

  const setUserInformation = (user) => {
    setCheckoutInformation((prevState) => {
      return {
        ...prevState,
        userId: user
      };
    });
  };

  const setAddressInformation = (address) => {
    setCheckoutInformation((prevState) => {
      return {
        ...prevState,
        address: address
      };
    });
  };

  const saveOrderInFirestore = (orderInformation) => {
    const fields = {};
    fields['userId'] = { stringValue: checkoutInformation.userId };
    fields['address'] = {
      mapValue: {
        fields: {
          country: {
            stringValue: checkoutInformation.address.country
          },
          state: {
            stringValue: checkoutInformation.address.state
          },
          city: {
            stringValue: checkoutInformation.address.city
          },
          postalCode: {
            stringValue: checkoutInformation.address.postalCode
          },
          street: {
            stringValue: checkoutInformation.address.street
          },
          houseNumber: {
            stringValue: checkoutInformation.address.houseNumber
          }
        }
      }
    };

    const formattedProducts = orderInformation.products.map((product) => {
      return {
        mapValue: {
          fields: {
            id: {
              stringValue: product.id
            },
            title: {
              stringValue: product.title
            },
            url: {
              stringValue: product.url
            },
            img: {
              stringValue: product.img
            },
            quantity: {
              integerValue: product.quantity
            },
            unitPrice: {
              doubleValue: product.totalPrice
            }
          }
        }
      };
    });

    fields['orderInformation'] = {
      mapValue: {
        fields: {
          products: {
            arrayValue: {
              values: formattedProducts
            }
          },
          totalAmount: {
            doubleValue: orderInformation.totalAmount
          },
          transactionId: {
            stringValue: orderInformation.transactionId
          }
        }
      }
    };

    fetch(
      `https://firestore.googleapis.com/v1beta1/projects/hardwaresthor/databases/(default)/documents/users/${checkoutInformation.userId}/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token
        },
        body: JSON.stringify({
          fields: fields
        })
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        setCheckoutInformation((prevState) => {
          return {
            ...prevState,
            paid: true
          };
        });

        props.history.replace('/checkout/done');
      })
      .catch((error) => {
        setError(error);
      });
  };

  let current = -1;

  switch (props.location.pathname) {
    case '/checkout': {
      current = 0;
      break;
    }
    case '/checkout/address': {
      current = 1;
      break;
    }
    case '/checkout/payment': {
      current = 2;
      break;
    }
    case '/checkout/done': {
      current = 3;
      break;
    }
    default:
      current = 0;
  }

  const { history, cart } = props;

  useEffect(() => {
    if (!cart || !cart.length) history.replace('/');
  }, [history, cart]);

  return (
    <section className={classes.Checkout}>
      <div className={classes.DefaultSteps}>
        <CheckoutSteps current={current} size="default" />
      </div>
      <div className={classes.SmallSteps}>
        <CheckoutSteps current={current} size="small" />
      </div>

      {error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <Switch>
          <Route
            path="/checkout/address"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Address
                  setUserInformation={setUserInformation}
                  setAddressInformation={setAddressInformation}
                  checkoutInformation={checkoutInformation}
                />
              </Suspense>
            )}
          />
          <Route
            path="/checkout/payment"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Payment saveOrderInFirestore={saveOrderInFirestore} />
              </Suspense>
            )}
          />
          <Route
            path="/checkout/done"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Done
                  checkoutInformation={checkoutInformation}
                  clearCheckout={setCheckoutInformation}
                />
              </Suspense>
            )}
          />
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            )}
          />
        </Switch>
      )}
    </section>
  );
};

Checkout.propTypes = {
  cart: PropTypes.array,
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
  location: PropTypes.shape({
    pathname: PropTypes.any
  }),
  token: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
