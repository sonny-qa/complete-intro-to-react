webpackJsonp([2],{

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ShowCard = __webpack_require__(269);
	var Header = __webpack_require__(163);
	var _React$PropTypes = React.PropTypes;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var arrayOf = _React$PropTypes.arrayOf;

	var _require = __webpack_require__(227);

	var connector = _require.connector;

	/* the following is a stateful component */

	var Search = React.createClass({
	  displayName: 'Search',

	  propTypes: {
	    shows: arrayOf(object),
	    searchTerm: string
	  },
	  render: function render() {
	    var _this = this;

	    return React.createElement(
	      'div',
	      { className: 'container' },
	      React.createElement(Header, { showSearch: true
	      }),
	      React.createElement(
	        'div',
	        { className: 'shows' },
	        this.props.shows.filter(function (show) {
	          return (show.title + ' ' + show.description).toUpperCase().indexOf(_this.props.searchTerm.toUpperCase()) >= 0;
	        }).map(function (show) {
	          return React.createElement(ShowCard, _extends({}, show, { key: show.imdbID }));
	        })
	      )
	    );
	  }
	});

	module.exports = connector(Search);

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var _require = __webpack_require__(164);

	var Link = _require.Link;


	var ShowCard = function ShowCard(props) {
	  return React.createElement(
	    Link,
	    { to: '/details/' + props.imdbID },
	    React.createElement(
	      'div',
	      { className: 'show-card' },
	      React.createElement('img', { src: 'public/img/posters/' + props.poster, className: 'show-card-img'
	      }),
	      React.createElement(
	        'div',
	        { className: 'show-card-text' },
	        React.createElement(
	          'h3',
	          { className: 'show-card-title' },
	          ' ',
	          props.title
	        ),
	        React.createElement(
	          'h4',
	          { className: 'show-card-year' },
	          '(',
	          props.year,
	          ')'
	        ),
	        React.createElement(
	          'p',
	          { className: 'show-card-desription' },
	          props.description
	        )
	      )
	    )
	  );
	};

	var string = React.PropTypes.string;

	/*this is type hinting, tell react that showcard should have a prop called show 
	passed to it*/
	ShowCard.propTypes = {
	  title: string.isRequired,
	  description: string.isRequired,
	  year: string.isRequired,
	  poster: string.isRequired,
	  imdbID: string.isRequired
	};

	module.exports = ShowCard;

/***/ }

});