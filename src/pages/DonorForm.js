import React, { Component } from 'react';
import { faCoffee, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tabs } from '@material-ui/core';  
import '../App.css'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

  // const classes = useStyles();


class DonorForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      cnic: "",
      cellnum: "",
      email: "",
      reference: "1",
      individual: 1,
      payment_img : "",
      mode_payment : true,
      donation_amount : 0,
      error:"",
      packages : [],
      packg : false,
      list_val : [],
    }

    this.fetchData()
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

  selectEmail = e =>{
    this.setState({email: e.target.value})
  }

  // selectFamSize = e =>{
  //   this.setState({fam_size: e.target.value})
  // }

  // selectAddress = e =>{
  //   this.setState({address: e.target.value})
  // }

  selectDonateAmount = e =>{
    this.setState({donation_amount: e.target.value})
  }

  selectOption = e =>{
    // console.log(e.target.id, e.target.value)
    this.setState({[e.target.id]: e.target.value})
    if (e.target.value ===  "O"){
      this.setState({mode_payment : false})
    } else if (e.target.value === "C"){
      this.setState({mode_payment : true})
    }
    if (e.target.value === "Individual"){
      this.setState({individual: 1})
    }else if (e.target.value === "Company"){
      this.setState({individual: 0})
    }
  

  }

  imageHandler = e =>{
    console.log(e.target.files[0])
    if (e.target.files[0] !== undefined){
      if(e.target.files && (e.target.files[0].type==="image/jpg" || e.target.files[0].type==="image/png" || e.target.files[0].type==="image/jpeg")){
        console.log(e.target.files[0])
        this.setState({payment_img: e.target.files[0]})
      }
      else{
        this.setState({error:'Image should be a png or jpg/jpeg file'})
      }  
    }

}

