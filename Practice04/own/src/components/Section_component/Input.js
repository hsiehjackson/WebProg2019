import React, { Component } from 'react';
import '../../styles.css';
import InputName from './Input_Name';
import InputTime from './Input_Time';

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
        text: "",
        time: ""
    };
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  setChange = e => {
    e.preventDefault();
    if (this.state.text.trim() !== ""){    
        this.props.add({
            id: this.props.length,
            text: this.state.text,
            complete: false,
            date : this.state.time === "" ? new Date ("2100-01-01") : new Date(this.state.time),
            time : this.state.time === "" ? "no date" : this.state.time
        });
        this.setState({text: "", time: ""});
    }
  };

  render() {
    return (
        <form onSubmit={this.setChange}>
            <InputName value={this.state.text} onChange={this.onChange} />
            <InputTime value={this.state.time} onChange={this.onChange} />
        </form>
    );
  };
}

export default Input;
