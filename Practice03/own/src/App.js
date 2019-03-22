import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

class App extends Component {
  constructor(){
    super();
    this.state = {txt: 'This is a Heading you can type!'};
  }
  update(e){
    console.log(e);
    if (e.target.value == '')
      this.setState({txt: 'This is a Heading you can type!'});
    else
      this.setState({txt: e.target.value});
  }
  render() {
    return (  <div>
                <div className="post">
                  <h1 className="blink">{this.state.txt}</h1>
		            </div>
            		<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <input type="text" placeholder="here's an input field...you can type something" className="search"
                  onChange={this.update.bind(this)}></input>
                </div>
              </div>

    );
  }
}



export default App;
