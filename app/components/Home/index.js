// Load component styles
var styles = require('./style.scss');

// Load modules
var Reflux = require('reflux');

module.exports = React.createClass({
    getInitialState: function(){
        return {

        };
    },
    getDefaultProps: function(){
        return {

        };
    },

    componentWillMount: function() {
        styles.use(); // Load styles
        document.title = "TalkLife Campus";
    },
    componentDidMount: function() {

    },
    componentWillUnmount: function() {
        styles.unuse(); // Remove styles
    },

    render: function() {
        return (
            <div className="Home">
                <div className="main" style={{"backgroundImage":"url(res/backgrounds/cover.jpg)"}}>
                    <div className="content">
                        <img src="res/img/logo.png" className="logo" />
                        <h1>Campus</h1>
                    </div>
                </div>
                <div className="lower">
                    <div className="content">
                        <h2>Campus is Coming</h2>
                        <p>Built for students. Chat with peers in a safe encouraging environment. Access all of your campus student mental health services in one place.</p>
                        <h3>Let us know<br />you're interested</h3>
                        <form>
                            <input type="text" placeholder="Campus Name" />
                            <input type="text" placeholder="Country" />
                            <input type="text" placeholder="Number of Students" />
                            <input type="text" placeholder="University Website URL" />
                            <input type="text" placeholder="Your Name" />
                            <input type="text" placeholder="Your Position" />
                            <textarea placeholder="Why would your university TalkCampus?" />
                            <input type="submit" className="gradient" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});