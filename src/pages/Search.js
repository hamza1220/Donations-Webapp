import React, { Component } from 'react';
import axios from 'axios';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import '../App.css'
import '../styles/Forms.css'



class Search extends Component {
  constructor(props) {
  	super(props);
    this.state = {
      cnic: '',
      result: {},
      error: '',
    };
  }

  changeCNIC = e =>{
  	this.setState({cnic: e.target.value})
  }

  search = e =>{
  	if(this.state.cnic===''){
  		this.setState({error: 'Enter a CNIC Number', result: {}}); 
  		return;
  	}
  	else{
  		
  		this.setState({error: ''})
        axios.get('http://203.101.178.74:7620/public-api/claimant.php', {
		    params: {
		      cnic: this.state.cnic
		    }
		})
		.then(res=>{
			console.log(JSON.stringify(res))
			if (res.status===204){
				this.setState({error: 'Claimant with this CNIC does not exist', result: {}})
			}
			else{
				this.setState({error: '', result: res.data})
			}
		})
		.catch(err=>{
			console.log(JSON.stringify(err.response))
			this.setState({error: JSON.stringify(err.response.data.message), result: {}})
		})
  	}
  }

  render() {

    return (
    <div className="App">
      	
        <h2> Search Page </h2>
        <div className="form spacer-20">
	        <div className="left double-input spacer-20" style={{width: '100%'}}>
		        <span className="label">CNIC</span><br/>
        		<input type="string" value={this.state.cnic} placeholder="Enter Claimant's CNIC" onChange = {e=>{this.changeCNIC(e)}}/>
        	</div>
        	<div>
        		<button type="submit" form="form" className="form-btn" onClick={e=>{this.search(e)}}>Search</button>
	    	</div>
        </div>
        
        <br/><br/>
        <div className = {Object.keys(this.state.result).length === 0? "hide":"form search-result"}>
        	<b className = "left w-31">Ration Claimant ID:</b> <span className="right w-66 phone-spacer">{this.state.result? this.state.result.id:'N/A'}</span><br/>
        	<b className = "left w-31">Name:</b> <span className="right w-66 phone-spacer">{this.state.result? this.state.result.name:'N/A'}</span><br/>
        	<b className = "left w-31">CNIC:</b> <span className="right w-66 phone-spacer">{this.state.result? this.state.result.cnic:'N/A'}</span><br/>
        	<b className = "left w-31">Gender:</b> <span className="right w-66 phone-spacer">{this.state.result? (this.state.result.gender==='M'? 'Male': 'Female'):'N/A'}</span><br/>
        	<b className = "left w-31">Cell Number:</b> <span className="right w-66 phone-spacer">{this.state.result? this.state.result.phone_number:'N/A'}</span><br/>
        	<b className = "left w-31">Occupation:</b> <span className="right w-66 phone-spacer">{this.state.result? this.state.result.occupation:'N/A'}</span><br/>
        	<b className = "left w-31">Family Size:</b> <span className="right w-66 phone-spacer">{this.state.result? this.state.result.family_size:'N/A'}</span><br/>
        	<b className = "left w-31">Area:</b> <span className="right w-66 phone-spacer">{this.state.result? this.state.result.area:'N/A'}</span><br/>
        	<b className = "left w-31">Address:</b> <span className="right w-66 phone-spacer">{this.state.result? (this.state.result.address? this.state.result.address: 'Not Specified'):'N/A'}</span><br/>
        	<b className = "left w-31">Ration Last Claimed:</b> <span className="right w-66 phone-spacer">{this.state.result? (this.state.result.latest_distribution_date? this.state.result.latest_distribution_date: 'Not Collected Yet'):'N/A'}</span><br/>
        </div>

        <br/><br/>
      	<div className={this.state.error? "isa_error":null}>
         {this.state.error? <div><FontAwesomeIcon className="icon" icon={faTimesCircle} /><b>{this.state.error}</b></div>:null}
        </div>

    </div>
    );
  }
}
export default Search;