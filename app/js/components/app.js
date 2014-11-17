'use strict';

var React = require('react');
var Reflux = require('reflux');

var ConfigStore = require('../stores/ConfigStore');
var ProfileStore = require('../stores/ProfileStore');
var ProfileActions = require('../actions/ProfileActions');

var Quickview = require('../components/quickview');
var CreateEditListing = require('./createEdit');

function getState () {
    return {
        currentUser: ProfileStore.getSelf(),
        library: ProfileStore.getLibrary(),
        config: ConfigStore.getConfig()
    };
}

var App = React.createClass({

    mixins: [ Reflux.ListenerMixin ],

    getInitialState: function () {
        return getState();
    },

    render: function () {
        var { config, library, currentUser } = this.state;

        if(!config || !library || !currentUser) {
            /*jshint ignore:start */
            return <p>Loading...</p>;
            /*jshint ignore:end */
        }

        /*jshint ignore:start */
        return (
            <div id="App">
                <this.props.activeRouteHandler config={ this.state.config } />
                { this.renderModal() }
            </div>
        );
        /*jshint ignore:end */
    },

    renderModal: function () {
        var { listing, tab, action } = this.props.query;

        /*jshint ignore:start */
        if (listing && tab) {
            return (
                <Quickview listing={listing} tab={tab} />
            );
        }
        else if (['create-listing', 'edit'].indexOf(action) > -1) {
            return (
                <CreateEditListing listingId={listing} />
            )
        }
        /*jshint ignore:end */
    },

    componentWillMount: function () {
        this.listenTo(ProfileStore, this.onStoreChanged);
        this.listenTo(ConfigStore, this.onStoreChanged);
        ProfileActions.fetchLibrary();
    },

    onStoreChanged: function () {
        this.setState(getState());
    }
});

module.exports = App;
