const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./ClientApp')
const { match } = require('react-router')

match({ history: App.History, routes: App.Routes },
  (error, redirectLocation, renderProps) => {
    if (error){
      return console.error('BrowserEntry error', error)
    } 
    ReactDOM.render(<App {...renderProps} />, document.getElementById('app'))
  })


/* this code will be executed in the DOM by the browser 
after it has been sent down to the client
(in the scenario when we use server side rendering)*/
