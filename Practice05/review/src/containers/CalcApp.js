import React from 'react';

import CalcButton from '../components/CalcButton';

let Operation = {
  none: 1,
  add: 2,
  minus: 3,
  multiply: 4,
  divide: 5
}

let Stage = {
  set_number: 1,
  set_opration: 2
}

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_number: 0,
      staged_number: 0,
      current_stage: Stage.set_number,
      operation: Operation.none
    };
  }

  resetState = () => {
    this.setState((state, props) => ({
      show_number: 0, 
      staged_number: 0,
      current_stage: Stage.set_number,
      operation: Operation.none
    }));
  }

  add = (x, y) => (x + y);
  minus = (x ,y) => (x - y);
  multiply = (x, y) => (x * y);
  divide = (x, y) => (x / y);

  click_number = (number) => {
    if (this.state.current_stage === Stage.set_number) {
      this.setState((state, props) => ({
        show_number: state.show_number * 10 + number
      }))
    } else { // this.state.current_state === set_opertion
      this.setState((state, props) => ({
        show_number: number,
        current_stage: Stage.set_number
      }))
    }
  }

  click_0 = () => { this.click_number(0); }
  click_1 = () => { this.click_number(1); }
  click_2 = () => { this.click_number(2); }
  click_3 = () => { this.click_number(3); }
  click_4 = () => { this.click_number(4); }
  click_5 = () => { this.click_number(5); }
  click_6 = () => { this.click_number(6); }
  click_7 = () => { this.click_number(7); }
  click_8 = () => { this.click_number(8); }
  click_9 = () => { this.click_number(9); }

  click_operation = (opration_type) => {
    if (this.state.current_stage === Stage.set_opration) {
      this.setState((state, props) => ({
        operation: opration_type
      }))
    } else { //this.state.current_stege ==== Stage.set_number
      let result = 0;
      let operation_now = this.state.operation;
      
      if (operation_now === Operation.none) {
        result = this.state.show_number;
      } else if (operation_now === Operation.add) {
        result = this.add(this.state.staged_number, this.state.show_number);
      } else if (operation_now === Operation.minus) {
        result = this.minus(this.state.staged_number, this.state.show_number);
      } else if (operation_now === Operation.multiply) {
        result = this.multiply(this.state.staged_number, this.state.show_number);
      } else if (operation_now === Operation.divide) {
        result = this.divide(this.state.staged_number, this.state.show_number);
      }

      this.setState((state, props) => ({
        show_number: result,
        staged_number: result,
        current_stage: Stage.set_opration,
        operation: opration_type,
      }))
    }
  }

  click_add = () => { this.click_operation(Operation.add); }
  click_minus = () => { this.click_operation(Operation.minus); }
  click_multiply = () => { this.click_operation(Operation.multiply); }
  click_divide = () => { this.click_operation(Operation.divide); }
  click_equal = () => { this.click_operation(Operation.none); }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.show_number}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton className="calc-operator" onClick= {this.click_divide}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick= {this.click_7}>7</CalcButton>
            <CalcButton className="calc-number" onClick= {this.click_8}>8</CalcButton>
            <CalcButton className="calc-number" onClick= {this.click_9}>9</CalcButton>
            <CalcButton className="calc-operator" onClick= {this.click_multiply}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick= {this.click_4}>4</CalcButton>
            <CalcButton className="calc-number" onClick= {this.click_5}>5</CalcButton>
            <CalcButton className="calc-number" onClick= {this.click_6}>6</CalcButton>
            <CalcButton className="calc-operator" onClick= {this.click_minus}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick= {this.click_1}>1</CalcButton>
            <CalcButton className="calc-number" onClick= {this.click_2}>2</CalcButton>
            <CalcButton className="calc-number" onClick= {this.click_3}>3</CalcButton>
            <CalcButton className="calc-operator" onClick= {this.click_add}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number bigger-btn" onClick= {this.click_0}>0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton className="calc-operator" onClick= {this.click_equal}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
