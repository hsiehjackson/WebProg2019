import React from "react";

export default ({ id, title, content }) => {
    return (
        <div className="article">
            <h3>{title}</h3>
            <p>Posts #{id}</p>
            <p>{content}</p>
        </div>
    );
};