formSubmit = e =>{
  e.preventDefault();
  console.log(this.state)
  if (this.state.cnic===''){this.setState({error: 'Enter a Valid CNIC Number'})}
  else if (this.state.name===''){this.setState({error: 'Enter your Name'})}
  else if (this.state.individual===''){this.setState({error: 'Please fill "What describes you best"'})}
  else if (this.state.cellnum===''){this.setState({error: 'Enter a Valid Cell Number'})}
  else if (this.state.reference===''){this.setState({error: 'How did you hear about us, not filled'})}
  // else if (this.state.fam_size===''){this.setState({error: 'Enter a Valid Family Size'})}
  else if (this.state.donation_amount===0){this.setState({error: 'Enter a Valid Donation amount'})}
  else if (this.state.email===""){this.setState({error: 'Enter Email Address'})}
  // else if (this.state.area===''){this.setState({error: 'Select your Area'})}
  else if (this.state.mode_payment === false){
    if (this.state.payment_img===''){this.setState({error: 'Upload proof of payment'})}	
    else {
      console.log("check1")
      this.setState({error: '', thankyou: true})
      console.log("submitting")
      let formData = new FormData();
      formData.append('cnic', this.state.cnic)
      formData.append('name', this.state.name)
      formData.append('phone', this.state.cellnum)
      formData.append('is_individual', this.state.individual)
      formData.append('reference', this.state.reference)
      formData.append('amount', this.state.donation_amount)
      formData.append('email', this.state.email)
      // formData.append('mode_payment', this.state.mode_payment)
      formData.append('image', this.state.payment_img)
      // formData.append('bill', this.state.bill_amount)
      // formData.append('image', this.state.bill_img)
    
      axios({
          method: 'post',
          url: 'http://203.101.178.74:7620/public-api/donation.php',
          data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(res=>{console.log(JSON.stringify(res))})
      .catch(err=>{console.log(err)})
      }	
  }
  else {
    console.log("check2")
    this.setState({error: '', thankyou: true})
    console.log("error", this.state.error)

    // if (this.state.error.length === 0){
    console.log("submitting")
    let formData = new FormData();
    formData.append('cnic', this.state.cnic)
    formData.append('name', this.state.name)
    formData.append('phone', this.state.cellnum)
    formData.append('is_individual', this.state.individual)
    formData.append('reference', this.state.reference)
    formData.append('amount', this.state.donation_amount)
    formData.append('email', this.state.email)
    // formData.append('mode_payment', this.state.mode_payment)
    formData.append('image', this.state.payment_img)
    // formData.append('bill', this.state.bill_amount)
    // formData.append('image', this.state.bill_img)
  
    axios({
        method: 'post',
        url: 'http://203.101.178.74:7620/public-api/donation.php',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res=>{console.log(JSON.stringify(res)); if(res.data.message === "Donation recorded!"){
      alert("Thank you for submitting the form")
      window.location.reload();
    }})
    .catch(err=>{console.log(err)})
  
    // }
  
  }


}

fetchData = () => {
  axios({
    method: 'get',
    url: 'http://203.101.178.74:7620/public-api/package.php',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  .then(res=>{
    var vals = []
    res.data.map(val=>vals.push(0))
    // console.log(vals)
    this.setState({packages: res.data, list_val: vals})
  })
}

checkbox = () =>{
  this.setState({packg : !this.state.packg})
}

changeval = (val) => {
  this.state.list_val[val.target.id] = val.target.value*this.state.packages[val.target.id].cost
  var lis = this.state.list_val
  var sum =0
  for (var i=0; i< lis.length; i++){
    sum += lis[i]
  }
  this.setState({donation_amount: sum})
}



  render() {
    let items = this.state.packages
    return (
    <div className="App">
      	
        <h2> Donor Form </h2>
        <br/>
        <div className = "form" ref="form">
        	<div className="line">
				<div className="left double-input">
	    	  		<span className="label">CNIC</span><br/>
	    	  		<input required type="string" placeholder="Enter CNIC" value={this.state.cnic} onChange={e=>{this.selectCnic(e)}}/>
				</div>

				<div className="right double-input">
	    	  		<span className="label">Name</span><br/>
	    	  		<input required type="string" placeholder="Enter Name" value={this.state.name} onChange={e=>{this.selectName(e)}}/>
				</div>
        	</div>

        	<div className="line">
				<div className="left double-input">
	    	  		<span className="label">What Defines you best?</span><br/>
	    	  		<select required id="individual" value={this.state.individual} onChange={e=>{this.selectOption(e)}}>
					  <option className="hide" value="" disabled>What Defines you best?</option>
					  <option value="Individual">Individual</option>
					  <option value="Company">Company</option>
					</select>
				</div>

				<div className="right double-input">
	    	  		<span className="label">Cell Number</span><br/>
	    	  		<input required type="string" placeholder="Enter Cell Number" value={this.state.cellnum} onChange={e=>{this.selectCellNumber(e)}}/>
				</div>
        	</div>

        	<div className="line">
				<div className="left double-input">
	    	  		<span className="label">How did you hear about us?</span><br/>
	    	  		<select required id="reference" value={this.state.reference} onChange={e=>{this.selectOption(e)}}>
					  {/* <option className="hide" value="" disabled></option> */}
					  <option value="1">Option 1</option>
					  <option value="2">Option 2</option>
					  <option value="3">Option 3</option>
					  <option value="4">Option 4</option>
					  <option value="5">Option 5</option>
					</select>
				</div>

        <div className="right double-input">
	    	  		<span className="label">Mode of payment</span><br/>
	    	  		<select required id="area" value={this.state.area} onChange={e=>{this.selectOption(e)}}>
					  <option className="hide" value="" disabled defaultValue>Select Area</option>
					  <option value="C">Cash</option>
					  <option value="O">Online Transfer</option>
					</select>
				</div>	
          
          
          </div>

        	<div className="line">
              <div className = {this.state.mode_payment ? "InActive": "Active"}>
                Please transfer your amount in this Bank account and attach the proof of payment below          
              </div>
              <div className = {this.state.mode_payment ? "Active": "InActive"}>
                Address : Lahore University of Management Sciences, DHA, Lahore
                <br/>
                Contact Information: 0300-0000000          
              </div>

        	</div>
          <div style={{textAlign:"left", display:"block-inline"}}>
          <p>
          <input style={{width:"10%"}}type="checkbox" onChange={this.checkbox}/> Please select if you want to donate according to the packages
          </p>
          </div>
          <div style={{display: this.state.packg ?"block" :"none"}}>
          {
            items.map((val,i) => 
              <ExpansionPanel
              key = {i}
              >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                // id= {"panel1a-header"+val}
              >
                <Typography >{val.name}</Typography>
              </ExpansionPanelSummary>
              {/* <ExpansionPanelDetails> */}
                {/* <Typography> */}
                <p >Total price of the package: {val.cost}</p>
                <ul>
                {val.items.map((item,j)=><div key = {j} style={{width:"100%", textAlign:"left"}}><li>{item.name} {item.quantity} {item.unit_name}</li></div>)}
                </ul>
                <div>
                  Select the number of packages you want to donate? <input min="0" id={i} type="number" style={{width:"5%", height:"3%"}} onChange={this.changeval}/>
                </div>
                
                {/* </Typography> */}
              {/* </ExpansionPanelDetails> */}
            </ExpansionPanel>
            )
          }
          </div>
          <br/>
          <br/>
          <br/>


          {/* <ExpansionPanel TransitionProps={{ unmountOnExit: true }} /> */}
          {/* <div className="line">
              Package information is provided below, for you convenience. Clicking on a package will add the equivalent amount to Donate amount/ 
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                Item One
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
        	</div> */}

        	<div className="line">
				<div className="left double-input">
	    	  		<span className="label">Donation Amount</span><br/>
              {
                this.state.packg ? <input required type="number" min="0" placeholder="Enter Amount in Rs." value={this.state.donation_amount} disabled onChange={e=>{this.selectDonateAmount(e)}}/> :
                <input required type="number" min="0" placeholder="Enter Amount in Rs." value={this.state.donation_amount}  onChange={e=>{this.selectDonateAmount(e)}}/>
              }
	    	  		{/* <input required type="number" min="0" placeholder="Enter Amount in Rs." value={this.state.donation_amount} {... this.state.packg ? "disabled": ""} onChange={e=>{this.selectDonateAmount(e)}}/> */}
				</div>

        <div className="right double-input">
	    	  		<span className="label">Email address</span><br/>
	    	  		<input required type="Email" placeholder="Enter Email Address" value={this.state.email} onChange={e=>{this.selectEmail(e)}}/>
				</div>
        	</div>

          <div className = {this.state.mode_payment ? "InActive": "double-input"}>
	    	  		<span className="label">Upload proof of payment</span><br/>
	    	  		<label className="img-container">
              <p>{this.state.payment_img? this.state.payment_img.name: "Upload proof of payment"}</p>
		    	  		<input className="img-input" required type="file" onChange={e =>{this.imageHandler(e)}}/>
					</label>
				</div>


        	<div>
        		<button type="submit" form="form" className="form-btn" onClick={e=>{this.formSubmit(e)}}>Donate</button>
        	</div>
      	</div>	

      	<br/>
      	<div className={this.state.error? "isa_error":null}>
         {this.state.error? <div><FontAwesomeIcon className="icon" icon={faTimesCircle} /><b>{this.state.error}</b></div>:null}
        </div>


    </div>
    );
  }
}
export default DonorForm;