import React, { Component } from 'react';
import { Button, ButtonGroup, Table, Card, Container, CardImg, CardBody, CardTitle, CardSubtitle,
CardText, CardDeck, Row, Col } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import './PostList.css';
import GetDate from './GetDate';

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {posts: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/posts')
      .then(response => response.json())
      .then(data => this.setState({posts: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPosts = [...this.state.posts].filter(i => i.id !== id);
      this.setState({posts: updatedPosts});
    });
  }

  render() {
    const {posts, isLoading} = this.state;

    if (isLoading) {
     return <p>Loading...</p>;
   }

    const postList = posts.map(post => {
      //const text = `${post.text || ' '} ${post.author || ' '} ${post.date || ' '}`;
      return <Card key={post.id}>
      <CardImg alt="..." top src="https://images.unsplash.com/photo-1543800642-86975c2faf0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"/>
      <CardBody>
        <CardTitle className=" h2 mb-0">{post.title}</CardTitle>
        <small className=" text-muted">
          by {post.author} on {post.date}
        </small>
        <CardText className=" mt-4">
        </CardText>
        <Button
          outline color="primary"
          tag={Link} to={"/more/" + post.id}
        >
          View article
        </Button>
        <Button
          outline color="info"
          tag={Link} to={"/posts/" + post.id}
        >
          Edit
        </Button>
        <Button
          outline color="danger"
          onClick={() => this.remove(post.id)}
        >
          Delete
        </Button>
      </CardBody>
    </Card>
      });

    return (
      <div>
        <AppNavbar/>
        <div className="w-100 p-1" style={{display: 'flex',}}>
          {postList}
          </div>
          <GetDate></GetDate>
      </div>
    );
  }
}

export default PostList;