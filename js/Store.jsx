const redux = require('redux')
const reactRedux = require('react-redux')
const { shows } = require('../public/data')


/* define our actions to allow for changing later */
const SET_SEARCH_TERM = 'setSearchTerm'
/* this defines our store */
const initialState = {
  searchTerm: '',
  shows: shows
}

/* the root reducer updates the store */
const rootReducer = (state=initialState, action) => {
  /* create a case for every action */
  switch (action.type){
    case SET_SEARCH_TERM:
      return reduceSearchTerm(state, action)
    default: 
      return state
  }
}

const reduceSearchTerm = (state, action) => {
  console.log('in reduceSearchTerm')
      const newState = {}
      Object.assign(newState,state,{searchTerm: action.value})
      return newState
}

/* create the store and pass it the root reducer 
additional terms are to allow redux devtools to hook in */
const store = redux.createStore(rootReducer, initialState, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
   ? window.devToolsExtension() : (f) => f

  ))

/*this allows us to access the property as this.props.searchTerm
essentially we are connecting the state with props 
all connected components will have access to searchterm and shows
in their props */
const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    shows: state.shows
  }
}
/* SET_SEARCH_TERM is the type of action to despatch
 - a react component could say: this.props.setSearchTerm('house')
 - the dispatch then calls the root reducer, with the previous state , this returns the new state*/
const mapDispatchToProps = (dispatch) => {
  return {
    /* this method will update the store, 
    it's used by react components to dispatch an action */
    setSearchTerm (searchTerm){
      dispatch({type: SET_SEARCH_TERM, value: searchTerm})
    }
  }
} 

/* now wrap the components we want to connect to redux */
const connector = reactRedux.connect(mapStateToProps,mapDispatchToProps)

module.exports = {connector, store, rootReducer}
