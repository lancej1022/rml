import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';

import './styles/owl.theme.default.scss';
import './styles/owl.carousel.scss';
import './styles/main_styles.scss';
// import './components/RatingModal/RateModal.scss';

import Home from './views/Home';

ReactDOM.render(
  <React.StrictMode>
    {/* redux provider insert here, extract it to the map state to props  */}
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact render={(props) => <Home {...props} />} /> */}
        <Route path="/" exact>
          <Home />
        </Route>
        {/* <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route path="/signup" exact render={(props) => <Signup {...props} />} />
          <Route
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
