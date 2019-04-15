import React, { Component } from "react";
import { NavLink } from "react-router-dom";
var para = [
    {
      title: "Story",
      content: "blablabla...",
    },
    {
      title: "Web programming",
      content: "Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg\
  Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg\
  Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg\
  Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg Omg",
    },
    {
      title: "I want to sleep",
      content: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz\
  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz\
  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz\
  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz\
  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz\
  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz\
  zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
    }
];
export default class Posts extends Component {
    render() {
        const lists = para.map((i, index) => (
            <li key={index}>
                <NavLink to={"/posts/" + index}>Posts #{index}</NavLink>
            </li>
        ));
        return (
            <div>
                <h3>Click to view article ---</h3>
                {lists}
            </div>
        );
    }
}
