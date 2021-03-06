'use strict';

var React = require('react');
var Router = require('react-router');
var { RouteHandler } = Router;
var Tab = require('../../../mixins/TabMixin');
var UserRoleMixin = require('../../../mixins/UserRoleMixin');
var SystemStore = require('../../../stores/SystemStore');

// component dependencies
var NavBar = require('../../NavBar/index.jsx');
var Header = require('../../header/index.jsx');

var MallManagement = React.createClass({

    mixins: [ Tab, UserRoleMixin.Admin ],

    statics: {
        willTransitionFrom: function () {
            // refresh config cache when transitioning away
            SystemStore.loadSystem();
        }
    },

    getDefaultProps: function () {
        return {
            tabs: [{
                to: 'categories',
                name: 'Categories'
            }, {
                to: 'contact-types',
                name: 'Contact Types'
            }, {
                to: 'intents',
                name: 'Intents'
            }, {
                to: 'organizations',
                name: 'Organizations'
            }, {
                to: 'stewards',
                name: 'Stewards'
            }, {
                to: 'notifications',
                name: 'Notifications'
            }]
        };
    },

    render: function () {
        return (
            <div className="MallManagement">
                <NavBar />
                <Header />
                <div className="MallManagement__body">
                    <h1>Center Settings</h1>
                    <div className="MallManagement__TabContainer">
                        { this.renderTabs(this.props.tabs) }
                        <div className="tab-content">
                            <RouteHandler />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = MallManagement;
module.exports.Categories = require('./Categories.jsx');
module.exports.ContactTypes = require('./ContactTypes.jsx');
module.exports.Organizations = require('./Organizations.jsx');
module.exports.Intents = require('./Intents.jsx');
module.exports.Stewards = require('./Stewards.jsx');
module.exports.Notifications = require('./notifications/index.jsx');
