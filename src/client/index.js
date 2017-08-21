const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const Main = require('./components/main.jsx');
const store = require('./store');

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('seaweed-app')
);
