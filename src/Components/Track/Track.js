import React from "react";
import './Track.css';

export class Track extends React.Component {
    constructor (props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playPauseSample = this.playPauseSample.bind(this);

    }




    
    renderActionRemoveAddTrack() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>;
        } else {
            return (
            <div>
                <button className="Track-action" onClick={this.playPauseSample}>⏯️</button> 
                <button className="Track-action" onClick={this.addTrack}>+</button>
            </div>
            );
        }
    }

    playPauseSample () {
        this.props.playPauseSample(this.props.track.id);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    render () {
        return ( 
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderActionRemoveAddTrack()}
            </div>
        );
    }
}