'use strict';

var Router = require('react-router');
var Reflux = require('reflux');
var ListingApi = require('../webapi/Listing').ListingApi;
var ProfileApi = require('../webapi/Profile').ProfileApi;

var Actions = Reflux.createActions([
    'fetchNewArrivals', 'newArrivalsFetched',
    'fetchMostPopular', 'mostPopularFetched',
    'fetchFeatured', 'featuredFetched',
    'search', 'searchCompleted',
    'launch',
    'addToLibrary', 'addedToLibrary',
    'removeFromLibrary', 'removedFromLibrary',
    'save', 'saved', 'saveFailed'
]);


Actions.fetchNewArrivals.listen(function () {
    ListingApi.getNewArrivals().then(Actions.newArrivalsFetched);
});

Actions.fetchMostPopular.listen(function () {
    ListingApi.getMostPopular().then(Actions.mostPopularFetched);
});

Actions.fetchFeatured.listen(function () {
    ListingApi.getFeatured().then(Actions.featuredFetched);
});

Actions.search.listen(function (options) {
    ListingApi.search(options).then(Actions.searchCompleted);
});

Actions.launch.listen(function (listing) {
    window.open(listing.launchUrl());
});

Actions.addToLibrary.listen(function (listing) {
    ProfileApi
        .addToLibrary({
            listing: {
                id: listing.id()
            }
        })
        .then(Actions.addedToLibrary.bind(null, listing));
});

Actions.removeFromLibrary.listen(function (listing) {
    ProfileApi
        .removeFromLibrary(listing)
        .then(Actions.removedFromLibrary.bind(null, listing));
});

Actions.save.listen(function (data) {
    ListingApi
        .save(data)
        .then(Actions.saved)
        .then(function () {
            Router.transitionTo('/');
        })
        .fail(Actions.saveFailed);
});

module.exports = Actions;