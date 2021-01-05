import React, { Component } from 'react';
import PanelContainer from './PanelContainer';
import Panel from './Panel';
import Project from './Project';
import { ReactComponent as NameSVG } from './res/name.svg';
import profileImg from './res/profile.jpg';
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
                            <NameSVG />
                            <p className="short-description">
                                Master's Student in Computer Science in the{' '}
                                <a href="https://mila.quebec/en/" target="_blank" rel="noopener noreferrer">
                                    MILA Lab
                                </a>
                                ,
                                <br />
                                graduating December 2020
                                . <br />
                                <strong>Machine Learning | Computer Graphics | Web Dev</strong>
                            </p>
                        </div>
                    </Panel>
                    <Panel>
                        <div className="about-content">
                            <img className="profile-pic" src={profileImg} alt="Profile" />
                            <div className="long-description">
                                <h2>Bonjour / Hi!</h2>
                                <p>
                                    I am a Master's student at the{' '}
                                    <a href="https://mila.quebec/en/" target="_blank" rel="noopener noreferrer">
                                        MILA Lab
                                    </a>
                                    , working under{' '}
                                    <a
                                        href="https://mila.quebec/en/person/aaron-courville/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Aaron Courville
                                    </a>{' '}
                                    and{' '}
                                    <a
                                        href="http://www.cim.mcgill.ca/~derek/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Derek Nowrouzezahrai
                                    </a>
                                    . My research is at the intersection of Machine Learning and Computer Graphics and focuses on Differentiable Rendering, 
                                    Unsupervised Inverse Graphics and 3D Object/Scene Representations suitable for Machine Learning. 
                                    I hold a Bachelor's degree in Electrical Engineering from McGill University where I graduated from the Honours program.
                                    During my Master's and Bachelor's, I developed skills in various software engineering fields
                                    through{' '}
                                    <a href="https://github.com/jeromepl" target="_blank" rel="noopener noreferrer">
                                        personal projects
                                    </a>{' '}
                                    and internships at Ubisoft, Amazon, Vigilant and the McGill DDMAL Lab.
                                </p>
                            </div>
                        </div>
                        <p className="find-more-text">
                            Find out more about me and my projects using the following links! (or keep scrolling!)
                        </p>
                        <div className="social-network-links">
                            <a href="https://github.com/jeromepl" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-github fa-2x" />
                            </a>
                            <a href="https://linkedin.com/in/jeromepl" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-linkedin fa-2x" />
                            </a>
                            <a href="https://twitter.com/jerome_pl" target="_blank" rel="noopener noreferrer">
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
                            src="https://jeromepl.github.io/3D-audio-sphere/"
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
                        <h2>&copy; 2021 Jérôme Parent-Lévesque</h2>
                        <div className="social-network-links">
                            <a href="https://github.com/jeromepl" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-github fa-2x" />
                            </a>
                            <a href="https://linkedin.com/in/jeromepl" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-linkedin fa-2x" />
                            </a>
                            <a href="https://twitter.com/jerome_pl" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-twitter fa-2x" />
                            </a>
                        </div>
                        <button onClick={() => this.panelContainerRef.current.goToPanel(0)}>Back to Top</button>
                        <a href="https://github.com/jeromepl/personal-webpage">Fork this webpage on GitHub</a>
                    </Panel>
                </PanelContainer>
            </>
        );
    }
}

export default App;
