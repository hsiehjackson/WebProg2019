import React, { Component } from 'react';
import '../styles.css';

class Header extends Component {
  render() {
    return (
      <header className="todo-app__header">
        <h1 className="todo-app__title">todos</h1>
      </header>
    );
  }
}

export default Header;
