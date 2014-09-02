/** @jsx React.DOM */
'use strict';

var React = require('react');
var IconRating = require('react-icon-rating');
var launch = require('../../actions/ListingActions').launch;

var ListingTile = React.createClass({

    render: function () {
        var listing = this.props.listing;

        var name = listing.title();
        var description = listing.description() && listing.description().substr(0, 140);
        var launchUrl = listing.launchUrl();
        var imageLargeUrl = listing.imageLargeUrl();
        var totalVotes = listing.totalVotes();
        var avgRate = listing.avgRate();
        var company = listing.company();

        /*jshint ignore:start */
        return this.transferPropsTo(
            <li className="listing listing-tile">
                <a href="javascript:;">
                    <img src={ imageLargeUrl } />
                    <section className="slide-up">
                        <p className="title">{ name }</p>
                        <IconRating
                            className="icon-rating"
                            viewOnly
                            currentRating = { avgRate }
                            toggledClassName="fa fa-star"
                            untoggledClassName="fa fa-star-o"
                            halfClassName="fa fa-star-half-o" />
                        {
                            company &&
                                <span className="company">{ company }</span>
                        }
                        <p className="description">{ description }</p>
                        <div className="btn-group actions">
                            {/* can't nest anchor tags, using button here with onClick listener */}
                            <button className="btn btn-default" onClick={ this.launch }><i className="fa fa-external-link"></i></button>
                            <button type="button" className="btn btn-default"><i className="fa fa-link"></i> Connect</button>
                        </div>
                    </section>
                </a>
            </li>
        );
        /*jshint ignore:end */
    },

    launch: function () {
        launch(this.props.listing);
    }

});

module.exports = ListingTile;