import React, { Component } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tabs } from '@material-ui/core';  
import axios from 'axios'
import { ReCaptcha } from 'react-recaptcha-google'

import '../App.css'
import '../styles/Forms.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
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

      thankyou: false,
      recaptchaResponse: '',
    }

    this.fetchData()
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

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
  else if (this.state.cellnum===''){this.setState({error: 'Enter a Valid Cell Number'})}
  else if (this.state.donation_amount===0){this.setState({error: 'Enter a Valid Donation amount'})}
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
      formData.append('image', this.state.payment_img)
      formData.append('g-recaptcha-response', this.state.recaptchaResponse);
    
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
  else if (this.state.recaptchaResponse===""){this.setState({error: 'Complete the ReCAPTCHA'})}  
  else {
    console.log("check2")
    this.setState({error: '', thankyou: true})
    console.log("error", this.state.error)

    console.log("submitting")
    let formData = new FormData();
    formData.append('cnic', this.state.cnic)
    formData.append('name', this.state.name)
    formData.append('phone', this.state.cellnum)
    formData.append('is_individual', this.state.individual)
    formData.append('reference', this.state.reference)
    formData.append('amount', this.state.donation_amount)
    formData.append('email', this.state.email)
    formData.append('image', this.state.payment_img)
  
    axios({
        method: 'post',
        url: 'http://203.101.178.74:7620/public-api/donation.php',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res=>{console.log(JSON.stringify(res)); if(res.data.message === "Donation recorded!"){
      this.setState({thankyou: true})
     
    }})
    .catch(err=>{console.log(err)})
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

    let items = this.state.packages
    
    const form = 
    <div className="App">
        
        <h2> Donor Form </h2>
        <br/>
        <div className = "form" ref="form">
          <div className="line">
            <div className="left double-input">
                  <span className="label">CNIC &emsp;*required</span><br/>
                  <input required type="string" placeholder="Enter CNIC" value={this.state.cnic} onChange={e=>{this.selectCnic(e)}}/>
            </div>

            <div className="right double-input">
                  <span className="label">Cell Number  &emsp;*required</span><br/>
                  <input required type="string" placeholder="Enter Cell Number" value={this.state.cellnum} onChange={e=>{this.selectCellNumber(e)}}/>
            </div>
          </div>

          <div className="line">
            <div className="left double-input">
                  <span className="label">Name</span><br/>
                  <input type="string" placeholder="Enter Name" value={this.state.name} onChange={e=>{this.selectName(e)}}/>
            </div>
            <div className="right double-input">
                  <span className="label">What Defines you best?</span><br/>
                  <select id="individual" value={this.state.individual} onChange={e=>{this.selectOption(e)}}>
                <option className="hide" value="" disabled>What Defines you best?</option>
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
            </div>

          </div>

          <div className="line">
            <div className="left double-input">
                  <span className="label">How did you hear about us?</span><br/>
                  <select id="reference" value={this.state.reference} onChange={e=>{this.selectOption(e)}}>
                {/* <option className="hide" value="" disabled></option> */}
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                <option value="5">Option 5</option>
              </select>
            </div>

            <div className="right double-input">
              <span className="label">Email address</span><br/>
              <input required type="Email" placeholder="Enter Email Address" value={this.state.email} onChange={e=>{this.selectEmail(e)}}/>
            </div>
          </div>

          <div style={{textAlign:"center", display:"block-inline", marginBottom: '10px'}}>
              <input className="checkbox" type="checkbox" onChange={this.checkbox}/> <b style={{fontSize: '18px'}}>Please select if you want to donate according to pre-assembled packages</b>
          </div>
          <div style={{display: this.state.packg ?"block" :"none"}}>
          {
            items.map((val,i) => 
              <ExpansionPanel key = {i} >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                  <Typography ><b className="packageName">{val.name}</b></Typography>
                </ExpansionPanelSummary>
                             
                <div className="single-input contents"> <p >Total Price: &emsp; Rs.{val.cost}</p> </div>
                <div className="single-input contents"> Package Contents: </div>
                <ul>
                  {val.items.map((item,j)=><div key = {j} style={{width:"100%", textAlign:"left"}}><li>{item.quantity} {item.unit_name} {item.name}</li></div>)}
                </ul>
                <div className="spacer-20"/>
                <div className="single-input contents">
                  Enter Number of Packages to Donate? <input min="0" id={i} type="number" className="package-counter" onChange={this.changeval}/>
                </div>
              </ExpansionPanel>
            )
          }
          </div>
          <br/>
          <br/>
          <br/>

          <div className="line">
            <div className="left double-input">
              <span className="label">Donation Amount &emsp;*required</span><br/>
              {
                this.state.packg ? <input required type="number" min="0" placeholder="Enter Amount in Rs." value={this.state.donation_amount} disabled onChange={e=>{this.selectDonateAmount(e)}}/> :
                <input required type="number" min="0" placeholder="Enter Amount in Rs." value={this.state.donation_amount}  onChange={e=>{this.selectDonateAmount(e)}}/>
              }
            </div>

            <div className="right double-input">
              <span className="label">Mode of payment &emsp;*required</span><br/>
              <select required id="area" value={this.state.area} onChange={e=>{this.selectOption(e)}}>
              <option className="hide" value="" disabled defaultValue>Select Area</option>
              <option value="C">Cash</option>
              <option value="O">Online Transfer</option>
              </select>
            </div>  
          </div>

          <div className="line">
              <div className = {this.state.mode_payment ? "InActive": "Active"}>
                Please transfer your amount in this Bank account and attach the proof of payment below <br/>         
                <div style={{textAlign: 'center'}}>
                  Account Title: xxxxxx xxxxx xxxx <br/>
                  Bank Code: xxxx xxxx xx<br/>
                  IBAN: xxxxxxxx-xxxxxx-xxxx-xx<br/>
                </div>
              </div>
              <div className = {this.state.mode_payment ? "Active": "InActive"}>
                Address: Block 1, Plot C1, Gulberg 3, Lahore
                <br/>
                Contact Information: +92-3xx-xxxxxxx          
              </div>
          </div>          

          <div className = {this.state.mode_payment ? "InActive": "single-input"}>
            <span className="label">Upload proof of payment</span><br/>
            <label className="img-container">
              <p>{this.state.payment_img? this.state.payment_img.name: "Upload Proof of Payment"}</p>
              <input className="img-input" required type="file" onChange={e =>{this.imageHandler(e)}}/>
            </label>
            <div className="spacer-60"/>
          </div>

          <div className="spacer-60 phone-only"/>
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
            <button type="submit" form="form" className="form-btn" onClick={e=>{this.formSubmit(e)}}>Donate</button>
          </div>
        </div>  

        <br/>
        <div className={this.state.error? "isa_error":null}>
         {this.state.error? <div><FontAwesomeIcon className="icon" icon={faTimesCircle} /><b>{this.state.error}</b></div>:null}
        </div>
    </div>

    const thanks = <div className="App relative full-page"> 
      <div className="thanks-body">
        <p className="thanks-text"> Thank you for your donation! </p>
      </div>
    </div>


    return (
        <div> {this.state.thankyou? thanks:form}</div>
    );
  }
}
export default DonorForm;