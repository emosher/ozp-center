'use strict';

var React = require('react');
var UserNotificationDropdown = require('ozp-react-commons/components/notification/UserNotificationDropdown.jsx');
var HelpModal = require('./helpmodal.jsx');
var ProfileLink = require('../profile/ProfileLink.jsx');
var ModalLink = require('../ModalLink.jsx');
var { HUD_URL, METRICS_URL, WEBTOP_URL, DEVELOPER_RESOURCES_URL, FEEDBACK_ADDRESS } = require('ozp-react-commons/OzoneConfig');

var SystemStateMixin = require('../../mixins/SystemStateMixin');

var NavBar = React.createClass({

    mixins: [ SystemStateMixin ],

    getInitialState: function() {
        return {
            showHelp: false
        };
    },

    render: function () {
        var Metrics = (this.isAdmin() || this.isOrgSteward()) ?
            <li><a href={METRICS_URL} target="_blank"><i className="icon-bar-graph-2-grayLightest"></i>Metrics</a></li> : '';

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" id="globalNav">
                <div className="container-fluid container" id="centered">
                    <div className="navbar-left">
                        <ul className="nav navbar-nav">
                            <li><a className="lrg" href={HUD_URL}><i className="icon-home-grayLightest"></i></a></li>
                            <li className="active"><a className="lrg" href='#/home' ><i className="icon-shopping-grayLightest activeIcon"></i></a></li>
                            <li><a className="lrg" href={WEBTOP_URL}><i className="icon-layout-grayLightest"></i></a></li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <UserNotificationDropdown />
                            <li>
                                <a href="#" onClick={this.showHelpModal}><i className="icon-question-grayLightest"></i></a>
                            </li>
                            <li className="dropdown user-menu-dropdown">
                                <a href="#" className="lrg" data-toggle="dropdown"><i className="icon-menu-grayLightest"></i></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-header">Personalize</li>
                                    <li><a href={HUD_URL}><i className="icon-ribbon-grayLightest"></i>Bookmarks</a></li>
                                    <li>
                                        <ProfileLink profileId="self">
                                            <i className="icon-head-grayLightest"/>Profile
                                        </ProfileLink>
                                    </li>
                                    <li>
                                        <ModalLink queryParams={{settings: true}}>
                                            <i className="icon-cog-grayLightest"></i>Settings
                                        </ModalLink>
                                    </li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Create</li>
                                    <li><a href={'#/edit'}><i className="icon-square-plus-grayLightest"></i>Submit a Listing</a></li>
                                    <li><a href={DEVELOPER_RESOURCES_URL} target="_blank"><i className="icon-cloud-grayLightest"></i>Developer Resources</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Manage</li>
                                    <li><a href={'#/user-management/my-listings'}><i className="icon-layers-grayLightest"></i>Listing Management</a></li>
                                    {
                                        this.isAdmin() &&
                                        <li><a href={'#/mall-management/categories'}><i className="icon-shopping-settings-grayLightest"></i>Marketplace Settings</a></li>
                                    }
                                    { Metrics }
                                    <li><a href={'mailto:'+FEEDBACK_ADDRESS} className="caboose"><i className="icon-mail"></i>Submit Feedback</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    this.state.showHelp && <HelpModal onHidden={this.onModalHidden} />
                }
            </nav>
        );
    },

    isOrgSteward: function(){
        return (this.state.currentUser.highestRole === "ORG_STEWARD") ? true : false;
    },

    isAdmin: function() {
        return this.state.currentUser.isAdmin();
    },

    showHelpModal: function () {
        this.setState({ showHelp: true });
    },

    onModalHidden: function () {
        this.setState({ showHelp: false });
    }

});

module.exports = NavBar;
