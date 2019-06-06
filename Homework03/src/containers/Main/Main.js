import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo'
import MaterialIcon  from 'material-icons-react'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap'

import {
  //POSTS_QUERY,
  USERS_QUERY,
  CREATE_POST_MUTATION,
  //POSTS_SUBSCRIPTION,
  USERS_SUBSCRIPTION,
  LOGIN_QUERY,
  //LOGIN_SUBSCRIPTION
  SIGNOUT_USER_MUTATION,
  ALLUSERS_QUERY
} from '../../graphql'
//import Post from '../../components/Post/Post'
import User from '../../components/User/User'
import classes from './Main.module.css'

let unsubscribe = null

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: '',
      formBody: '',
      dropdownOpen: false,
      selectAuthorName: 'Authors',
      selectAuthorID: null
    }
  }


  

  handleFormSubmit = e => {
    e.preventDefault()

    const { formTitle, formBody } = this.state

    if (!formTitle || !formBody) {
      alert("Give Text")
      return
    }
    if (!this.state.selectAuthorID) {
      alert("Give Author")
      return
    }
    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: this.state.selectAuthorID,
        like: 0
      }
    })

    this.setState({
      formTitle: '',
      formBody: '',
      selectAuthorName: 'Authors',
      selectAuthorID: null
    })
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  select = e => {
    this.setState({
      selectAuthorName: e.target.innerText,
      selectAuthorID: e.target.id
    });
  }

  signout = () => {
    this.signoutUser()
    const { history } = this.props;
    history.push('/login');
  }
  

  render() {
    var login_state = null;
    
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={SIGNOUT_USER_MUTATION} refetchQueries={[{ query: LOGIN_QUERY }]}>
              {signoutUser => {
                this.signoutUser = signoutUser;
                return (
                  <div className={classes.signout} onClick={this.signout}> 
                    <MaterialIcon icon="exit_to_app"/> Log Out
                  </div>
                );
              }}
            </Mutation>
            <Mutation mutation={CREATE_POST_MUTATION} refetchQueries={[{ query: USERS_QUERY }]}>
              {createPost => {
                this.createPost = createPost
                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <Col sm={{ size: 'auto'}}>
                          <DropdownToggle caret color="info">
                          {this.state.selectAuthorName}
                          </DropdownToggle>
                          <DropdownMenu>
                            <Query query={LOGIN_QUERY}>
                              {({ loading, error, data}) => {
                                if (loading) return <p>Loading...</p>
                                if (error) return <p>Error :(((</p>
                                login_state = data.isLogin
                                //let login_check = data.isLogin ? true:false;
                                if (!login_state)
                                  return <Redirect to="/login" />;
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
                        </Col>
                      </Dropdown>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={this.state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={e =>
                            this.setState({ formTitle: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={this.state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={e =>
                          this.setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                )
              }}
            </Mutation>
          </Col>
          <Col className={classes.posts} xs="6">
            <Query query={ALLUSERS_QUERY}>
            {({ loading, error, data}) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>          
                const users = data.allusers.map((user, id) => (
                    <User data={user} key={id} login_state={login_state} />
                  ))
                return <div>{users}</div>
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
