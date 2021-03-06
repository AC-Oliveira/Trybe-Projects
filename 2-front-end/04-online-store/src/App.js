import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import SearchBar from './components/SearchBar';
import ProductDetails from './components/ProductDetails';
import CheckoutPage from './components/CheckoutPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<SearchBar />) }
          />
          <Route exact path="/shoppingCart" component={ ShoppingCart } />
          <Route exact path="/details/:id" component={ ProductDetails } />
          <Route exact path="/checkout" component={ CheckoutPage } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
