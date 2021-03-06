'use strict';

var React = require('react');
var Reflux = require('reflux');
var SystemHighMessage = require('../../shared/SystemHighMessage.jsx');
var _ = require('../../../utils/_');
var IconRating = require('../../shared/IconRating.jsx');
var PopoverConfirmationButton = require('./../../shared/PopoverConfirmationButton.jsx');

var ListingActions = require('../../../actions/ListingActions');

var EditReview = React.createClass({

    mixins: [
        Reflux.listenTo(ListingActions.saveReviewCompleted, 'onSaveReviewCompleted'),
        Reflux.listenTo(ListingActions.deleteReview, 'onDeleteReviewCompleted')
    ],

    propTypes: {
        listing: React.PropTypes.object.isRequired,
        review: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        user: React.PropTypes.object.isRequired
    },

    getDefaultProps: function () {
        return {
            review: {
                id: null,
                rate: 0,
                text: ''
            }
        };
    },

    getInitialState: function () {
        return {
            review: _.pick(this.props.review, 'id', 'rate', 'text', 'author')
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.review) {
            this.setState({
                review: _.pick(nextProps.review, 'id', 'rate', 'text', 'author')
            });
        }
    },

    onRatingChange: function (val) {
        this.state.review.rate = val;
        this.forceUpdate();
    },

    onTextChange: function () {
        this.state.review.text = this.refs.text.getDOMNode().value.substring(0, 4000);
        this.forceUpdate();
    },

    onSave: function () {
        ListingActions.saveReview(this.props.listing, this.state.review);
    },

    onSaveReviewCompleted: function (listing, review) {
        if (this.state.review.id === review.id) {
            this.props.onSave();
        }
    },

    onDeleteConfirm: function () {
        ListingActions.deleteReview(this.props.listing, this.state.review);
    },

    onDeleteReviewCompleted: function (listingId, reviewId) {
        if (this.state.review.id === reviewId) {
            this.refs.deletePopover.hidePopover();
        }
    },

    isEditingRateAllowed: function () {
        return this.state.review.author.username === this.props.user.username;
    },

    render: function () {
        var { rate, text } = this.state.review;
        var isEditingRateAllowed = this.isEditingRateAllowed();

        return (
            <div className="EditReview">
                <h5>Edit Review</h5>
                <SystemHighMessage />
                <div className="EditReview__Rating">
                    <h6>Star Rating</h6>
                    <IconRating
                        currentRating={ rate }
                        onChange={ this.onRatingChange }
                        viewOnly={ !isEditingRateAllowed }/>
                    {
                        !isEditingRateAllowed &&
                            <i className="icon-lock"></i>
                    }
                </div>
                <div>
                    <h6>Description</h6>
                    <textarea ref="text" value={ text } onChange={ this.onTextChange }></textarea>
                </div>
                <PopoverConfirmationButton
                    ref="deletePopover"
                    title="Delete Review"
                    content="Are you sure you want to delete this review?"
                    confirmButtonClassName="btn-danger"
                    onConfirm={ this.onDeleteConfirm } />
                <div className="pull-right">
                    <button className="btn btn-default btn-sm" onClick={ this.props.onCancel }>Cancel</button>
                    <button className="btn btn-success btn-sm" onClick={ this.onSave }>Submit</button>
                </div>
            </div>
        );
    }

});

module.exports = EditReview;
