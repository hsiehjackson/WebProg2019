import React from 'react'
import '../../styles.css';
export default props => {      
  return (props.show !== props.mode ? 
  (<li id={props.mode} onClick={() => props.update(props.mode)}>
      {props.text}
  </li>) :
  (<button> 
      {props.text}
  </button>)
  );
}