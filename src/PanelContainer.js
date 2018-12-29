import React, { Component } from 'react';
import Panel from './Panel.js';
import NavBar from './NavBar';
import arrowImg from './img/arrowDown.png';
import './PanelContainer.css';

const BG_COLORS = [
    // All possible background colors for panels
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#f39c12',
    '#d35400',
    '#c0392b'
];

// Possible directions for panels to come from
const DIRECTIONS = ['right', 'left', 'top', 'bottom'];

export default class PanelContainer extends Component {
    panelAttributes = [];

    yDown = null; // State variable for 'touchstart' and 'touchmove' handlers

    // State variables for handling move events:
    lastCallTime = 0;
    lastPanelChangeTime = 0;

    constructor(props) {
        super(props);

        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);

        this.goToPanel = this.goToPanel.bind(this);
        this.showPreviousPanel = this.showPreviousPanel.bind(this);
        this.showNextPanel = this.showNextPanel.bind(this);

        this.state = { currentPanelId: 0, panelChangeUpdate: false };
        // panelChangeUpdate is used to fix a bug by forcing a second render after changing a panel once
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('wheel', this.handleWheel);
        window.addEventListener('touchstart', this.handleTouchStart);
        window.addEventListener('touchmove', this.handleTouchMove);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
    }

    handleKeydown(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            this.showPreviousPanel();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            this.showNextPanel();
        }
    }

    handleWheel(e) {
        this.handleMoveEvent(e.deltaY);
    }

    handleTouchStart(e) {
        this.yDown = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.yDown) return;
        this.handleMoveEvent(this.yDown - e.touches[0].clientY);
        this.yDown = null;
    }

    handleMoveEvent(deltaY) {
        const currentTime = Date.now();
        // Prevent sliding more than one panel in 350ms or if continuous scrolls have occured
        if (currentTime - this.lastPanelChangeTime <= 350 || currentTime - this.lastCallTime <= 50) {
            this.lastCallTime = currentTime;
            return;
        }
        this.lastCallTime = currentTime;
        this.lastPanelChangeTime = currentTime;

        if (deltaY <= 0) {
            this.showPreviousPanel();
        } else {
            this.showNextPanel();
        }
    }

    showPreviousPanel() {
        if (this.state.currentPanelId > 0) {
            this.setState({ currentPanelId: this.state.currentPanelId - 1 });
        }
    }

    showNextPanel() {
        if (this.state.currentPanelId < PanelContainer.countPanelChildren(this.props.children)) {
            this.setState({ currentPanelId: this.state.currentPanelId + 1 });
        }
    }

    goToPanel(panelId) {
        this.setState({ currentPanelId: panelId });
    }

    /**
     * Random panel generation happens here (background color and direction are passed to child Panels through props)
     */
    render() {
        // Generate new background colors and panel directions as needed
        while (this.panelAttributes.length < PanelContainer.countPanelChildren(this.props.children)) {
            let direction;
            if (this.panelAttributes.length === 0) {
                direction = 'center'; // Always just keep the first panel centered and static
            } else {
                do {
                    // Make sure no two consecutive panels come from the same direction for a prettier result
                    direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
                } while (direction === this.panelAttributes[this.panelAttributes.length - 1].direction);
            }

            let color;
            do {
                color = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];
            } while (
                this.panelAttributes.length !== 0 &&
                color === this.panelAttributes[this.panelAttributes.length - 1].color
            );

            this.panelAttributes.push({ color, direction });
        }

        // Add a background-color style prop to the Panel children
        let panelIdx = -1;
        const children = React.Children.map(this.props.children, child => {
            if (child.type !== Panel) return child;
            panelIdx++;
            const style = { ...child.style, backgroundColor: this.panelAttributes[panelIdx].color };
            const direction =
                panelIdx <= this.state.currentPanelId ? 'center' : this.panelAttributes[panelIdx].direction;
            return React.cloneElement(child, { style, direction });
        });

        let navArrowStyle = {};
        if (this.state.currentPanelId !== 0) {
            navArrowStyle = { ...navArrowStyle, animation: 'none' };

            if (this.state.panelChangeUpdate) {
                navArrowStyle = { ...navArrowStyle, bottom: '-100%', opacity: 0 };
            } else {
                // Timeout fixes a bug in Chrome where the bottom property would not animate
                setTimeout(() => {
                    this.setState({ panelChangeUpdate: true });
                }, 0);
            }
        } else if (this.state.panelChangeUpdate) {
            this.setState({ panelChangeUpdate: false });
        }

        return (
            <div className="panel-container">
                {children}
                <div id="nav-info" style={navArrowStyle} onClick={() => this.showNextPanel()}>
                    <div>Scroll down to navigate</div>
                    <img src={arrowImg} alt="arrow" className="icon" />
                </div>
                <NavBar
                    currentPanelId={this.state.currentPanelId}
                    goToPanel={this.goToPanel}
                    panelTitles={this.props.panelTitles}
                />
            </div>
        );
    }

    static countPanelChildren(children) {
        let count = 0;
        React.Children.forEach(children, child => (count += child.type === Panel ? 1 : 0));
        return count;
    }
}
