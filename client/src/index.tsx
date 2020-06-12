import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';

import './styles/owl.theme.default.scss';
import './styles/owl.carousel.scss';
import './styles/main_styles.scss';
// import './components/RatingModal/RateModal.scss';

import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';

ReactDOM.render(
  <React.StrictMode>
    {/* redux provider insert here, extract it to the map state to props  */}
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        {/* <Route
          path="/property-result/:id"
          render={(props) => <PropertyResult {...props} />}
        />
        <Route path="/add-property" exact component={AddProperty} /> */}
      </Switch>
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
