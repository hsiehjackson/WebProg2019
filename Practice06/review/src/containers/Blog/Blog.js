import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import Posts from "./Posts/Posts";
import PostRender from "./Posts/PostRender";
import Home from "./Home";

export default class Blog extends Component {
    render() {
        return (
            <div>
                <button>
                    <NavLink to="/home">Home</NavLink>
                </button>
                <button>
                    <NavLink to="/posts">Posts</NavLink>
                </button>
                <button>
                    <NavLink to="/authors">Authors</NavLink>
                </button>
                <hr />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path="/posts" component={Posts} />
                    <Route path="/posts/:id?" component={PostRender} />
                    <Route path="/authors" render={() => (<h1>I'm not the authors.</h1>)} />
                    <Redirect from="/home" to="/" />
                </Switch>
            </div>
        );
    }
}
