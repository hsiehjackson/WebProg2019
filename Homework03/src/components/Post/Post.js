import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import MaterialIcon  from 'material-icons-react'
import logo from '../../img/x.png'
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardBody, 
  CardText, 
  Button,
  Input,
  Form,
  FormGroup,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem} from 'reactstrap'
import './Post.css'
import {
  UPDATE_POST_MUTATION,
  CREATE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,  
  USERS_QUERY,
  LOGIN_QUERY
} from '../../graphql'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenComment: false,
      OpenAuthor: false,
      selectAuthorName: 'Authors',
      selectAuthorID: null,
      formText: '',
    }
  }

  toggleComment = () => {
    this.setState(prevState => ({
      OpenComment: !prevState.OpenComment
    }));
    document.activeElement.blur()
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { formText, selectAuthorID } = this.state
    if (!formText) {
      alert("Give Comment")
      return
    }
    if (!selectAuthorID){
      alert("Give Author")
      return
    }
    this.createComment({
      variables: {
        text: formText,
        authorId: selectAuthorID,
        postId: this.props.data.id
      }
    })

    this.setState({
      formText: '',
      selectAuthorName: 'Authors',
      selectAuthorID: null
    })
    document.activeElement.blur()
  }

  toggleAuthor = () => {
    this.setState(prevState => ({
      OpenAuthor: !prevState.OpenAuthor
    }));
  }

  select = e => {
    this.setState({
      selectAuthorName: e.target.innerText,
      selectAuthorID: e.target.id
    });
  }

  removePost = () => {
    this.deletePost({
      variables: {
        postId: this.props.data.id
      }
    })
  }

  removeComment = (id) => {
    this.deleteComment({
      variables: {
        commentId: id
      }
    })
  }

  thumb_up = () => {
    this.updataPost({
      variables: {
        postId: this.props.data.id,
        like: this.props.data.like + 1
      }
    })
  }

  thumb_down = () => {
    if (this.props.data.like > 0 )
      this.updataPost({
        variables: {
          postId: this.props.data.id,
          like: this.props.data.like - 1
        }
      });
  }

  createInputComment = () => {
    return (
      <Mutation mutation={CREATE_COMMENT_MUTATION} refetchQueries={[{ query: USERS_QUERY }]}>
        {createComment => {
          this.createComment = createComment;
          return (
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup className="foot_comment_inputfooter">
                <div className="foot_comment_inputname">
                  <Dropdown size="sm" isOpen={this.state.OpenAuthor} toggle={this.toggleAuthor}>
                    <DropdownToggle caret color="info">
                      {this.state.selectAuthorName}
                    </DropdownToggle>
                    <DropdownMenu>
                      <Query query={LOGIN_QUERY}>
                        {({ loading, error, data}) => {
                          if (loading) return <p>Loading...</p>
                          if (error) return <p>Error :(((</p>
                          //let login_check = data.isLogin?true:false
                          return (
                          <Query query={USERS_QUERY} variables={{login: true}}>
                          {({ loading, error, data}) => {
                            if (loading) return <p>Loading...</p>
                            if (error) return <p>Error :(((</p>
                            const users = data.users.map((user, id) => (
                              <DropdownItem id={user.id} key={id} onClick={this.select}>{user.name}</DropdownItem>
                            ))
                            return <div>{users}</div>
                          }}
                          </Query>)
                        }}
                      </Query>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="foot_comment_inputtext">
                  <Input
                    bsSize="sm"
                    value={this.state.formText}
                    placeholder="Write a comment..."
                    onChange={e => this.setState({ formText: e.target.value })}
                    //style={this.props.data.published?null:{cursor:"not-allowed"}}
                    readOnly={this.props.data.published?false:true}
                  />
                </div>
              </FormGroup>
            </Form>
          )
        }}
      </Mutation>
    );
};


  render() {
    let title = this.props.data.title;
    let body = this.props.data.body;
    //let published = this.props.data.published;
    let comments = this.props.data.comments;
    let like = this.props.data.like;
    let commentsitem = comments.map((comment, id) => 
    {return (
      <Mutation mutation={DELETE_COMMENT_MUTATION} key={id} refetchQueries={[{ query: USERS_QUERY }]}>
        {deleteComment => {
          this.deleteComment = deleteComment;
          return (
          <div key={id} className="foot_comment">
             { (this.props.login_state.id === '0' || this.props.login_state.id === comment.author.id) ?
            <img className="foot_comment_x" src={logo} alt="X" onClick={() => this.removeComment(comment.id)}></img>:
            <img className="foot_comment_x_non" src={logo} alt="X"></img>
             }
            <CardText className="foot_comment_name">{comment.author.name}</CardText>
            <CardText className="foot_comment_text">{comment.text}</CardText>
          </div>
          )
        }}
      </Mutation>
    );})

    return (
      <Card className="post_block">
        <CardHeader style={{ backgroundColor: '#464646', borderColor: '#464646', color:'white', textAlign:"center"}}>
          {title}
        </CardHeader>
        <CardBody>
          
          <Mutation mutation={DELETE_POST_MUTATION} refetchQueries={[{ query: USERS_QUERY }]}>
          {deletePost => {
            this.deletePost = deletePost;
            return (
              <div className="post__item">
                <CardText className="post__item-text">
                  { body || "No body for this post..."}
                </CardText>
                { (this.props.login_state.id === '0' || this.props.login_state.id === this.props.data.author.id) ?
                <img className="post__item-x" src={logo} alt="X" onClick={this.removePost}></img> :null
                }
              </div>
            );
          }}
          </Mutation>
        </CardBody>

        <CardFooter className="footer">
          <Button onClick={this.toggleComment} color={this.state.OpenComment?"success":"secondary"}>
          {this.state.OpenComment?"Close":"Show"}
          </Button>
          <CardText className="foot_text">
            {`Comments: ${comments.length} - Like: ${like} `}
          </CardText>
          <Mutation mutation={UPDATE_POST_MUTATION} refetchQueries={[{ query: USERS_QUERY }]}>
            {updataPost => {
              this.updataPost = updataPost;
              return (
                <div className="thumb">
                  <div className="thumb_up" onClick={this.thumb_up}> 
                    <MaterialIcon icon="thumb_up"/>
                  </div>
                  <div className="thumb_down" onClick={this.thumb_down}> 
                    <MaterialIcon icon="thumb_down"/>
                  </div>
                </div>
              );
            }}
          </Mutation>
        </CardFooter>
        {
        this.state.OpenComment? 
          <CardFooter>
            {comments.length?<div className="foot_comment_box">{commentsitem}</div>:null}
            {this.createInputComment()}
          </CardFooter>:
          null
        }
    </Card>
    );
  }
}


export default Post
