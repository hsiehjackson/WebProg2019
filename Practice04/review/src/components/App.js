import React, { Component } from 'react';
import InputBar from '../containers/InputBar';
import List from '../containers/List';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      todoList: [] };
  }

  

  inputText = (event) => {
    this.setState({inputText: event.target.value});
  }

  clearInputText = () => {
    document.getElementsByClassName("todo-app__input").reset();
  }

  handleAddTodo = (event) => {
    if((event.which === 13 || event.keyCode === 13))
    {
      if(this.state.inputText.trim())
      this.state.todoList.push(this.state.inputText);
      this.setState({todoList: this.state.todoList});
      this.setState({inputText: ''});
    }
  };  

  render() {
    return (
      <div className="todo-app__root">
        
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        
        <section className="todo-app__main">
          <InputBar onKeyPress={this.handleAddTodo} onChange={this.inputText} value={this.state.inputText}/>
          
          <List todoItems={this.state.todoList}/>
          
        </section>

        <footer className="todo-app__footer" visibility="hidden">
          <div className="todo-app__total">0 left</div>
            <ul className="todo-app__view-buttons">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </ul>
          <div className="todo-app__clean">
            <button>clear completed</button>
          </div>
        </footer>
        
      </div>
    );
  }
}


export default App;
