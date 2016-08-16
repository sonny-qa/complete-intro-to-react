var React = require('react')
var ReactDOM = require('react-dom')
var MyTitle = require('./MyTitle.js')

var div = React.DOM.div

var MyTitleFact = React.createFactory(MyTitle)
var ce = React.createElement

var MyFirstComponent = (
  div(null,
    MyTitleFact({title: 'Props are great!'}),
    React.createElement(MyTitle, {title: 'Use props everywhere!'}),
    ce(MyTitle, {title: 'Props are the best!'})
  )
)

ReactDOM.render(MyFirstComponent, document.getElementById('app'))
