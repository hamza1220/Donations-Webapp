import React, { Component } from 'react';
import axios from 'axios';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../App.css'
import './Forms.css'


class ClaimantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cnic: '',
      name: '',
      gender: '',
      cellnum: '',
      occupation: '',
      fam_size: 1,
      area: '',
      address: '',
      bill_amount: '',
      bill_img: '',

      error: '',
      thankyou: false,
    };

  }	

  	selectCnic = e =>{
    	this.setState({cnic: e.target.value})
    }

    selectName = e =>{
    	this.setState({name: e.target.value})
    }

    selectCellNumber = e =>{
    	this.setState({cellnum: e.target.value})
    }

    selectFamSize = e =>{
    	this.setState({fam_size: e.target.value})
    }

    selectAddress = e =>{
    	this.setState({address: e.target.value})
    }

    selectBillAmount = e =>{
    	this.setState({bill_amount: e.target.value})
    }

    selectOption = e =>{
    	console.log(e.target.id, e.target.value)
    	this.setState({[e.target.id]: e.target.value})
    }

    imageHandler = e =>{
	    console.log(e.target.files[0])
	    if(e.target.files && (e.target.files[0].type==="image/jpg" || e.target.files[0].type==="image/png" || e.target.files[0].type==="image/jpeg")){
	      console.log(e.target.files[0])
	      this.setState({bill_img: e.target.files[0]})
	    }
	    else{
	    	this.setState({error:'Image should be a png or jpg/jpeg file'})
	    }
	}

	formSubmit = e =>{
		e.preventDefault();
		if (this.state.cnic===''){this.setState({error: 'Enter a Valid CNIC Number'}); return;}
		else if (this.state.name===''){this.setState({error: 'Enter your Name'}); return;}
		else if (this.state.gender===''){this.setState({error: 'Select your Gender'}); return;}
		else if (this.state.cellnum===''){this.setState({error: 'Enter a Valid Cell Number'}); return;}
		else if (this.state.occupation===''){this.setState({error: 'Select your Occupation'}); return;}
		else if (this.state.fam_size===''){this.setState({error: 'Enter a Valid Family Size'}); return;}
		else if (this.state.bill_amount===''){this.setState({error: 'Enter a Valid Bill Amount Number'}); return;}
		else if (this.state.area===''){this.setState({error: 'Select your Area'}); return;}
		else if (this.state.bill_img===''){this.setState({error: 'Upload your Electricity Bill'}); return;}		
		else {
			let formData = new FormData();
			formData.append('cnic', this.state.cnic)
			formData.append('name', this.state.name)
			formData.append('phone', this.state.cellnum)
			formData.append('gender', this.state.gender)
			formData.append('occupation', this.state.occupation)
			formData.append('family_size', this.state.fam_size)
			formData.append('area', this.state.area)
			formData.append('address', this.state.address)
			formData.append('bill', this.state.bill_amount)
			formData.append('image', this.state.bill_img)
			
			axios({
                    method: 'post',
                    url: 'http://203.101.178.74:7620/public-api/claimant.php',
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
        <h2> Claimant Form </h2>
        <br/>
        <div className = "form" ref="form">
        	<form id="form">
	        	<div className="line">
					<div className="left double-input">
		    	  		<span className="label">CNIC</span><br/>
		    	  		<input name="cnic" required type="string" placeholder="Enter CNIC/Phone Number" value={this.state.cnic} onChange={e=>{this.selectCnic(e)}}/>
					</div>

					<div className="right double-input">
		    	  		<span className="label">Name</span><br/>
		    	  		<input name="name" required type="string" placeholder="Enter Name" value={this.state.name} onChange={e=>{this.selectName(e)}}/>
					</div>
	        	</div>

	        	<div className="line">
					<div className="left double-input">
		    	  		<span className="label">Gender</span><br/>
		    	  		<select required id="gender" value={this.state.gender} onChange={e=>{this.selectOption(e)}}>
						  <option className="hide" value="" disabled>Select Gender</option>
						  <option value="M">Male</option>
						  <option value="F">Female</option>
						</select>
					</div>

					<div className="right double-input">
		    	  		<span className="label">Cell Number</span><br/>
		    	  		<input required type="string" placeholder="Enter Cell Number" value={this.state.cellnum} onChange={e=>{this.selectCellNumber(e)}}/>
					</div>
	        	</div>

	        	<div className="line">
					<div className="left double-input">
		    	  		<span className="label">Occupation</span><br/>
		    	  		<select required id="occupation" value={this.state.occupation} onChange={e=>{this.selectOption(e)}}>
						  <option className="hide" value="" disabled>Select Occupation</option>
						  <option value="1">Option 1</option>
						  <option value="2">Option 2</option>
						  <option value="3">Option 3</option>
						  <option value="4">Option 4</option>
						  <option value="5">Option 5</option>
						</select>
					</div>

					<div className="right double-input">
		    	  		<span className="label">Family Size</span><br/>
		    	  		<input required type="number" min="1" placeholder="Enter Family Size" value={this.state.fam_size} onChange={e=>{this.selectFamSize(e)}}/>
					</div>
	        	</div>

	        	<div className="line">
					<div className="left double-input">
		    	  		<span className="label">Area</span><br/>
		    	  		<select required id="area" value={this.state.area} onChange={e=>{this.selectOption(e)}}>
						  <option className="hide" value="" disabled defaultValue>Select Area</option>
						  <option value="1">Option 1</option>
						  <option value="2">Option 2</option>
						  <option value="3">Option 3</option>
						  <option value="4">Option 4</option>
						  <option value="5">Option 5</option>
						</select>
					</div>

					<div className="right double-input">
		    	  		<span className="label">Address</span><br/>
		    	  		<input type="string" placeholder="Enter Address (Optional)" value={this.state.address} onChange={e=>{this.selectAddress(e)}}/>
					</div>
	        	</div>

	        	<div className="line">
					<div className="left double-input">
		    	  		<span className="label">Electricity Bill Amount</span><br/>
		    	  		<input required type="number" min="0" placeholder="Enter Amount in Rs." value={this.state.bill_amount} onChange={e=>{this.selectBillAmount(e)}}/>
					</div>

					<div className="right double-input">
		    	  		<span className="label">Electricity Bill Image</span><br/>
		    	  		<label className="img-container">
						    <p>{this.state.bill_img? this.state.bill_img.name: "Upload Electricity Bill Image"}</p>
			    	  		<input className="img-input" required type="file" onChange={e =>{this.imageHandler(e)}}/>
						</label>
					</div>
	        	</div>

	        	<div>
	        		<button type="submit" form="form" className="form-btn" onClick={e=>{this.formSubmit(e)}}>Add Claimant</button>
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
    		<p className="thanks-text"> Thank you for registering as a Ration Claimant </p>
    		<button className="form-btn" onClick={e=>{this.setState({thankyou: false, cnic: '', name: '', gender: '', cellnum: '', occupation: '', fam_size: 1, area: '', address: '', bill_amount: '', bill_img: ''})}}>Register another Claimant</button>

    	</div>
    </div>


    return (
    	<div> {this.state.thankyou? thanks:form}</div>
    );
  }
}
export default ClaimantForm;