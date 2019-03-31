import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from'./containers/TodoList';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);


serviceWorker.unregister();
