import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import store from './store';
import Home from './pages/Home/';
import Login from './pages/Login/';
import Admin from './pages/Admin/';
import NotFound from './pages/NotFound';
import Header from 'layouts/Header';
import { AuthStore } from 'LocalStorage';
import 'styles/globalStyles';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      AuthStore.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/login' />
      )}
    />
  );
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <AuthRoute path='/admin' component={Admin} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  };

};

export default App;
