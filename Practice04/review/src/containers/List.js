import React from 'react';
import x from '../x.png';
import './main.css';


const List = props => ( 
    <ul className="todo-app__list">
      {props.todoItems.map((item, index)=> 
        <li className="todo-app__item">
          <div className="todo-app__checkbox">
            <input id={index} type="checkbox"></input>
            <label htmlFor={index}></label>
          </div>
          <h1>{item}</h1>
          <img src={x} className="todo-app__item-x" />
        </li>
        )
      }
    </ul>
);



export default List;