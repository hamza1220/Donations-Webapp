import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../App.css'
import '../styles/Home.css'

class Home extends Component {
  render() {
    return (
      <div className="App container">  
        <div className="btn-container">
          <Link to='/donate' className="donor left w-31">
            Make a Donation
          </Link>
          <Link to='/claim' className="claimant left w-31">
            Resigter Claimants
          </Link>
          <Link to='/search' className="search left w-31">
            Search Claimants
          </Link>  
        </div>
      </div>
    );
  }
}
export default Home;