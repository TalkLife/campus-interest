// Load component styles
var styles = require('./style.scss');

// Load modules
var Reflux = require('reflux');

var Api = require('../../functions/Api')

module.exports = React.createClass({
    getInitialState: function(){
        return {
            campusName: "",
            country: "",
            website: "",
            yourName: "",
            yourPosition: "",
            why: "",
            disabled: false,
            error: null,
            success: false
        };
    },
    getDefaultProps: function(){
        return {

        };
    },

    componentWillMount: function() {
        styles.use(); // Load styles
        document.title = "TalkCampus";
    },
    componentDidMount: function() {

    },
    componentWillUnmount: function() {
        styles.unuse(); // Remove styles
    },

    onChange: function(input,event){
        // Reset form error
        var state = {error:null};
        // Set state value to input value
        state[input] = event.target.value;
        this.setState(state);
    },

    submit: function(event){
        event.preventDefault();

        Api("POST","https://plexus.talklife.co/api/campusInterest",{
            campusName: this.state.campusName,
            country: this.state.country,
            website: this.state.website,
            yourName: this.state.yourName,
            yourPosition: this.state.yourPosition,
            why: this.state.why
        },{
            pre: function(){
                this.setState({disabled:true});
            }.bind(this),
            success: function(data){
                this.setState({success:true});
            }.bind(this),
            fail: function(error){
                this.setState({disabled:false,error:error.error});
            }.bind(this)
        })
    },

    render: function() {
        var form = (
            <div>
                <h3>Register Your Interest</h3>
                {this.state.error ? (<div className="error">{this.state.error}</div>) : null}
                <form onSubmit={this.submit}>
                    <input type="text" placeholder="Campus Name" value={this.state.campusName} onChange={this.onChange.bind(null,"campusName")} />
                    <input type="text" placeholder="Country" value={this.state.country} onChange={this.onChange.bind(null,"country")} />
                    <input type="text" placeholder="University Website URL" value={this.state.website} onChange={this.onChange.bind(null,"website")} />
                    <input type="text" placeholder="Your Name" value={this.state.yourName} onChange={this.onChange.bind(null,"yourName")} />
                    <input type="text" placeholder="Your Position" value={this.state.yourPosition} onChange={this.onChange.bind(null,"yourPosition")} />
                    <textarea placeholder="Why does your university need TalkCampus?" value={this.state.why} onChange={this.onChange.bind(null,"why")} />
                    <input type="submit" className="gradient" />
                </form>
            </div>
        )

        if(this.state.success){
            form = (
                <h3 className="success">Thanks for registering your interest, we'll be in touch</h3>
            )
        }

        return (
            <div className="Home">
                <div className="main" style={{"backgroundImage":"url(res/backgrounds/cover.jpg)"}}>
                    <div className="content">
                        <img src="res/img/logo.jpg" className="logo" />
                        <h1>Campus</h1>
                    </div>
                </div>
                <div className="lower">
                    <div className="content">
                        <h2>Campus is Coming</h2>
                        <p>TalkLife is already one of the world’s leading peer to peer support networks with hundreds of thousands of users from all around the world. It’s a safe, moderated community which values encouragement and acceptance.</p>
                        <p>We are excited to announce that TalkLife Campus is coming. It is built for students, where they can chat with other students in a safe and encouraging environment. They will also be able to access all of your campus student mental health services in one place.</p>
                        {form}
                    </div>
                </div>
            </div>
        );
    }
});