import React, { Component } from 'react';
import logo from '../img/x.png';
import '../../styles.css';

export default props => {
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input id={props.todo.id } onClick={props.complete} type="checkbox" checked={props.todo.complete}></input>
                <label htmlFor={props.todo.id}  ></label>
            </div>
            <p className="todo-app__item-time"
               style={{
               textDecoration: props.todo.complete ? "line-through":"",
               opacity: props.todo.complete ? 0.5:1}}>
            {props.todo.time}
            </p>
            <h1 className="todo-app__item-detail"
                style={{
                textDecoration: props.todo.complete ? "line-through":"",
                opacity: props.todo.complete ? 0.5:1}}>
            {props.todo.text}
            </h1>
            <img className="todo-app__item-x" src={logo} alt="X" onClick={props.delete}></img>
        </li> );
}