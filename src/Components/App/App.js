import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
import './App.css';

class App extends React.Component{ 
  constructor (props) {
    super(props);
    this.state = { 
      searchResults: [],
      playListName: 'New Playlist',
      playlistTracks: [],
      samples: {}
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      let sampleList={};
      searchResults.forEach(track => {
        let trackId = track.id;
        let sample = new Audio(track.sample);
        sampleList[trackId] = sample;
      })
      this.setState({  
        searchResults: searchResults,
        samples: sampleList 
      });
    });
  }


  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackURIs).then(() => {
      this.setState({ 
        playListName: 'New PlayList',
        playlistTracks: [] });
    });
  }

  updatePlaylistName(name) {
    this.setState({ playListName: name });

  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let searchResultTracks = this.state.searchResults;

    let newTracks = tracks.filter(removedTrack => removedTrack.id !== track.id)
    searchResultTracks.splice(0,0,track);
    this.setState({ 
      playlistTracks: newTracks,
      searchResults: searchResultTracks
     });
  }

  addTrack (track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    let newSearchResltTracks = this.state.searchResults.filter(removedTrack => removedTrack.id !== track.id);
    this.setState({ 
      playlistTracks: tracks,
      searchResults: newSearchResltTracks
    });
  }

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} samples={this.state.samples} />
          <Playlist playListName={this.state.playListName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
        </div>
      </div>
    </div>
    );
  }
}

export default App;

//James Taylor