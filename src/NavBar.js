import React, { Component } from 'react';
import './NavBar.css';

export default class NavBar extends Component {
    render() {
        return (
            <div id="progress">
                <ul>
                    {this.props.panelTitles.map((title, panelId) => {
                        return (
                            <li
                                className={panelId === this.props.currentPanelId ? 'current selected' : ''}
                                onClick={() => this.props.goToPanel(panelId)}
                                key={panelId}
                            >
                                <div className="navTitle">{title}</div>
                                {/* eslint-disable-next-line */}
                                <a href="#" />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
