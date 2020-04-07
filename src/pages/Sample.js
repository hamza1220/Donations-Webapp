import React, { Component } from 'react';
import '../App.css'

class Sample extends Component {
  render() {
    return (
    <div className="App">
      	<h2>Form Styling Sample</h2>
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
export default Sample;