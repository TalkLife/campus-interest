require('expose?React!react');

require('./styles/style.scss').use();

var Home = require('./components/Home');

React.render(<Home />, document.body);