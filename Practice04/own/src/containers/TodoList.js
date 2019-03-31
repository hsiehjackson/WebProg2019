import React from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import Footer from '../components/Footer';

class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            todoToShow: "all"
        };
    };
    updateShow = (s) => {
        this.setState({
            todoToShow: s
        });
    };
    removeAllcomplete = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        });
    };
    addTodo = (todo) => {
        const newtodos = [todo,...this.state.todos];
        newtodos.sort(function(a,b){return a.date- b.date});
        this.setState({todos: newtodos});
    };
    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    };
    completTodo = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id===id){return{...todo,complete:!todo.complete};} 
                else{return todo;}
            })
        });
    };
    render () {
        let todos = [];
        if (this.state.todoToShow==="all"){
            todos = this.state.todos;
        }else if (this.state.todoToShow==="active"){
            todos = this.state.todos.filter(todo => !todo.complete);
        }else if (this.state.todoToShow==="completed"){
            todos = this.state.todos.filter(todo => todo.complete);
        }
        return(
        <div className="todo-app__root">
            <Header />
            <Section 
                todos={todos}
                add={this.addTodo} 
                length={this.state.todos.length}  
                completTodo={this.completTodo}
                deleteTodo={this.deleteTodo}/>
            <Footer 
                todos={this.state.todos}
                update={this.updateShow}
                removeAll={this.removeAllcomplete}
                show={this.state.todoToShow}/>
        </div>
        );
    };
}

export default TodoList;