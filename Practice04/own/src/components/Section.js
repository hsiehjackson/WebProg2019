import React, { Component } from 'react';
import Input from './Section_component/Input';
import TodoItem from './Section_component/TodoItem';
import '../styles.css';

class Section extends Component {
    constructor(props){
        super(props);
    };
    createItem = (todo) => {
            return (<TodoItem
            key = {todo.id} 
            todo = {todo}
            complete={() => this.props.completTodo(todo.id)}
            delete={() => this.props.deleteTodo(todo.id)}
            />);
    };
    render() {
        return (
        <section className="todo-app__main" id="todo-main">
            <Input add={this.props.add} length={this.props.length}/>
            {this.props.length !== 0 ?
                (<ul className="todo-app__list">
                    {this.props.todos.map(this.createItem)}    
                </ul>) : null}
        </section>
        );
    };
}

export default Section;
