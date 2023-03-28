import React from "react";
import { Track } from "../Track/Track.js";
import './TrackList.css';

export class TrackList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prevKey: null
        };

        this.playPauseSample = this.playPauseSample.bind(this);
    }

    playPauseSample (key) {
        let prevKey;

        if(this.state.prevKey) { 
            this.props.samples[this.state.prevKey].pause();
            this.props.samples[key].play();
            prevKey = key;
        } 
        
        if (!this.state.prevKey) {
            this.props.samples[key].play();
            prevKey = key;
        }

        if (this.state.prevKey === key) {
            this.props.samples[key].pause();
            prevKey = null;
        }
        this.setState({ prevKey: prevKey }); 
    }

    render () {
        return (
            <div className="TrackList">
                {
                this.props.tracks.map(track => {
                    return <Track track={track} 
                            key={track.id} 
                            onAdd={this.props.onAdd} 
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}
                            playPauseSample={this.playPauseSample}
                            isPlayed = {this.state.isPlayed}  />
                            

                    })
                }
            </div>
        );
    }
}