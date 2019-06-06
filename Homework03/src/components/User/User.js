import React, { Component } from 'react'
import { 
    Card, 
    CardHeader, 
    CardFooter, 
    //CardBody,
    CardText, 
    Button} from 'reactstrap'
import './User.css'
import Post from '../Post/Post'


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenComment: false,
    }
  }

  toggleComment = () => {
    this.setState(prevState => ({
      OpenComment: !prevState.OpenComment
    }));
    document.activeElement.blur()
  }

  render() {
    let username = this.props.data.name;
    let userage = this.props.data.age;
    let useremail = this.props.data.email;
    let posts_number = this.props.data.posts.length;
    let posts = this.props.data.posts.map((post, id) => (
    <Post data={post} key={id}  login_state={this.props.login_state}/> ));
    let comments_number = 0;
    this.props.data.posts.map((post) => {
        comments_number = comments_number + post.comments.length;
        return null;
    });
    let posts_like = 0;
    this.props.data.posts.map((post) => {
      posts_like = posts_like + post.like;
      return null;
    });
    
    return (
      <Card style={{ margin: '30px auto', width: '400px' }}>
        <CardHeader style={{ backgroundColor: '#222', borderColor: '#222', color:'white'}}>
          {username} [{useremail}] {userage?`${userage} yrs `:null} 
        </CardHeader>

        <CardFooter className="footer">
          <Button onClick={this.toggleComment} color={this.state.OpenComment?"success":"secondary"}
          ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }}>
          {this.state.OpenComment?"Close":"Show"}
          </Button>
          <CardText className="foot_text">
            {`Posts:${posts_number}  Comments:${comments_number} Like:${posts_like}`}
          </CardText>
        </CardFooter>
        {
        this.state.OpenComment && posts_number? 
          <CardFooter>
            {posts}
          </CardFooter>:
          null
        }
    </Card>
    );
  }
}

export default User
