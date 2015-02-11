'use strict';
var React = require('react');
var Reflux = require('reflux');
var _ = require('../../../utils/_');
var RadioGroup = require('react-radio-group');
var { UserRole } = require('../../../constants');

function filterOption (currentValue, label, value, count, htmlFor, className) {
    var badge;
    if (currentValue === 'all') {
        badge = <strong className="badge">{ count || 0 }</strong>;
    }
    else if (value === currentValue) {
        badge = <strong className="badge">{ count || 0 }</strong>;
    }

    return [
        <input id={htmlFor} type="radio" value={value} />,
        <label htmlFor={htmlFor} className={className}>
            { label }
            { badge }
        </label>,
    ];
}

var ApprovalStatusFilter = React.createClass({

    propTypes: {
        value: React.PropTypes.object.isRequired,
        counts: React.PropTypes.object.isRequired,
        onFilterChanged: React.PropTypes.func.isRequired,
        organizations: React.PropTypes.array
    },

    handleChange: function (evt) {
        var { value } = evt.target;
        if (value === 'all') {
            value = null;
        }
        this.props.onFilterChanged('approvalStatus', value);
    },

    _renderRadioGroupOptions: function () {
        var counts = this.props.counts;
        var value = this.props.value.approvalStatus || 'all';

        var components = [
            filterOption(value, 'All', 'all', counts.total, 'all-listings-filter-all', 'label-all'),
            filterOption(value, 'Published', 'APPROVED', counts.APPROVED, 'all-listings-filter-published', 'label-published')
        ];

        if (this.props.role === UserRole.ADMIN) {
            components.push(
                filterOption(value, 'Needs action', 'APPROVED_ORG', counts.APPROVED_ORG, 'all-listings-filter-needs-action', 'label-needs-action'),
                filterOption(value, 'Pending, Org.', 'PENDING', counts.PENDING, 'all-listings-filter-pending', 'label-pending')
            );
        }
        else if (this.props.role === UserRole.ORG_STEWARD) {
            components.push(
                filterOption(value, 'Needs action', 'PENDING', counts.PENDING, 'all-listings-filter-needs-action', 'label-needs-action'),
                filterOption(value, 'Org approved', 'APPROVED_ORG', counts.APPROVED_ORG, 'all-listings-filter-pending', 'label-pending')
            );
        }
        components.push(
            filterOption(value, 'Returned', 'REJECTED', counts.REJECTED, 'all-listings-filter-rejected', 'label-rejected'),
            filterOption(value, 'Draft', 'IN_PROGRESS', counts.IN_PROGRESS, 'all-listings-filter-draft', 'label-draft')
        );
        return components;
    },

    render: function() {
        var value = this.props.value.approvalStatus || 'all';

        return (
            <div>
                <h4>State</h4>
                <RadioGroup
                    name="approval-status"
                    value={ value }
                    onChange={ this.handleChange }>
                    { _.flatten(this._renderRadioGroupOptions()) }
                </RadioGroup>
            </div>
        );
    }

});

module.exports = ApprovalStatusFilter;
