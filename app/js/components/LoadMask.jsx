'use strict';

var React = require('react');
var Spinner = require('spin.js/spin');

var LoadMask = React.createClass({
    spinner: null,

    render: function() {
        return (
            <div className="load-mask-container">
                <div className="load-mask-content">
                    <p ref="spinner" tabIndex="0" className="load-mask-icon" />
                    <p className="load-mask-message">{this.props.message}</p>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        var spinnerEl = this.refs.spinner.getDOMNode();

        this.spinner = new Spinner({color: '#fff'});

        this.spinner.spin(spinnerEl);

        spinnerEl.focus();
    },

    componentWillUnmount: function() {
        this.spinner.stop();
    },

    shouldComponentUpdate: function(newProps) {
        return newProps.message !== this.props.message;
    }
});

module.exports = LoadMask;
