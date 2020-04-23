import React, { Component } from 'react';
import axios from 'axios';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReCaptcha } from 'react-recaptcha-google'
// import * as request from 'request';

import '../App.css'
import '../styles/Forms.css'


class ClaimantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cellnum: '',
      email: '',
      who: '',
      
      error: '',
      thankyou: false,
      recaptchaResponse: '',
    };

    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

  }	

  	componentDidMount() {
	    if (this.captchaDemo) {
	        console.log("started, just a second...")
	        this.captchaDemo.reset();
	        // this.captchaDemo.execute();
    	}
    	else{
    		console.log('nope')
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

  	selectEmail = e =>{
    	this.setState({email: e.target.value})
    }

    selectName = e =>{
    	this.setState({name: e.target.value})
    }

    selectCellNumber = e =>{
    	this.setState({cellnum: e.target.value})
    }

    selectWho = e =>{
    	this.setState({who: e.target.value})
    }

	formSubmit = e =>{
		e.preventDefault();
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (this.state.name===''){this.setState({error: 'Enter your Name'}); return;}
		else if (this.state.cellnum===''){this.setState({error: 'Enter a Valid Cell Number'}); return;}
		else if (!this.state.email.match(mailformat)){this.setState({error: 'Enter a Valid Email Address'}); return;}
		else if (this.state.who===''){this.setState({error: 'Identify who you represent'}); return;}
		else if (this.state.recaptchaResponse===""){this.setState({error: 'Complete the ReCAPTCHA'})}
		else {
			let formData = new FormData();
			formData.append('name', this.state.name)
			formData.append('phone', this.state.cellnum)
			formData.append('email', this.state.email)
			formData.append('affiliation', this.state.who)
			formData.append('g-recaptcha-response', this.state.recaptchaResponse);
			
			axios({
                    method: 'post',
                    url: 'http://rms.adeelchaudry.pk/public-api/request.php',
                    // url: 'http://localhost:8000/public-api/request.php',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
            })
			.then(res=>{
				console.log(JSON.stringify(res))
				this.setState({error: '', thankyou: true})
			})
			.catch(err=>{
				console.log(JSON.stringify(err.response))
				this.setState({error: JSON.stringify(err.response.data.message)})
			})
			
		}
	}

  render() {

    const form= <div className="App">
        <h2> Register Claimants Form </h2>
        <h3> Fill this form to be able to register claimants that require ration donations</h3>
        <br/>
        <div className = "form single-form" ref="form">
        	<form id="form">
	        	<div className="line">
					<div className="single-input">
		    	  		<span className="label">Name</span><br/>
		    	  		<input name="name" required type="string" placeholder="Enter Name" value={this.state.name} maxLength="50" onChange={e=>{this.selectName(e)}}/>
					</div>
	        	</div>

	        	<div className="line">
					<div className="single-input">
		    	  		<span className="label">Cell Number</span><br/>
		    	  		<input required type="string" placeholder="Enter Cell Number" value={this.state.cellnum} onChange={e=>{this.selectCellNumber(e)}}/>
					</div>
	        	</div>

	        	<div className="line">
					<div className="single-input">
		    	  		<span className="label">Email Address</span><br/>
		    	  		<input required type="email" placeholder="Enter Email Address" maxLength="35" value={this.state.email} onChange={e=>{this.selectEmail(e)}}/>
					</div>
	        	</div>

	        	<div className="line">
					<div className="single-input">
		    	  		<span className="label">Who do you represent? </span><br/>
		    	  		<input required type="string" placeholder="If not affiliated, write Individual" maxLength="50" value={this.state.who} onChange={e=>{this.selectWho(e)}}/>
					</div>
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
	        		<button type="submit" form="form" className="form-btn" onClick={e=>{this.formSubmit(e)}}>Request Permission</button>
	        	</div>
	    	</form>
	    </div>	

      	<br/>
      	<div className={this.state.error? "isa_error":null}>
         {this.state.error? <div><FontAwesomeIcon className="icon" icon={faTimesCircle} /><b>{this.state.error}</b></div>:null}
        </div>
    </div>

    const thanks = <div className="App relative full-page"> 
    	<div className="thanks-body">
    		<p className="thanks-text thanks-text-phone"> Thank you for submitting your request. You will be contacted shortly. </p>
    	</div>
    </div>

    

    return (
    	<div> {this.state.thankyou? thanks:form}</div>
    );
  }
}
export default ClaimantForm;