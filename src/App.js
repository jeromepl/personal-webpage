import React, { Component } from 'react';
import PanelContainer from './PanelContainer';
import Panel from './Panel';
import Project from './Project';
import profileImg from './res/profile.png';
import locomotionVid from './res/locomotion.mp4';
import resume from './res/jeromepl-resume.pdf';
import './App.css';

const PANEL_TITLES = ['Home', 'About', 'Locomotion', 'Binge', 'Audio Sphere', 'Resume', 'Contact'];

class App extends Component {
    constructor(props) {
        super(props);
        this.panelContainerRef = React.createRef();
    }

    render() {
        return (
            <>
                <PanelContainer ref={this.panelContainerRef} panelTitles={PANEL_TITLES}>
                    <Panel>
                        <div className="home-content">
                            <h1>Jérôme Parent-Lévesque</h1>
                            <p className="short-description">
                                Master's Student in Computer Science in the{' '}
                                <a href="https://mila.quebec/en/">MILA Lab</a>,
                                <br />
                                under Professor{' '}
                                <a href="https://mila.quebec/en/person/aaron-courville/">Aaron Courville</a> and
                                Professor <a href="http://www.cim.mcgill.ca/~derek/">Derek Nowrouzezahrai</a>. <br />
                                ML Researcher &amp; Web Development Enthusiast
                            </p>
                        </div>
                    </Panel>
                    <Panel>
                        <div className="about-content">
                            <img className="profile-pic" src={profileImg} alt="Profile" />
                            <div className="long-description">
                                <h2>Hi!</h2>
                                <p>
                                    I am a Master's student at the <a href="https://mila.quebec/en/">MILA Lab</a>,
                                    working under{' '}
                                    <a href="https://mila.quebec/en/person/aaron-courville/">Aaron Courville</a> and{' '}
                                    <a href="http://www.cim.mcgill.ca/~derek/">Derek Nowrouzezahrai</a>. My research
                                    focuses on Spherical CNNs: convolutional networks applied to spherical signals such
                                    as earth and star maps. I hold a Bachelor's degree in Electrical Engineering from
                                    McGill University where I graduated from the Honours program. During my Bachelor's,
                                    I developed skills in various software engineering fields through{' '}
                                    <a href="https://github.com/jeromepl">personal projects</a> and internships at
                                    Amazon, Vigilant and the McGill DDMAL Lab.
                                </p>
                            </div>
                        </div>
                        <p className="find-more-text">
                            Find out more about me and my projects using the following links!
                        </p>
                        <div className="social-network-links">
                            <a href="https://github.com/jeromepl">
                                <i className="fa fa-github fa-2x" />
                            </a>
                            <a href="https://linkedin.com/in/jeromepl">
                                <i className="fa fa-linkedin fa-2x" />
                            </a>
                            <a href="https://twitter.com/jerome_pl">
                                <i className="fa fa-twitter fa-2x" />
                            </a>
                        </div>
                    </Panel>
                    {/** TODO: Projects to add to this list:
                        - NodyNotes
                        - Slooth or Highlighter
                        - Gimme?
                        - enorm reproducibility?
                    */}
                    <Panel>
                        <Project
                            title="Locomotion"
                            description="Imitation Learning for Physics-Based Character Locomotion. An attempt to reproduce humanoid walk results from the paper DeepMimic (Peng et al., 2018) using minimal code and assumptions. Done as part of my final Honours Thesis as an undergrad."
                            githubUrl="https://github.com/jeromepl/Locomotion"
                            video={locomotionVid}
                        />
                    </Panel>
                    <Panel>
                        <Project
                            title="Binge"
                            description="Binge is a TV show suggestion engine. It allows you to rate shows, get suggestions and save them for later. Winner of the 2016 McGill Code.jam() competition!"
                            src="https://kartoshka.github.io/Binge/"
                            githubUrl="https://github.com/Kartoshka/Binge"
                        />
                    </Panel>
                    <Panel>
                        <Project
                            src="http://jeromepl.github.io/3D-audio-sphere/"
                            title="Audio Sphere"
                            description="Full sound spectrum visualization on a 3D sphere with three.js"
                            githubUrl="https://github.com/jeromepl/3D-audio-sphere"
                        />
                    </Panel>
                    <Panel>
                        <div className="resume">
                            <h2>My Resume</h2>
                            <iframe title="My Resume" src={`${resume}#view=FitH`} />
                        </div>
                    </Panel>
                    <Panel>
                        <h2>&copy; 2019 Jérôme Parent-Lévesque</h2>
                        <div className="social-network-links">
                            <a href="https://github.com/jeromepl">
                                <i className="fa fa-github fa-2x" />
                            </a>
                            <a href="https://linkedin.com/in/jeromepl">
                                <i className="fa fa-linkedin fa-2x" />
                            </a>
                            <a href="https://twitter.com/jerome_pl">
                                <i className="fa fa-twitter fa-2x" />
                            </a>
                        </div>
                        <button onClick={() => this.panelContainerRef.current.goToPanel(0)}>Back to Top</button>
                    </Panel>
                </PanelContainer>
            </>
        );
    }
}

export default App;
