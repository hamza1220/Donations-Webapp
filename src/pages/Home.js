import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import '../App.css'
import '../styles/Home.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donated: 0,
      packages: 0,
      claimants: 0,
    };
  } 

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://203.101.178.74:7620/public-api/stats.php',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res=>{
      // console.log("get")
      // console.log(res.data)
      this.setState({donated:res.data.amount, packages:res.data.count_package,claimants:res.data.count_remaining_people})
      // Set state here
    })
  }

  render() {
    return (
      <div className="App container">  
        <h2> COVID-19 Donations</h2>
        <div className = "stats-container">
          <div className="card-container left res-2">
            <div className="card w-31">
              <p className="stat">{this.state.donated}</p>
              Rs. Donated
            </div>
          </div>

          <div className="card-container left res-2">
            <div className="card w-31" >
              <p className="stat">{this.state.packages}</p>
              Packages Distributed
            </div>
          </div>

          <div className="card-container left res-nl">
            <div className="card w-31">
              <p className="stat">{this.state.claimants}</p>
              People waiting to be Fed
            </div>
          </div>

        </div>


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