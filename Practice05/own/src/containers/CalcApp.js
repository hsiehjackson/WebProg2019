import React from 'react';
import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      temp_number: "",
      eval_number: "",
      operator: "",
      eval_operator: "",
      complete: false
    };
  }

  addNumToInput = val => {
    if (this.state.operator!=="" && this.state.temp_number === "")
      this.setState({temp_number: this.state.input});
    if (val !== 0 || this.state.input !== "0")
      if ((this.state.operator!=="" || this.state.input === "0") && this.state.temp_number === "")
        this.setState({input: "" + val});
      else 
      {
        if (this.state.complete)
          this.setState({input: "" + val, complete: false});
        else
          this.setState({input: this.state.input + val});
      }
  }

  addDecimalToInput = val => {
    if (this.state.complete)
      this.setState({input: "0" + val, complete: false});
    else {
      if (this.state.input.indexOf(".") === -1)
          this.setState({input: this.state.input + val});
    }
  }

  addNegativeToInput = () => {
    if (this.state.input!=="0"){
      if (this.state.input.charAt(0)!=="-")
        this.setState({input: "-" + this.state.input});
      else
        this.setState({input: this.state.input.substr(1)});
    }
  }

  addPercentToInput = () => {
    this.setState({input: this.formatFloat(parseFloat(this.state.input)/100).toString()});
  }

  addOperater = val =>　{
    this.setState({operator: val});
    if (this.state.temp_number!==""){
      this.evaluate();
    }
    this.setState({eval_number: "", eval_operator: ""});
  }

  addEvaluate = () => {
    this.evaluate();
    this.setState({operator: ""});
    this.setState({complete: true});
  }

  evaluate = () => {
    if (this.state.eval_number === "" && this.state.eval_operator === ""){
      this.setState({eval_number: this.state.input, eval_operator: this.state.operator});
      if (this.state.temp_number === "")
        this.calculate(this.state.input, this.state.input, this.state.operator);
      else
        this.calculate(this.state.temp_number, this.state.input, this.state.operator);
      this.setState({temp_number: ""});
    }
    else{
      this.calculate(this.state.eval_number, this.state.input, this.state.eval_operator);
    }
  }

  formatFloat(num){
    var size = Math.pow(10, 6);
    return (Math.round(num * size) / size);
  }

  calculate = (num1, num2, operator) => {
    if (operator==="+"){
      this.setState({
        input: this.formatFloat(parseFloat(num1) + parseFloat(num2)).toString()
      });
    }
    else if (operator==="-"){
      this.setState({
        input: this.formatFloat(parseFloat(num1) - parseFloat(num2)).toString()
      });
    }
    else if (operator==="x"){
      this.setState({
        input: this.formatFloat(parseFloat(num1) * parseFloat(num2)).toString()
      });
    }
    else if (operator==="÷"){
      this.setState({
        input: this.formatFloat(parseFloat(num1) / parseFloat(num2)).toString()
      });
    }
  }

  resetState = () => {
    this.setState({input: "0", 
                   temp_number: "", 
                   operator: "", 
                   eval_number: "", 
                   eval_operator: "",
                   complete: false });
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.input}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.addNegativeToInput}>+/-</CalcButton>
            <CalcButton onClick={this.addPercentToInput}>%</CalcButton>

            <CalcButton onClick={this.addOperater} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.addNumToInput} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.addNumToInput} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.addNumToInput} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.addOperater} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.addNumToInput} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.addNumToInput} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.addNumToInput} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.addOperater} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.addNumToInput} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.addNumToInput} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.addNumToInput} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.addOperater} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.addNumToInput} className="calc-number bigger-btn" >0</CalcButton>
            <CalcButton onClick={this.addDecimalToInput} className="calc-number">.</CalcButton>
            <CalcButton onClick={this.addEvaluate} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
