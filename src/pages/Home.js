import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../App.css'
import './Home.css'

class Home extends Component {
  render() {
    return (
    <div className="App container">
      	
        <Link to='/sample'>
          <br/><br/><br/><br/>
          View Sample Components
        </Link>

        <div className="btn-container">
          <Link to='/donate' className="donor left w-33">
            Make a Donation
          </Link>
          <Link to='/claim' className="claimant left w-33">
            Claim Ration
          </Link>
          <Link to='/search' className="search left w-33">
            Find Claimants
          </Link>  
        </div>

    </div>
    );
  }
}
export default Home;