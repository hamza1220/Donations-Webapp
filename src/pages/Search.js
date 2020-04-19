import React, { Component } from 'react';
import axios from 'axios';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReCaptcha } from 'react-recaptcha-google'

import '../App.css'
import '../styles/Forms.css'


class Search extends Component {
  constructor(props) {
  	super(props);
    this.state = {
      cnic: '',
      result: {},
      error: '',
      recaptchaResponse: '',
    };

    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

  }

  changeCNIC = e =>{
  	this.setState({cnic: e.target.value})
  }

  search = e =>{
  	if(this.state.cnic===''){
  		this.setState({error: 'Enter a CNIC Number', result: {}}); 
  		return;
  	}
    else if (this.state.recaptchaResponse===""){this.setState({error: 'Complete the ReCAPTCHA', result: {}})}
  	else{
  		
  		this.setState({error: ''})
        axios.get('https://rms.adeelchaudry.pk/public-api/claimant.php', {
		    params: {
          cnic: this.state.cnic,
          "g-recaptcha-response" :this.state.recaptchaResponse
          
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

  onLoadRecaptcha() {
        if (this.captchaDemo) {
          this.captchaDemo.reset();
            // this.captchaDemo.execute();
        }
  }

  verifyCallback(recaptchaToken) {
      this.setState({recaptchaResponse: recaptchaToken})
  }

  render() {

    return (
    <div className="App">
      	
        <h2> Search Page </h2>
        <div className="form spacer-20">
	        <div className="left double-input spacer-20" style={{width: '100%'}}>
		        <span className="label">CNIC / Phone Number</span><br/>
        		<input type="string" value={this.state.cnic} placeholder="Enter Claimant's CNIC or Phone Number" onChange = {e=>{this.changeCNIC(e)}}/>
        	</div>
          <ReCaptcha className="captcha"
                ref={(el) => {this.captchaDemo = el;}}
                render="explicit"
                sitekey="6Le6cOkUAAAAAMM9CaHm5g4E3Vn4oHQNFO9f05JL"
                onloadCallback={this.onLoadRecaptcha}
                verifyCallback={this.verifyCallback}
                theme="dark"
                render="explicit"
            />
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