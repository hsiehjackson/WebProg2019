import React, { Component } from 'react';
class Header extends Component {
	render(){
	  return (
		<h1> {this.props.name}'s Blog </h1>
	  );
	}
}

export default Header;