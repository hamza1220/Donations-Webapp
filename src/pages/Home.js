import React, { Component } from 'react';
import '../App.css'

class Home extends Component {
  render() {
    return (
    <div className="App">
      	<h1>Form Styling Sample</h1>
      	<p> All classes have been defined in App.css </p>
      	<div className = "form">
      		<span className="label">Label</span>
	    	<input placeholder="Type here"/>
	    	
	    	<div className="spacer-20"/>

      		<span className="label">Label</span>
	    	<input placeholder="Type here"/>
	    	
	    	<div className="spacer-20"/>

      		<span className="label">Label</span>
	    	<input placeholder="Type here"/>
      	</div>	
    </div>
    );
  }
}
export default Home;