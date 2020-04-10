import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DonorForm from './pages/DonorForm'
import ClaimantForm from './pages/ClaimantForm'
import Search from './pages/Search'


class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/donate' component={DonorForm}/>
          <Route path='/claim'  component={ClaimantForm}/>
          <Route path='/search' component={Search}/>
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