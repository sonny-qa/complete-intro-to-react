require('babel-register')

const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext
const ReactRedux = require('react-redux')
const Provider = ReactRedux.Provider
const Store = require('./js/Store.jsx')
const store = Store.store
const _ = require('lodash')
const fs = require('fs')
const port = 5050
const baseTemplate = fs.readFileSync('./index.html')
/* following is a function that returns a function*/
const template = _.template(baseTemplate)
const ClientApp = require('./js/ClientApp.jsx')
const Routes = ClientApp.Routes

const app = express()

app.use('/public', express.static('./public'))

app.use((req,res) => {
  match({routes: Routes, location: req.url }, (error, redirectLocation, 
    renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const body = ReactDOMServer.renderToString(
          /* type, properties, children*/
          React.createElement(Provider, {store: store},
            /* render props is passed to react router's routercontext
            render props is an object with a components property
            which is a list of all component classes to be rendered*/
            React.createElement(RouterContext, renderProps)
            )
          )
        /*send back the template with the body inserted*/
        res.status(200).send(template({body: body}))
      } else {
        res.status(404).send('Not found')
      }
    })
})

console.log('listening on port: ' + port)
app.listen(port)






