import React, { Component } from "react";

import Post from "../../../components/Post/Post";
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
export default class PostRender extends Component {
    render() {
        const { id } = this.props.match.params;
        return id && id < para.length ? (
            <Post id={id} title={para[id].title} content={para[id].content}/>
        ) : (
            <div>
                <h3>Error: Post #{id} NOT FOUND</h3>
            </div>
        );
    }
}
