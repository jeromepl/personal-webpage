import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import './Project.css';

export default class Project extends Component {
    render() {
        return (
            <div className="project">
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>

                <a href={this.props.githubUrl}>
                    <img
                        src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
                        alt="Fork me on GitHub"
                    />
                </a>
                {this.props.src && (
                    <VisibilitySensor partialVisibility={true}>
                        {({ isVisible }) => <iframe src={isVisible ? this.props.src : ''} title={this.props.title} />}
                    </VisibilitySensor>
                )}
                {this.props.video && (
                    <video controls>
                        <source src={this.props.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
        );
    }
}
