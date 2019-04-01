import React from 'react';
import './main.css';


export default ({ onKeyPress, onChange, value }) => 
{ return <input
  className="todo-app__input" 
  value={value}
  type="text" 
  placeholder="What needs to be done?" 
  onKeyPress={onKeyPress} 
  onChange={onChange}/>;
}
