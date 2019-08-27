import React, { Component } from 'react';
import User from './User';
import UserCount from './UserCount';
import TopArtistsAndTracks from './TopArtistsAndTracks';

class HomeContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { userInfo: {}, topArtists: { items: [] }, topTracks: { items: [] } };
  }

  componentDidMount() {
    fetch('/api/spotify/me')
      .then(res => res.json())
      .then(userInfo => {
        this.setState({ userInfo });
        console.log('userInfo', userInfo);
      });
    fetch('/api/spotify/me/artists?limit=5')
      .then(res => res.json())
      .then(topArtists => {
        this.setState({ topArtists });
        console.log('topartists', topArtists);
      });
    fetch('/api/spotify/me/tracks?limit=5')
      .then(res => res.json())
      .then(topTracks => {
        this.setState({ topTracks });
        console.log('topTracks', topTracks);
      });
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value }); // eslint-disable-line react/no-unused-state
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('SUBMITING', this.state);
  }

  render() {
    const { userInfo, topArtists, topTracks } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div style={{ fontSize: '28px', fontWeight: '600' }}>Spotify Analytics</div>
            <User userInfo={userInfo} />
            <UserCount />
            <TopArtistsAndTracks topArtists={topArtists} topTracks={topTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;