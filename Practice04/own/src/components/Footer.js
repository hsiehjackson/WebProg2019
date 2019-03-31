import React, { Component } from 'react';
import SwitchShow from './Footer_component/SwitchShow';
import '../styles.css';

class Footer extends Component {
  render() {
    return (
    <footer className="todo-app__footer" id="todo_footer"  style={{visibility: this.props.todos.length===0 ? "hidden": ""}}>
        <div className="todo-app__total" id="todo-count">
            {this.props.todos.filter(todo => !todo.complete).length} left
        </div>
        <ul className="todo-app__view-buttons">
            <SwitchShow mode="all" text="All" update={this.props.update} show={this.props.show}/>
            <SwitchShow mode="active" text="Active" update={this.props.update} show={this.props.show}/>
            <SwitchShow mode="completed" text="Completed" update={this.props.update} show={this.props.show}/>
        </ul>
        <button className="todo-app__clean" id="clean" onClick={() => this.props.removeAll()}
        style={this.props.todos.some(todo => todo.complete) ? null:{visibility: "hidden"}}>Clear completed</button>
    </footer>
    );
  };
}

export default Footer;