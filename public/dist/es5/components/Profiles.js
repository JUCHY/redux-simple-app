"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _taggedTemplateLiteral = function (strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var gql = require("apollo-boost").gql;
var graphql = require("react-apollo").graphql;


/*	This is a sample container for rendering a list of Profiles
    using GraphQL for queries. To run this example, see instructions
    on the GQLIndex.js file under the 'src' directory.

    Feel free to remove this file if you do not intend to use GraphQL. */

var getProfiles = gql(_taggedTemplateLiteral(["\n  {\n    profiles {\n      id\n      email\n    }\n  }\n"], ["\n  {\n    profiles {\n      id\n      email\n    }\n  }\n"]));

var Profiles = (function (Component) {
  function Profiles() {
    _classCallCheck(this, Profiles);

    if (Component != null) {
      Component.apply(this, arguments);
    }
  }

  _inherits(Profiles, Component);

  _prototypeProperties(Profiles, null, {
    render: {
      value: function render() {
        var profiles = this.props.data.profiles || [];
        return React.createElement(
          "div",
          { className: "container" },
          "Profiles Container",
          React.createElement(
            "ol",
            null,
            profiles.map(function (profile) {
              return React.createElement(
                "li",
                { key: profile.id },
                profile.email
              );
            })
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Profiles;
})(Component);

module.exports = graphql(getProfiles)(Profiles);