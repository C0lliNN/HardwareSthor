import React, { Suspense, lazy} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';

import MainPage from './containers/MainPage/MainPage';
import { Spin } from 'antd';
import Spinner from './components/UI/Spinner/Spinner';

const Category = lazy(() => import('./containers/Category/Category'))
const Cart = lazy(() => import('./containers/Cart/Cart'))
const Login = lazy(() => import('./containers/Login/Login'))
const Signup = lazy(() => import('./containers/Signup/Signup'))





const App = () => (
  <main className="App">
    <BrowserRouter>
        <Switch>
          <Route path="/admin" render={() => {}}/>
          <Route path="/" component={Header}/>
        </Switch>
        <Switch>
          <Route path="/test" render={() => <Spinner/>}/>
          <Route path="/category/:category" render={() => (
            <Suspense fallback={<Spinner/>}>
                <Category/>
            </Suspense>
          )}/>

          <Route path="/cart" render={() => (
            <Suspense fallback={<Spinner/>}>
                <Cart/>
            </Suspense>
          )}/>

          <Route path="/login" render={() => (
            <Suspense fallback={<Spinner/>}>
                <Login/>
            </Suspense> )}/>

          <Route path="/signup" render={() => (
            <Suspense fallback={<Spinner/>}>
                <Signup/>
            </Suspense>
          )}/>
          <Route path="/" component={MainPage}/>
        </Switch>
        
    </BrowserRouter>
  </main>
);

export default App;