'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');

var UserRoleMixin = require('../../mixins/UserRoleMixin');
var SystemStateMixin = require('../../mixins/SystemStateMixin');

var Sidebar = require('./shared/Sidebar.jsx');
var ApprovalStatusFilter = require('./shared/ApprovalStatusFilter.jsx');
var EnabledFilter = require('./shared/EnabledFilter.jsx');
var OrgFilter = require('./shared/OrgFilter.jsx');

var ListingTile = require('../listing/ListingTile.jsx');
var LoadMore = require('../shared/LoadMore.jsx');

var PaginatedListingsStore = require('../../stores/PaginatedListingsStore');

var ListingActions = require('../../actions/ListingActions');
var { UserRole } = require('ozp-react-commons/constants');

var AllListings = React.createClass({

    mixins: [
        UserRoleMixin.Admin,
        SystemStateMixin,
        Router.State,
        Reflux.listenTo(PaginatedListingsStore, 'onStoreChanged'),
        Reflux.listenTo(ListingActions.listingChangeCompleted, 'onListingChangeCompleted')
    ],

    getInitialState: function () {
        return {
            counts: {},
            listings: [],
            hasMore: false,
            filter: this.getQuery()
        };
    },

    getPaginatedList: function () {
        return PaginatedListingsStore.getListingsByFilter(this.state.filter);
    },

    fetchAllListingsIfEmpty: function () {
        var listings = PaginatedListingsStore.getListingsByFilter(this.state.filter);
        if (!listings) {
            ListingActions.fetchAllListings(this.state.filter);
        }
        this.onStoreChanged();
    },

    onLoadMore: function () {
        ListingActions.fetchAllListings(this.state.filter);
    },

    onFilterChanged: function (key, value) {
        this.state.filter[key] = value;
        this.fetchAllListingsIfEmpty();
        this.setState({
            filter: this.state.filter
        });
    },

    onStoreChanged: function () {
        var paginatedList = this.getPaginatedList();
        if (!paginatedList) {
            return;
        }
        var { data, hasMore, counts } = paginatedList;

        this.setState({
            listings: data,
            hasMore: hasMore,
            counts: counts
        });
    },

    onListingChangeCompleted: function () {
        ListingActions.fetchAllListings(this.state.filter);
    },

    componentDidMount: function () {
        this.fetchAllListingsIfEmpty();
    },

    render: function () {
        var sidebarFilterOptions = {
            value: this.state.filter,
            counts: this.state.counts,
            onFilterChanged: this.onFilterChanged,
            organizations: this.state.system.organizations || []
        };

        return this.transferPropsTo(
            <div className="AllListings row">
                <div className="Listings__Sidebar col-md-2">
                    <Sidebar>
                        <ApprovalStatusFilter role={ UserRole.ADMIN } { ...sidebarFilterOptions } />
                        <OrgFilter { ...sidebarFilterOptions } />
                        <EnabledFilter { ...sidebarFilterOptions } />
                    </Sidebar>
                </div>
                <LoadMore className="AllListings__listings col-md-10 all" hasMore={this.state.hasMore} onLoadMore={this.onLoadMore}>
                    { ListingTile.fromArray(this.state.listings, UserRole.ADMIN) }
                </LoadMore>
            </div>
        );
    }

});

module.exports = AllListings;
