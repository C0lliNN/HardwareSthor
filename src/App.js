import PropTypes from 'prop-types';
import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './containers/MainPage/MainPage';
import Spinner from './components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

const Category = lazy(() => import('./containers/Category/Category'));
const Cart = lazy(() => import('./containers/Cart/Cart'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Login = lazy(() => import('./containers/Login/Login'));
const Logout = lazy(() => import('./containers/Logout/Logout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Signup = lazy(() => import('./containers/Signup/Signup'));
const ProductDetails = lazy(() =>
  import('./containers/Category/ProductDetails/ProductDetails')
);

const App = (props) => {
  const { checkAuth } = props;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <main className="App">
      <BrowserRouter>
        <Header />

        <Switch>
          <Route
            path="/category/:category/product/:product"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <ProductDetails />
              </Suspense>
            )}
          />

          <Route
            path="/category/:category"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Category />
              </Suspense>
            )}
          />

          <Route
            path="/cart"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Cart />
              </Suspense>
            )}
          />

          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <Checkout />
                <Footer position="absolute" />
              </Suspense>
            )}
          />

          {!props.isAuth ? (
            <Route
              path="/login"
              render={() => (
                <Suspense fallback={<Spinner />}>
                  <Login />
                  <Footer position="absolute" />
                </Suspense>
              )}
            />
          ) : (
            <Redirect
              from="/login"
              to={props.isInCheckout ? '/checkout' : ''}
            />
          )}

          {props.isAuth && (
            <Route
              path="/logout"
              render={() => (
                <Suspense fallback={<Spinner />}>
                  <Logout />
                </Suspense>
              )}
            />
          )}

          {props.isAuth && (
            <Route
              path="/orders"
              render={() => (
                <Suspense fallback={<Spinner />}>
                  <Orders />
                </Suspense>
              )}
            />
          )}

          {!props.isAuth ? (
            <Route
              path="/signup"
              render={() => (
                <Suspense fallback={<Spinner />}>
                  <Signup />
                  <Footer position="absolute" />
                </Suspense>
              )}
            />
          ) : (
            <Redirect from="/signup" to="" />
          )}

          <Route to="/" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
};

App.propTypes = {
  checkAuth: PropTypes.func,
  isAuth: PropTypes.bool,
  isInCheckout: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    isInCheckout: state.auth.isInCheckout
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(actionCreators.checkAuth())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
