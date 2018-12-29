import React, { Component } from 'react';
import './Panel.css';

export default class Panel extends Component {
    render() {
        return (
            <div className={`panel ${this.props.direction}`} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}
