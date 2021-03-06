import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DonorForm from './pages/DonorForm'
import ClaimantForm from './pages/ClaimantForm'
import Search from './pages/Search'
import { loadReCaptcha } from 'react-recaptcha-google'


class App extends Component {
  componentDidMount() {
      loadReCaptcha();
  }

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/ration-drive/' component={Home}/>
          <Route path='/ration-drive/donate' component={DonorForm}/>
          <Route path='/ration-drive/claim'  component={ClaimantForm}/>
          <Route path='/ration-drive/search' component={Search}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;