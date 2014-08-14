/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Header = require('./header');
var Search = require('./search');

var Dropdown = require('./dropdown');

var CreateEditPage = require('./createEdit');


var APP = React.createClass({

    render: function () {

      var temp =
      {
        placeholder: "Select state",
        multiple: true,
        data: [
        {
          id: 0,
          text: "Arizona"
        }, {
          id: 1,
          text: "Maryland"
        }, {
          id: 2,
          text:"Maine"
        }]
      };


        return this.renderCreateEditPage();
        // return this.renderSearchPage();
    },


    /*jshint ignore:start */
    renderSearchPage: function () {

        return (
            <div>
                <Header />
                <Search />

                <Dropdown data={temp.data} placeholder={temp.placeholder} multiple={temp.multiple} />

                <Dropdown>
                  <option id="A">A</option>
                  <option id="B">B</option>
                  <option id="C">C</option>
                </Dropdown>
            </div>
        );
    },
    /*jshint ignore:end */

    /*jshint ignore:start */
    renderCreateEditPage: function () {
        return (
            <CreateEditPage />
        );
    }
    /*jshint ignore:end */

});

module.exports = APP;
