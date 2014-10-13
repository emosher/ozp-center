/** @jsx React.DOM */
'use strict';

var React            = require('react'),
    Select           = require('../../form/select'),
    DeleteBtnMixin   = require('./deleteBtnMixin'),
    ConfigStoreMixin = require('../../../stores/ConfigStore').mixin,
    dataBinder       = require('../../../utils/binder');

module.exports = React.createClass({
    mixins: [DeleteBtnMixin, ConfigStoreMixin],

    render: function () {
        var optionMap = function (json) {
            var intent = json.type + '/' + json.action;
            /*jshint ignore:start */
            return <option value={intent}>{intent}</option>;
            /*jshint ignore:end */
        };

        var intentComponents = this.state.config.intents.map(optionMap);

        var intent = this.props.item;

        /*jshint ignore: start */
        return (
            <div className="row form-card">
                <div className="col-sm-12">
                    {!this.props.locked && this.renderDeleteBtn()}
                    <Select required label="Intent (type and action)" dataBinder={dataBinder.simpleBinder(intent)} data-placeholder="Select an Intent">
                        { intentComponents }
                    </Select>
                </div>
            </div>
        );
        /*jshint ignore: end */
    }
});