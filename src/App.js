import React, { Component } from 'react';
import PanelContainer from './PanelContainer';
import Panel from './Panel';

const PANEL_TITLES = [
    'Home',
    'About',
    'Projects',
    'Project 1',
    'Project 2',
    'Project 3',
    'Games',
    'Photography',
    'Contact'
];

class App extends Component {
    constructor(props) {
        super(props);
        this.panelContainerRef = React.createRef();
    }

    render() {
        return (
            <React.Fragment>
                <PanelContainer ref={this.panelContainerRef} panelTitles={PANEL_TITLES}>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Development Wizard
                        </p>
                    </Panel>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Development Wizard
                        </p>
                    </Panel>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Development Wizard
                        </p>
                    </Panel>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Development Wizard
                        </p>
                    </Panel>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Development Wizard
                        </p>
                    </Panel>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Development Wizard
                        </p>
                    </Panel>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Development Wizard
                        </p>
                    </Panel>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Development Wizard
                        </p>
                    </Panel>
                    <Panel>
                        <h1>Jérôme Parent-Lévesque</h1>
                        <p>
                            Electrical Engineering Student <br />
                            Web Developer Enthusiast
                        </p>
                        <button onClick={() => this.panelContainerRef.current.goToPanel(0)}>Back to Top</button>
                    </Panel>
                </PanelContainer>
            </React.Fragment>
        );
    }
}

export default App;
