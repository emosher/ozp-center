'use strict';

var React = require('react');
var SelectBox = require('react-select-box');

var SystemStateMixin = require('../../mixins/SystemStateMixin');

var Types = React.createClass({
    mixins: [SystemStateMixin],

    propTypes: {
        value: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    onChange(types) {
        this.props.onChange(types);
    },

    render() {
        return (
            <SelectBox className="SelectBox__Types" label="Listing Type" onChange={this.onChange} value={this.props.value} multiple>
                {
                    this.state.system.types.map((x) =>
                        <option key={x.id} value={x.title}>{x.title}</option>
                    )
                }
            </SelectBox>
        );
    }
});

module.exports = Types;
