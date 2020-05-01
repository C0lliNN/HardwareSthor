import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';
import messages_pt from './translations/pt.json';
import messages_en from './translations/en.json';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import AuthReducer from './store/reducers/auth';
import CartReducer from './store/reducers/cart';
import CategoriesReducer from './store/reducers/categories';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const messages = {
  pt: messages_pt,
  en: messages_en
};

const language = navigator.language.split(/[-_]/)[0];

const rootReducer = combineReducers({
  auth: AuthReducer,
  cart: CartReducer,
  categories: CategoriesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
