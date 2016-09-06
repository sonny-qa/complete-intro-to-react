const React = require('react')
const Layout = require('./Layout')
const Details = require('./Details')
const ReactRouter = require('react-router')
const { Router, browserHistory } = ReactRouter
const { store } = require('./Store')
const { Provider } = require('react-redux')

/* having async code on the server makes no sense,
the following is a workaround to use ansync code on server
in the node environment*/

if (typeof module !== 'undefined' && module.require){
  if (typeof require.ensure === 'undefined'){
    require.ensure = require('node-ensure') //shim for node
  }
}

//use react-router with config object as we are doing
// async routing
const rootRoute = {
  component: Layout,
  path: '/',
  indexRoute: {
    getComponent (location, cb) {
      require.ensure([],(_,error)=>{
        if (error) {
          return console.error('Clientapp landing page require.ensure error', error)
        }
        cb(null, require('./Landing'))
      
    })
    }
  },
  childRoutes: [
  {
    path: 'search',
    getComponent(location,cb){
      require.ensure([],(_,error)=> {
        cb(null,require('./Search'))
      })
    }
  },
  {
    path: 'details/:id',
    getComponent(location,cb){
      require.ensure([],(_,error)=> {
        cb(null,require('./Details'))
      })
    }
  }
]

}

/* app will select which show to send down via a method*/
class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={rootRoute} />
      </Provider>
    )
  }
}
/*allows us to import the routes into Node on server*/
App.Routes = rootRoute

App.History = browserHistory

module.exports= App
